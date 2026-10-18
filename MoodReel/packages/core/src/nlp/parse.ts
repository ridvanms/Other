import { effectKey, type EffectBody, type Level, type ParsedEffect } from '../effects';
import type { Dim, DimConstraint, Movie } from '../types';
import {
  BOUNDARIES,
  COMPARATIVE_DOWN,
  COMPARATIVE_UP,
  CONCEPTS,
  CONDITIONAL_INTENSIFIERS,
  DIMINISHERS,
  FILLERS,
  INTENSIFIERS,
  MODERATION_AFTER_NOT,
  NEGATORS,
  type Concept,
} from './lexicon';
import { dice, normalize, normalizeTitle, stem, tokenize, transliterate } from './text';
import { TitleIndex } from './titles';

export interface ParseResult {
  effects: ParsedEffect[];
  /** replace: a fresh wish. refine: tweak what is already on screen ("по-малко страшно"). */
  mode: 'replace' | 'refine';
  /** Content words the parser could not place. */
  unknown: string[];
  /** The user's own state, when they told us ("кофти ден"). */
  moods: string[];
  understood: boolean;
}

export interface Parser {
  parse(text: string): ParseResult;
}

const L = '(?<![\\p{L}\\p{N}])';
const R = '(?![\\p{L}\\p{N}])';
/** A word character run that never crosses punctuation, so one phrase cannot swallow the next clause. */
const W = '[^\\s,.;!?]';
const rx = (source: string) => new RegExp(source.replace(/<L>/g, L).replace(/<R>/g, R).replace(/<W>/g, W), 'gdu');

const dim = (d: Dim, constraint: DimConstraint): EffectBody => ({ kind: 'dim', dim: d, constraint });

interface PhraseRule {
  re: RegExp;
  /** Return null to leave the text for later rules. */
  effects: (m: RegExpMatchArray) => ParsedEffect[] | null;
  mood?: string;
}

const NUMBER_WORDS: Record<string, number> = { един: 1, една: 1, едно: 1, час: 1, два: 2, две: 2, три: 3, четири: 4, половин: 0.5 };

/** "2 часа", "90 минути", "час и половина" → minutes. Four-digit numbers are years, not durations. */
function durationMinutes(amount: string, unit: string | undefined, half: boolean): number | null {
  const n = NUMBER_WORDS[amount] ?? Number(amount.replace(',', '.'));
  if (!Number.isFinite(n) || n >= 1000) return null;
  const isHours = unit ? /^(ч|h)/.test(unit) : n <= 4 || amount === 'час';
  return Math.round(isHours ? n * 60 + (half ? 30 : 0) : n);
}

const DECADE_WORDS: Record<string, number> = {
  петдесетте: 1950,
  шейсетте: 1960,
  шестдесетте: 1960,
  седемдесетте: 1970,
  осемдесетте: 1980,
  деветдесетте: 1990,
  нулевите: 2000,
  двехилядните: 2000,
};

const AMOUNT = '(\\d+(?:[.,]\\d+)?|един|една|два|две|три|четири|час|половин)';
const UNIT = '(час(?:а|ове)?|ч\\.?|h(?:ours?)?|минути|минута|мин\\.?|min(?:utes)?)?';
const NEG = '(?:без|не\\s+искам|не\\s+ми\\s+трябва|никакъв|никаква|никакво|никакви|да\\s+няма|да\\s+не\\s+е\\s+с|не\\s+понасям|не\\s+обичам|мразя|no|without)';

const LIFT: EffectBody[] = [
  dim('humor', { target: 7, tolerance: 1.5, weight: 0.8 }),
  dim('darkness', { target: 1.5, max: 3.5 }),
  dim('sadness', { target: 2, max: 4.5 }),
  dim('fear', { target: 0.5, max: 2 }),
  dim('wonder', { target: 6.5, tolerance: 2, weight: 0.5 }),
];

function group(name: string, effects: EffectBody[]): ParsedEffect[] {
  return effects.map((e) => ({ ...e, group: name }));
}

const PHRASES: PhraseRule[] = [
  // ── The user's own state ────────────────────────────────────────────────
  {
    re: rx('<L>(?:(?:тъжен|тъжна|депресиран<W>*|разбит<W>*|потиснат<W>*|нещастен|нещастна|разстроен<W>*|кофти|зле)\\s+(?:съм|се\\s+чувствам)|(?:съм|се\\s+чувствам)\\s+(?:много\\s+|малко\\s+|доста\\s+)?(?:тъжен|тъжна|депресиран<W>*|разбит<W>*|потиснат<W>*|разстроен<W>*|зле|кофти)|(?:тъжно|кофти|гадно|зле|тежко|мъчно)\\s+ми\\s+е|(?:лош|тежък|скапан|гаден|кофти|ужасен|отвратителен)\\s+ден|i\'?m\\s+sad|feeling\\s+down|bad\\s+day)<R>'),
    effects: () => group('Кофти ден → нещо за повдигане', LIFT),
    mood: 'Кофти ден',
  },
  {
    re: rx('<L>(?:(?:уморен|уморена|изморен|изморена|изтощен|изтощена|скапан|скапана)\\s+(?:съм|се\\s+чувствам)|(?:съм|се\\s+чувствам)\\s+(?:много\\s+|доста\\s+)?(?:уморен<W>*|изморен<W>*|изтощен<W>*|скапан<W>*)|без\\s+сили|i\'?m\\s+tired)<R>'),
    effects: () => [
      ...group('Умора → лесно за гледане', [dim('mindbend', { target: 2, max: 4 }), dim('tension', { target: 4, max: 6, weight: 0.7 })]),
      { kind: 'runtime', max: 120, group: 'Умора → лесно за гледане' },
    ],
    mood: 'Умора',
  },
  {
    re: rx('<L>(?:скучно\\s+ми\\s+е|скучая|отегчен<W>*|i\'?m\\s+bored)<R>'),
    effects: () => group('Скука → нещо динамично', [dim('pace', { target: 8, min: 6 }), dim('tension', { target: 6.5, tolerance: 2, weight: 0.6 })]),
    mood: 'Скука',
  },
  {
    re: rx('<L>(?:(?:стресиран<W>*|напрегнат<W>*|тревожн<W>*|притеснен<W>*|изнервен<W>*)\\s+(?:съм|се\\s+чувствам)|(?:съм|се\\s+чувствам)\\s+(?:много\\s+|доста\\s+)?(?:стресиран<W>*|напрегнат<W>*|тревожн<W>*|изнервен<W>*)|в\\s+стрес|стрес\\s+ми\\s+е|stressed|anxious)<R>'),
    effects: () =>
      group('Стрес → нещо спокойно', [
        dim('tension', { target: 2, max: 4 }),
        dim('fear', { target: 0.5, max: 2 }),
        dim('darkness', { target: 2, max: 4 }),
        dim('humor', { target: 6, tolerance: 2, weight: 0.6 }),
      ]),
    mood: 'Стрес',
  },
  {
    re: rx('<L>(?:влюбен|влюбена)\\s+съм|съм\\s+(?:много\\s+)?(?:влюбен|влюбена)<R>'),
    effects: () => group('Влюбеност → романтика', [dim('romance', { target: 8, min: 6 })]),
    mood: 'Влюбеност',
  },
  {
    re: rx('<L>(?:(?:щастлив|щастлива|весел|весела|ентусиазиран<W>*)\\s+съм|в\\s+(?:добро|супер|страхотно|отлично)\\s+настроение\\s+съм)<R>'),
    effects: () =>
      group('Добро настроение → нека остане така', [
        dim('darkness', { target: 3, max: 5 }),
        dim('sadness', { target: 3, max: 6 }),
        dim('humor', { target: 6, tolerance: 2, weight: 0.5 }),
      ]),
    mood: 'Добро настроение',
  },
  {
    re: rx('<L>(?:не\\s+мога\\s+да\\s+(?:заспя|спя)|безсъни<W>*|посред\\s+нощ|късно\\s+през\\s+нощта|в\\s+[1-4]\\s+(?:през\\s+нощта|сутринта|часа\\s+през\\s+нощта))<R>'),
    effects: () => group('Късна нощ → нещо странно', [dim('mindbend', { target: 7, tolerance: 2 }), dim('darkness', { target: 6, tolerance: 2, weight: 0.6 })]),
    mood: 'Късна нощ',
  },
  {
    re: rx('<L>(?:вали|дъжд<W>*|снеж<W>*|сняг|студено\\s+е|мразовито)<R>'),
    effects: () =>
      group('Времето навън → уют', [dim('darkness', { target: 3, max: 5 }), dim('tension', { target: 3.5, max: 6, weight: 0.6 }), dim('wonder', { target: 6, tolerance: 2, weight: 0.5 })]),
    mood: 'Лошо време',
  },

  // ── Company ─────────────────────────────────────────────────────────────
  {
    re: rx('<L>(?:с\\s+(?:децата|деца|детето|малките|малкия|малката|сина\\s+ми|дъщеря\\s+ми|дъщеричката|племенни<W>*|внуци<W>*|внучк<W>*|братчето|сестричката)|за\\s+(?:деца|децата|цялото\\s+семейство|малки)|детск<W>*|семеен\\s+филм|семейна\\s+вечер|за\\s+всички\\s+възрасти|family\\s+(?:movie|night)|for\\s+kids)<R>'),
    effects: (m) => (/(?:^|\s)не\s*$/.test(m.input!.slice(Math.max(0, m.index! - 4), m.index)) ? [] : [{ kind: 'deal', key: 'familyFriendly' }]),
  },
  {
    re: rx('<L>(?:с\\s+(?:гаджето|приятелката\\s+си|приятелката\\s+ми|приятеля\\s+си|приятеля\\s+ми|половинката|жена\\s+ми|мъжа\\s+ми|съпруг<W>*|любим<W>*)|за\\s+среща|на\\s+среща|романтична\\s+вечер|date\\s*night)<R>'),
    effects: () => group('Среща → романтика', [dim('romance', { target: 6.5, tolerance: 1.5 })]),
  },
  {
    re: rx('<L>(?:с\\s+(?:приятели|приятелите|приятелки|компания|компанията|колеги<W>*|аверите|пичовете|момичетата|момчетата|съквартирант<W>*)|за\\s+купон|на\\s+купон|with\\s+friends)<R>'),
    effects: () => group('С приятели → смях и темпо', [dim('humor', { target: 7, tolerance: 1.5, weight: 0.8 }), dim('pace', { target: 7, tolerance: 1.5, weight: 0.6 })]),
  },

  // ── Endings and content ─────────────────────────────────────────────────
  {
    re: rx(`<L>(?:щастлив<W>*|хубав<W>*|добър|добри|позитивен|позитивн<W>*|светъл|happy)\\s+(?:край<W>*|краища|финал<W>*|завършек|ending|end)<R>|<L>(?:хепи\\s?енд<W>*|happy\\s?end<W>*)<R>`),
    effects: (m) => (/^(?:без|не)\s/.test(m.input!.slice(Math.max(0, m.index! - 4), m.index)) ? null : [{ kind: 'deal', key: 'happyOnly' }]),
  },
  {
    re: rx(`<L>(?:${NEG}|не)\\s+(?:<W>+\\s+){0,3}?(?:тъж<W>*|лош<W>*|трагич<W>*|депрес<W>*|печал<W>*|кофти|sad|unhappy|bad)\\s+(?:край<W>*|краища|финал<W>*|завършек<W>*|ending<W>*|end)<R>`),
    effects: () => [{ kind: 'deal', key: 'noSadEnding' }],
  },
  {
    re: rx('<L>(?:(?:да|който|които|която|което)\\s+(?:да\\s+)?(?:свършва<W>*|завършва<W>*|приключва<W>*)\\s+(?:добре|хубаво|щастливо|позитивно)|(?:да\\s+)?не\\s+(?:свършва<W>*|завършва<W>*|приключва<W>*)\\s+(?:зле|тъжно|лошо|трагично)|никой\\s+(?:да\\s+)?не\\s+умира|(?:главни<W>*|героят|героите|героинята)\\s+(?:<W>+\\s+)?(?:да\\s+)?(?:не\\s+умира<W>*|оцелява<W>*))<R>'),
    effects: () => [{ kind: 'deal', key: 'noSadEnding' }],
  },
  {
    re: rx(`<L>(?:${NEG}\\s+(?:<W>+\\s+){0,2}?(?:кръв<W>*|кърви|кървав<W>*|gore|клане|кланета|насилие|разчленяв<W>*|blood<W>*)|(?:да\\s+не\\s+е|не\\s+много)\\s+кървав<W>*)<R>`),
    effects: () => [{ kind: 'deal', key: 'noGore' }],
  },
  {
    re: rx(`<L>(?:${NEG}\\s+(?:<W>+\\s+){0,2}?(?:внезапн<W>*|стряск<W>*|jump\\s*-?\\s*scare<W>*|джъмп\\s*скеър<W>*|джъмп\\s*скер<W>*|изскачащ<W>*)|(?:да\\s+)?не\\s+(?:ме\\s+)?(?:стряска<W>*|стресва<W>*))<R>`),
    effects: () => [{ kind: 'deal', key: 'noJumpscares' }],
  },
  {
    re: rx('<L>(?:без\\s+(?:да\\s+)?(?:умира<W>*|умре|умрат|загива<W>*|страда<W>*|умиращи|мъртви)\\s+(?:<W>+\\s+)?(?:куче<W>*|кучета|животн<W>*|котк<W>*|коте<W>*)|(?:куче<W>*|кучета|животн<W>*|котк<W>*|коте<W>*)\\s+(?:<W>+\\s+)?(?:да\\s+)?не\\s+(?:умира<W>*|умре|умрат|загива<W>*|страда<W>*|пострада<W>*)|(?:да\\s+)?не\\s+(?:умира<W>*|умре|загива<W>*)\\s+(?:<W>+\\s+)?(?:куче<W>*|кучета|животн<W>*|котк<W>*)|(?:dog|animal)s?\\s+(?:don\'?t|doesn\'?t)\\s+die)<R>'),
    effects: () => [{ kind: 'deal', key: 'noAnimalDeath' }],
  },

  // ── Themes that need more than one word ────────────────────────────────
  {
    re: rx('<L>(?:пътуван<W>*\\s+(?:във|в)\\s+времето|машина<W>*\\s+на\\s+времето|времев<W>*\\s+(?:примк<W>*|парадокс<W>*|пътувани<W>*)|time\\s*travel<W>*|time\\s*loop<W>*)<R>'),
    effects: () => [{ kind: 'tag', tag: 'time' }, dim('mindbend', { target: 6.5, tolerance: 1.5, weight: 0.6 })],
  },
  {
    re: rx('<L>(?:изкуствен<W>*\\s+интелект|artificial\\s+intelligence)<R>'),
    effects: () => [{ kind: 'tag', tag: 'ai' }],
  },
  {
    re: rx('<L>(?:(?:истинска|реална)\\s+история|действителн<W>*\\s+(?:случай|събития|история)|по\\s+истински\\s+случай|true\\s+story|based\\s+on\\s+a\\s+true)<R>'),
    effects: () => [{ kind: 'tag', tag: 'true-story' }],
  },
  {
    re: rx('<L>(?:сериен\\s+убиец|серийни\\s+убийци|serial\\s+killer<W>*)<R>'),
    effects: () => [{ kind: 'tag', tag: 'serial-killer' }, dim('tension', { target: 8, min: 6 })],
  },
  {
    re: rx('<L>(?:кой\\s+е\\s+убиецът|whodunit|whodunnit|детективска\\s+загадка)<R>'),
    effects: () => [{ kind: 'tag', tag: 'whodunit' }, { kind: 'genre', genre: 'mystery', mode: 'include' }],
  },
  {
    re: rx('<L>на\\s+ръба\\s+(?:на\\s+)?(?:стола|дивана|седалката)<R>'),
    effects: () => [dim('tension', { target: 9, min: 7.5 })],
  },
  {
    re: rx('<L>(?:да\\s+(?:ме\\s+)?(?:накара|кара)\\s+да\\s+мисля|да\\s+(?:ме\\s+)?замисли)<R>'),
    effects: () => [dim('mindbend', { target: 7.5, min: 5.5 })],
  },

  // ── Length ──────────────────────────────────────────────────────────────
  {
    re: rx(`<L>(?:под|до|по-малко\\s+от|не\\s+повече\\s+от|максимум|макс|най-много|under|less\\s+than|max|имам|имаме|разполагам\\s+с|разполагаме\\s+с)\\s+(?:само\\s+|около\\s+|някакви\\s+|едва\\s+)?${AMOUNT}\\s*${UNIT}(\\s+и\\s+половина)?<R>`),
    effects: (m) => {
      const minutes = durationMinutes(m[1]!, m[2], Boolean(m[3]));
      return minutes === null ? null : [{ kind: 'runtime', max: Math.max(60, minutes) }];
    },
  },
  {
    re: rx(`<L>(?:над|поне|повече\\s+от|минимум|over|at\\s+least)\\s+${AMOUNT}\\s*${UNIT}(\\s+и\\s+половина)?<R>`),
    effects: (m) => {
      const minutes = durationMinutes(m[1]!, m[2], Boolean(m[3]));
      return minutes === null ? null : [{ kind: 'runtime', min: minutes }];
    },
  },

  // ── Era ─────────────────────────────────────────────────────────────────
  {
    re: rx('<L>(?:от|между)\\s+((?:19|20)\\d\\d)\\s+(?:до|и)\\s+((?:19|20)\\d\\d)<R>'),
    effects: (m) => [{ kind: 'era', minYear: Number(m[1]), maxYear: Number(m[2]) }],
  },
  {
    re: rx('<L>(?:от\\s+)?(?:(19|20)?([0-9])0)\\s*-?\\s*(?:те|s)(?:\\s+години)?<R>'),
    effects: (m) => {
      const digit = Number(m[2]);
      const century = m[1] ? Number(m[1]) * 100 : digit >= 3 ? 1900 : 2000;
      const start = century + digit * 10;
      return [{ kind: 'era', minYear: start, maxYear: start + 9 }];
    },
  },
  {
    re: rx(`<L>(?:от\\s+)?(${Object.keys(DECADE_WORDS).join('|')})(?:\\s+години)?<R>`),
    effects: (m) => {
      const start = DECADE_WORDS[m[1]!]!;
      return [{ kind: 'era', minYear: start, maxYear: start + 9 }];
    },
  },
  {
    re: rx('<L>(?:след|от)\\s+((?:19|20)\\d\\d)(?:\\s*г\\.?|\\s+година)?<R>'),
    effects: (m) => [{ kind: 'era', minYear: Number(m[1]) }],
  },
  {
    re: rx('<L>(?:преди|до)\\s+((?:19|20)\\d\\d)(?:\\s*г\\.?|\\s+година)?<R>'),
    effects: (m) => [{ kind: 'era', maxYear: m[0].startsWith('преди') ? Number(m[1]) - 1 : Number(m[1]) }],
  },
];

const LIKE_CUE = rx(
  '<L>(?:като|подобн<W>*\\s+на|в\\s+стила\\s+на|в\\s+стил|в\\s+духа\\s+на|напомня<W>*(?:\\s+на)?|тип|а\\s+ла|à\\s+la|like|similar\\s+to|in\\s+the\\s+style\\s+of)\\s+(.+?)(?=$|[,.;!?]|\\s+(?:но|ама|обаче|без|не|със|с|за|който|която|което|които|ако|защото|but|without|with|for)<R>)',
);
const QUOTED = /"([^"]{2,60})"/dg;
const LIST_SEPARATOR = /\s+(?:или|и|or|and|&)\s+|\s*[/,]\s*/g;
const REFINE_CUE = new RegExp(`^(?:още|и|а|ама|но|плюс|също|добави|освен\\s+това|само\\s+че|обаче|без|по-|but|also|plus|and|without)${R}`, 'u');

/** Surnames that are also everyday words or belong to someone more famous. */
const AMBIGUOUS_SURNAMES = new Set(['king', 'bird', 'jones', 'scott', 'wright', 'lee']);

interface SearchDoc {
  id: string;
  stems: Set<string>;
  words: string[];
}

export function createParser(catalog: readonly Movie[]): Parser {
  const titles = new TitleIndex(catalog);
  const conceptById = new Map(CONCEPTS.map((c) => [c.id, c]));

  // Free-text index for "something with a shark": stems from blurbs, titles and tags.
  const docs: SearchDoc[] = catalog.map((m) => {
    const words = tokenize(normalize([m.title, ...(m.aliases ?? []), m.blurb].join(' ')))
      .filter((t) => !t.punct && t.text.length >= 4)
      .map((t) => t.text);
    return { id: m.id, words, stems: new Set(words.map(stem)) };
  });
  const documentFrequency = new Map<string, number>();
  for (const doc of docs) for (const s of doc.stems) documentFrequency.set(s, (documentFrequency.get(s) ?? 0) + 1);

  const directors = new Map<string, { name: string; ids: string[] }>();
  for (const m of catalog) {
    for (const name of m.director.split(',').map((n) => n.trim())) {
      const surname = normalizeTitle(name).split(' ').pop()!;
      const entry = directors.get(surname) ?? { name, ids: [] };
      entry.ids.push(m.id);
      directors.set(surname, entry);
    }
  }

  function matchConcept(word: string): { concept: Concept; prefix: '' | 'по-' | 'най-' } | null {
    let prefix: '' | 'по-' | 'най-' = '';
    let core = word;
    if (word.startsWith('по-')) {
      prefix = 'по-';
      core = word.slice(3);
    } else if (word.startsWith('най-')) {
      prefix = 'най-';
      core = word.slice(4);
    }
    for (const concept of CONCEPTS) {
      if (concept.not?.some((n) => core.startsWith(n))) continue;
      if (concept.words?.includes(core) || concept.stems?.some((s) => core.startsWith(s))) return { concept, prefix };
    }
    return null;
  }

  function keywordMatch(word: string): ParsedEffect | null {
    if (word.length < 4 || /^\d+$/.test(word)) return null;

    // Director surnames, typed in Latin or Cyrillic ("Нолан", "Fincher").
    const latin = transliterate(word);
    for (const [surname, entry] of directors) {
      if (surname.length < 4 || AMBIGUOUS_SURNAMES.has(surname)) continue;
      const close = latin === surname || (surname.length >= 5 && (latin.startsWith(surname) || dice(latin, surname) >= 0.7));
      if (close) return { kind: 'keyword', word: entry.name, movieIds: entry.ids };
    }

    const s = stem(word);
    if ((documentFrequency.get(s) ?? 0) > 6) return null;
    const ids = docs.filter((d) => d.stems.has(s) || (s.length >= 5 && d.words.some((w) => w.startsWith(s)))).map((d) => d.id);
    if (ids.length === 0 || ids.length > 8) return null;
    return { kind: 'keyword', word, movieIds: ids };
  }

  function parse(input: string): ParseResult {
    const text = normalize(input);
    const tokens = tokenize(text);
    const consumed = new Array<boolean>(tokens.length).fill(false);
    const effects: ParsedEffect[] = [];
    const moods: string[] = [];
    /** Dimensions the user qualified ("не прекалено страшно", "да ме замисли"); a later bare word must not undo that. */
    const explicitDims = new Set<Dim>();

    const consume = (start: number, end: number) => {
      tokens.forEach((t, i) => {
        if (t.start < end && t.end > start) consumed[i] = true;
      });
    };
    const isFree = (start: number, end: number) => tokens.every((t, i) => !(t.start < end && t.end > start) || !consumed[i]);

    // 1. Film references: "като The Thing или Black Swan", quoted titles, then bare mentions.
    for (const m of text.matchAll(LIKE_CUE)) {
      const [captureStart] = m.indices![1]!;
      const capture = m[1]!;
      let matchedAny = false;
      let cursor = 0;
      const parts: Array<{ text: string; offset: number }> = [];
      for (const sep of capture.matchAll(LIST_SEPARATOR)) {
        parts.push({ text: capture.slice(cursor, sep.index), offset: cursor });
        cursor = sep.index! + sep[0].length;
      }
      parts.push({ text: capture.slice(cursor), offset: cursor });
      for (const part of parts) {
        const match = titles.matchPrefix(part.text);
        if (!match) continue;
        matchedAny = true;
        const words = [...part.text.matchAll(/\S+/g)].slice(0, match.words);
        const last = words[words.length - 1]!;
        const start = captureStart + part.offset + (words[0]!.index ?? 0);
        const end = captureStart + part.offset + (last.index ?? 0) + last[0].length;
        consume(start, end);
        effects.push({ kind: 'like', movieId: match.movieId, span: text.slice(start, end) });
      }
      if (matchedAny) consume(m.index!, captureStart);
    }
    for (const m of text.matchAll(QUOTED)) {
      const [start, end] = m.indices![0]!;
      if (!isFree(start, end)) continue;
      const match = titles.match(m[1]!, 0.7);
      if (!match) continue;
      consume(start, end);
      effects.push({ kind: 'like', movieId: match.movieId, span: m[1]! });
    }
    for (const hit of titles.scan(text)) {
      if (!isFree(hit.start, hit.end)) continue;
      consume(hit.start, hit.end);
      effects.push({ kind: 'like', movieId: hit.movieId, span: text.slice(hit.start, hit.end) });
    }

    // 2. Multi-word phrases.
    for (const rule of PHRASES) {
      for (const m of text.matchAll(rule.re)) {
        const start = m.index!;
        const end = start + m[0].length;
        if (!isFree(start, end)) continue;
        const produced = rule.effects(m);
        if (!produced) continue;
        consume(start, end);
        effects.push(...produced.map((e) => ({ ...e, span: m[0] })));
        for (const e of produced) if (e.kind === 'dim') explicitDims.add(e.dim);
        if (rule.mood && !moods.includes(rule.mood)) moods.push(rule.mood);
      }
    }

    // 3. Word by word, with modifiers that reach forward ("не прекалено страшно") or back ("страшно, но не прекалено").
    const live = tokens.map((t, i) => ({ ...t, i })).filter((t) => !consumed[t.i]);
    const unknown: string[] = [];

    interface Pending {
      level?: Level;
      delta?: number;
      post: boolean;
      at: number;
      text: string;
    }
    let pending: Pending | null = null;
    let last: { concept: Concept; from: number; to: number; at: number } | null = null;
    /** Strongest bare (unmodified) level per dimension, so "фентъзи … с приключения" keeps the higher of the two. */
    const bareLevels = new Map<Dim, number>();

    const nextMeaningful = (j: number): number => {
      for (let k = j + 1; k < live.length; k++) {
        const word = live[k]!.text;
        if (BOUNDARIES.has(word)) return -1;
        if (!FILLERS.has(word)) return k;
      }
      return -1;
    };

    const emit = (concept: Concept, j: number, prefix: '' | 'по-' | 'най-', span: string) => {
      const delta = prefix === 'по-' ? (pending?.delta ?? 2.5) : pending?.delta;
      let produced: ParsedEffect[];
      if (delta !== undefined && (concept.deltas || concept.comparative)) {
        const direction: 1 | -1 = delta < 0 ? -1 : 1;
        produced = concept.comparative
          ? concept.comparative(direction)
          : Object.entries(concept.deltas!).map(([d, sign]) => ({ kind: 'dimDelta' as const, dim: d as Dim, delta: delta * (sign ?? 1) }));
      } else {
        const explicit = prefix === 'най-' || pending?.level !== undefined;
        const level: Level = prefix === 'най-' ? 'max' : (pending?.level ?? concept.defaultLevel ?? 'high');
        produced = concept.apply(level);
        if (explicit) {
          for (const e of produced) if (e.kind === 'dim') explicitDims.add(e.dim);
        } else {
          produced = produced.filter((e) => {
            if (e.kind !== 'dim') return true;
            if (explicitDims.has(e.dim)) return false;
            const strength = e.constraint.target;
            if ((bareLevels.get(e.dim) ?? -1) > strength) return false;
            bareLevels.set(e.dim, strength);
            return true;
          });
        }
      }
      const fullSpan = pending ? `${pending.text} ${span}` : span;
      const from = effects.length;
      effects.push(...produced.map((e) => ({ ...e, span: fullSpan, via: concept.id })));
      last = { concept, from, to: effects.length, at: j };
      pending = null;
    };

    const flush = () => {
      if (pending?.post && pending.level && last && last.at < pending.at) {
        const replacement = last.concept.apply(pending.level).map((e) => ({ ...e, span: `${effects[last!.from]?.span ?? ''}, ${pending!.text}`, via: last!.concept.id }));
        for (const e of replacement) if (e.kind === 'dim') explicitDims.add(e.dim);
        effects.splice(last.from, last.to - last.from, ...replacement);
        last = { ...last, to: last.from + replacement.length };
      }
      pending = null;
    };

    for (let j = 0; j < live.length; j++) {
      const word = live[j]!.text;

      if (BOUNDARIES.has(word)) {
        flush();
        continue;
      }
      if (word === 'не' || word === 'not') {
        const next = live[j + 1]?.text;
        if (next && MODERATION_AFTER_NOT.has(next)) {
          const span = next === 'чак' && live[j + 2]?.text === 'толкова' ? 3 : 2;
          pending = { level: 'mid', post: true, at: j, text: live.slice(j, j + span).map((t) => t.text).join(' ') };
          j += span - 1;
          continue;
        }
        pending = { level: 'none', post: false, at: j, text: word };
        continue;
      }
      if (NEGATORS.has(word)) {
        const next = live[j + 1]?.text;
        if (next && INTENSIFIERS[next]) {
          pending = { level: 'low', post: false, at: j, text: `${word} ${next}` };
          j += 1;
          continue;
        }
        pending = { level: 'none', post: false, at: j, text: word };
        continue;
      }
      if (INTENSIFIERS[word]) {
        pending = { level: INTENSIFIERS[word], post: false, at: j, text: word };
        continue;
      }
      if (DIMINISHERS[word]) {
        pending = { level: DIMINISHERS[word], post: true, at: j, text: word };
        continue;
      }
      if (COMPARATIVE_UP.has(word) || COMPARATIVE_DOWN.has(word)) {
        const sign = COMPARATIVE_DOWN.has(word) ? -1 : 1;
        const boosted = word === 'още' && live[j + 1]?.text.startsWith('по-');
        pending = { delta: sign * (boosted ? 3.5 : 2.5), post: false, at: j, text: word };
        continue;
      }
      const conditional = CONDITIONAL_INTENSIFIERS[word];
      if (conditional) {
        // "не прекалено страшно хорър": with a modifier already waiting, the word is an adjective, not an intensifier.
        const k = pending ? -1 : nextMeaningful(j);
        const next = k >= 0 ? matchConcept(live[k]!.text) : null;
        const nextDims = next ? Object.keys(next.concept.deltas ?? {}) : [];
        const applies = next && (!conditional.onlyBefore || nextDims.some((d) => conditional.onlyBefore!.includes(d as Dim)));
        if (applies) {
          pending = { level: conditional.level, post: false, at: j, text: word };
          continue;
        }
        const fallback = conditional.fallback ? conceptById.get(conditional.fallback) : undefined;
        if (fallback) emit(fallback, j, '', word);
        continue;
      }
      const hit = matchConcept(word);
      if (hit) {
        emit(hit.concept, j, hit.prefix, word);
        continue;
      }
      if (FILLERS.has(word) || live[j]!.punct) continue;

      const keyword = keywordMatch(word);
      if (keyword) {
        effects.push({ ...keyword, span: word });
        continue;
      }
      if (word.length >= 3 && !/^\d+$/.test(word)) unknown.push(word);
    }
    flush();

    // Two grouped phrases fighting over one dimension ("кофти ден… нещо за повдигане"): the first, more specific one wins.
    const groupedKeys = new Set<string>();
    for (let i = 0; i < effects.length; i++) {
      const e = effects[i]!;
      if (!e.group || e.kind === 'dimDelta') continue;
      const key = effectKey(e);
      if (groupedKeys.has(key)) effects.splice(i--, 1);
      else groupedKeys.add(key);
    }

    // Only tweaks and filters ("по-малко страшно", "без кръв") adjust what is on screen; any new taste starts over.
    const tweaksOnly =
      effects.length > 0 &&
      effects.every((e) => e.kind === 'dimDelta' || e.kind === 'deal' || e.kind === 'runtime' || e.kind === 'era' || e.kind === 'animation' || (e.kind === 'genre' && e.mode === 'exclude'));
    const mode = tweaksOnly || REFINE_CUE.test(text) ? 'refine' : 'replace';

    return { effects, mode, unknown, moods, understood: effects.length > 0 };
  }

  return { parse };
}

