import { inverseLevelConstraint, levelConstraint, type EffectBody, type Level, type ParsedEffect } from '../effects';
import type { Dim, DimConstraint, Genre } from '../types';

/**
 * Vocabulary of the parser. Bulgarian first, with the English words people
 * mix in. Words match by prefix ("страш" → страшно, страшен, страшничко),
 * so endings and diminutives come for free.
 */

export interface Concept {
  id: string;
  /** Prefixes that trigger the concept. */
  stems?: string[];
  /** Whole tokens that trigger the concept. */
  words?: string[];
  /** Tokens that look like a stem but mean something else ("страхотен" is "great"). */
  not?: string[];
  defaultLevel?: Level;
  /** Effects for an absolute level. */
  apply: (level: Level) => ParsedEffect[];
  /** Direction of travel for comparatives ("по-страшно", "по-малко мрачно"). */
  deltas?: Partial<Record<Dim, number>>;
  /** For non-dimensional concepts: what "по-X" means. */
  comparative?: (direction: 1 | -1) => ParsedEffect[];
}

const dim = (d: Dim, constraint: DimConstraint, level?: Level): EffectBody =>
  level ? { kind: 'dim', dim: d, constraint, level } : { kind: 'dim', dim: d, constraint };

function dimConcept(
  id: string,
  d: Dim,
  opts: { stems?: string[]; words?: string[]; not?: string[]; genre?: Genre; tag?: string; defaultLevel?: Level; inverse?: boolean },
): Concept {
  return {
    id,
    ...(opts.stems ? { stems: opts.stems } : {}),
    ...(opts.words ? { words: opts.words } : {}),
    ...(opts.not ? { not: opts.not } : {}),
    defaultLevel: opts.defaultLevel ?? 'high',
    deltas: { [d]: opts.inverse ? -1 : 1 },
    apply: (level) => {
      const effects: ParsedEffect[] = [dim(d, opts.inverse ? inverseLevelConstraint(level) : levelConstraint(level), opts.inverse ? undefined : level)];
      if (opts.genre) effects.push({ kind: 'genre', genre: opts.genre, mode: level === 'none' ? 'exclude' : 'include' });
      if (opts.tag && level !== 'none') effects.push({ kind: 'tag', tag: opts.tag });
      return effects;
    },
  };
}

function tagConcept(id: string, tag: string, stems: string[], extra: (level: Level) => ParsedEffect[] = () => [], words?: string[]): Concept {
  return {
    id,
    stems,
    ...(words ? { words } : {}),
    defaultLevel: 'high',
    apply: (level) => (level === 'none' ? [] : [{ kind: 'tag', tag }, ...extra(level)]),
  };
}

function comboConcept(id: string, group: string, stems: string[], effects: EffectBody[], deltas: Partial<Record<Dim, number>>, words?: string[]): Concept {
  return {
    id,
    stems,
    ...(words ? { words } : {}),
    defaultLevel: 'high',
    deltas,
    apply: (level) => (level === 'none' ? [] : effects.map((e) => ({ ...e, group }))),
  };
}

const FEEL_GOOD: EffectBody[] = [
  dim('darkness', { target: 1.5, max: 3.5 }),
  dim('sadness', { target: 2.5, max: 5 }),
  dim('fear', { target: 0.5, max: 2.5 }),
  dim('humor', { target: 6.5, tolerance: 2, weight: 0.7 }),
];

const CALM: EffectBody[] = [
  dim('tension', { target: 2, max: 4 }),
  dim('fear', { target: 0.5, max: 2 }),
  dim('action', { target: 1.5, max: 4, weight: 0.7 }),
  dim('pace', { target: 3.5, tolerance: 1.5, weight: 0.6 }),
];

export const CONCEPTS: Concept[] = [
  // Genre words first: they carry a genre on top of the mood.
  dimConcept('horror', 'fear', { stems: ['хорър', 'хорор', 'horror'], words: ['ужаси', 'ужасите', 'ужастик', 'ужастици'], genre: 'horror' }),
  dimConcept('thriller', 'tension', { stems: ['трилър', 'thriller'], genre: 'thriller' }),
  dimConcept('comedy', 'humor', { stems: ['комеди', 'comed', 'ромком', 'romcom'], genre: 'comedy' }),
  dimConcept('drama', 'sadness', { stems: ['драма', 'драми', 'драмат', 'drama'], genre: 'drama', defaultLevel: 'mid' }),
  dimConcept('mystery', 'mindbend', { stems: ['мистер', 'загадк', 'загадъч', 'mystery'], genre: 'mystery', defaultLevel: 'mid' }),
  dimConcept('crime', 'tension', { stems: ['криминал', 'детектив', 'гангстер', 'мафия', 'мафиот', 'crime'], genre: 'crime', defaultLevel: 'mid' }),
  dimConcept('adventure', 'wonder', { stems: ['приключен', 'adventure'], genre: 'adventure', defaultLevel: 'mid' }),
  dimConcept('fantasy', 'wonder', { stems: ['фентъзи', 'fantasy', 'дракон', 'магьос', 'вещиц'], genre: 'fantasy' }),
  dimConcept('scifi', 'wonder', { stems: ['фантаст', 'sci-fi', 'scifi', 'сай-фай', 'сайфай', 'научна', 'пришълц', 'извънземн'], genre: 'scifi', defaultLevel: 'mid' }),
  dimConcept('musical', 'humor', { stems: ['мюзикъл', 'musical'], genre: 'musical', tag: 'music', defaultLevel: 'mid' }),
  dimConcept('war', 'action', { stems: ['военен', 'военна', 'военни', 'война', 'войни', 'войник', 'войници'], words: ['war'], genre: 'war', tag: 'war' }),
  dimConcept('space', 'wonder', { stems: ['космос', 'космич', 'космическ', 'астронавт', 'космонавт', 'вселен'], words: ['space'], genre: 'scifi', tag: 'space' }),

  // Pure mood dimensions.
  dimConcept('fear', 'fear', {
    stems: ['страш', 'страх', 'плаш', 'уплаш', 'изплаш', 'ужас', 'кошмар', 'настръхн', 'scary', 'scare', 'creepy', 'крийпи', 'spooky', 'зловещ'],
    not: ['страхот', 'ужасно'],
  }),
  dimConcept('tension', 'tension', { stems: ['напрег', 'напрежен', 'саспенс', 'suspense', 'тръпк', 'интензив', 'адренал', 'нервн', 'вълнуващ'] }),
  dimConcept('mindbend', 'mindbend', {
    stems: ['обърк', 'заплет', 'мозък', 'мозъч', 'мислов', 'замисл', 'размис', 'умен', 'умн', 'интелиг', 'философ', 'сюрреал', 'абстракт', 'нелинеен', 'нелинейн', 'пъзел', 'главоблъск', 'странн', 'странен', 'сложен', 'сложн', 'дълбок', 'дълбоч', 'mind', 'confus', 'trippy', 'психолог'],
  }),
  dimConcept('humor', 'humor', { stems: ['смешн', 'смях', 'смее', 'смея', 'засмея', 'разсмя', 'забав', 'хумор', 'шантав', 'funny', 'hilarious', 'ржа'] }),
  dimConcept('romance', 'romance', { stems: ['романт', 'любов', 'влюб', 'romanc', 'romantic', 'целув', 'пеперуд', 'страст'], words: ['love'] }),
  dimConcept('action', 'action', { stems: ['екшън', 'екшан', 'action', 'бой', 'бойн', 'експлоз', 'гонк', 'гонен', 'стрелб', 'битк', 'юмру', 'каскад', 'супергер', 'superhero'] }),
  dimConcept('sadness', 'sadness', { stems: ['тъж', 'тъга', 'плач', 'поплач', 'разплак', 'сълз', 'сърцераздир', 'меланхол', 'tearjerk', 'кърпич', 'sad'] }),
  dimConcept('moving', 'sadness', { stems: ['трогат', 'емоцион', 'покъртит'], defaultLevel: 'mid' }),
  dimConcept('darkness', 'darkness', { stems: ['мрач', 'тъмн', 'жесток', 'брутал', 'депресиращ', 'депресив', 'тежк', 'тежък', 'ноар', 'noir', 'цинич', 'безнадежд', 'dark', 'gritty'] }),
  dimConcept('wonder', 'wonder', { stems: ['вълшеб', 'магия', 'магич', 'приказ', 'чудн', 'феерич', 'мечтател', 'визуал', 'красив', 'красот', 'magic', 'whimsic'], words: ['чудо', 'чудеса'] }),
  dimConcept('pace', 'pace', { stems: ['бърз', 'динамич', 'енергич', 'темпо', 'fast'] }),
  dimConcept('slow', 'pace', { stems: ['бавн', 'съзерцат', 'медитат', 'мудн', 'slow'], inverse: true }),

  comboConcept('feelgood', 'Светло и позитивно', ['позитив', 'весел', 'приятн', 'светъл', 'светл', 'топъл', 'топл', 'сладк', 'сладък', 'вдъхнов', 'мотивир', 'оптимист', 'ободр', 'повдиг', 'feel-good', 'feelgood', 'wholesome', 'щастлив', 'усмив'], FEEL_GOOD, { darkness: -1, sadness: -1, humor: 1 }, ['лек', 'лека', 'леко', 'леки', 'лекичко']),
  comboConcept('cozy', 'Уютно', ['уют', 'cozy', 'cosy', 'кози'], [...FEEL_GOOD, { kind: 'tag', tag: 'cozy' }], { darkness: -1, tension: -1 }),
  comboConcept('calm', 'Спокойно', ['спокой', 'релакс', 'разпуск', 'отпуск', 'заспив', 'нежн', 'нежен', 'лежерн', 'chill', 'чил', 'relax'], CALM, { tension: -1, pace: -1 }, ['тих', 'тиха', 'тихо', 'тихи', 'тихичко', 'мек', 'мека', 'меко']),

  // Formats, length and era.
  {
    id: 'animation',
    stems: ['анимац', 'анимир', 'аниме', 'анимэ', 'cartoon', 'animat', 'пиксар', 'pixar', 'дисни', 'disney', 'гибли', 'ghibli', 'миядзаки', 'miyazaki', 'рисуван', 'анимационн'],
    defaultLevel: 'high',
    apply: (level) => [{ kind: 'animation', mode: level === 'none' ? 'exclude' : 'only' }],
  },
  {
    id: 'short',
    words: ['къс', 'къси', 'късичък', 'късичко', 'кратък', 'кратка', 'кратко', 'кратки', 'кратичък', 'кратичко', 'short'],
    defaultLevel: 'high',
    apply: (level) => [{ kind: 'runtime', ...(level === 'none' ? { min: 100 } : { max: level === 'max' ? 95 : 105 }) }],
    comparative: (dir) => [{ kind: 'runtime', ...(dir > 0 ? { max: 110 } : { min: 110 }) }],
  },
  {
    id: 'long',
    words: ['дълъг', 'дълга', 'дълго', 'дълги', 'епичен', 'епична', 'епично', 'епос', 'epic', 'long'],
    defaultLevel: 'high',
    apply: (level) => [{ kind: 'runtime', ...(level === 'none' ? { max: 120 } : level === 'mid' || level === 'low' ? { max: 130 } : { min: level === 'max' ? 150 : 130 }) }],
    comparative: (dir) => [{ kind: 'runtime', ...(dir > 0 ? { min: 125 } : { max: 115 }) }],
  },
  {
    id: 'old',
    words: ['стар', 'стара', 'старо', 'стари', 'старичък', 'старичко', 'класика', 'класики', 'класически', 'класическа', 'класическо', 'ретро', 'old', 'classic', 'vintage'],
    defaultLevel: 'high',
    apply: (level) => [{ kind: 'era', ...(level === 'none' ? { minYear: 2000 } : { maxYear: level === 'max' ? 1985 : 1999 }) }],
    comparative: (dir) => [{ kind: 'era', ...(dir > 0 ? { maxYear: 2000 } : { minYear: 2005 }) }],
  },
  {
    id: 'new',
    words: ['нов', 'нова', 'ново', 'нови', 'новичък', 'скорошен', 'скорошна', 'скорошно', 'скорошни', 'модерен', 'модерна', 'модерно', 'модерни', 'съвременен', 'съвременна', 'съвременно', 'recent', 'new'],
    defaultLevel: 'high',
    apply: (level) => [{ kind: 'era', ...(level === 'none' ? { maxYear: 2010 } : { minYear: level === 'max' ? 2018 : 2014 }) }],
    comparative: (dir) => [{ kind: 'era', ...(dir > 0 ? { minYear: 2010 } : { maxYear: 2005 }) }],
  },

  // Themes.
  tagConcept('twist', 'twist', ['обрат', 'twist'], () => [dim('mindbend', { target: 6.5, tolerance: 1.5, weight: 0.6 })]),
  tagConcept('heist', 'heist', ['обир', 'heist', 'кражб']),
  tagConcept('road', 'road-trip', ['пътешеств', 'пътуван', 'роуд'], undefined, ['road']),
  tagConcept('dreams', 'dreams', ['сънищ', 'сънува', 'dream']),
  tagConcept('memory', 'memory', ['памет', 'спомен', 'амнези']),
  tagConcept('ghost', 'ghost', ['призра', 'духове', 'паранорм', 'обладан', 'демон', 'екзорс', 'ghost', 'haunt'], () => [dim('fear', { target: 6, tolerance: 1.5 })]),
  tagConcept('creature', 'creature', ['чудовищ', 'създани', 'същество', 'creature', 'монстър', 'monster', 'звяр', 'зверове'], () => [dim('fear', { target: 5.5, tolerance: 2 })]),
  tagConcept('revenge', 'revenge', ['отмъщ', 'revenge', 'възмезд']),
  tagConcept('killer', 'serial-killer', ['маниак', 'убиец', 'убийц', 'serial'], () => [dim('tension', { target: 8, min: 6 })]),
  tagConcept('cult', 'cult', ['секта', 'секти']),
  tagConcept('cult-classic', 'cult-classic', ['култов', 'cult']),
  tagConcept('isolation', 'isolation', ['изолац', 'изолир']),
  tagConcept('survival', 'survival', ['оцеля', 'surviv']),
  tagConcept('paranoia', 'paranoia', ['параноя', 'параноич', 'paranoi']),
  tagConcept('satire', 'satire', ['сатир', 'satir']),
  tagConcept('obsession', 'obsession', ['обсес', 'обсеб', 'мания', 'obsess']),
  tagConcept('loneliness', 'loneliness', ['самот', 'lonel']),
  tagConcept('hope', 'hope', ['надежд', 'hope']),
  tagConcept('grief', 'grief', ['загуба', 'скръб', 'траур', 'grief']),
  tagConcept('dance', 'dance', ['танц', 'балет', 'балерин', 'dance', 'ballet']),
  tagConcept('food', 'food', ['храна', 'готвене', 'кулинар', 'кухня', 'food', 'cooking']),
  tagConcept('school', 'school', ['училищ', 'гимназ', 'school']),
  tagConcept('coming-of-age', 'coming-of-age', ['тийнейдж', 'порастван', 'юношес', 'teen']),
  tagConcept('friendship', 'friendship', ['приятелств', 'friendship']),
  tagConcept('art', 'art', ['художни', 'artist'], undefined, ['изкуство']),
  tagConcept('journalism', 'journalism', ['журналист', 'вестник', 'репортер']),
  tagConcept('ocean', 'ocean', ['океан', 'морск', 'подводн', 'ocean'], undefined, ['море', 'морето']),
  tagConcept('nature', 'nature', ['природ', 'джунгл', 'nature'], undefined, ['гора', 'гората']),
  tagConcept('small-town', 'small-town', ['градче', 'провинц'], undefined, ['село', 'селото']),
  tagConcept('family', 'family', ['семейств']),
  tagConcept('class', 'class', ['неравенств', 'класов'], undefined, ['богати', 'бедни']),
  tagConcept('underdog', 'underdog', ['аутсайдер', 'underdog']),
  tagConcept('music', 'music', ['музик', 'музикант', 'джаз', 'джез', 'music'], undefined, ['рок', 'песни', 'пеене']),
  tagConcept('identity', 'identity', ['идентичн', 'двойник', 'двойниц', 'identity']),
  tagConcept('ai', 'ai', ['андроид'], undefined, ['ai', 'ии']),
];

/** Conditional words: an intensifier when another concept follows, a concept of their own otherwise. */
export const CONDITIONAL_INTENSIFIERS: Record<string, { level: Level; onlyBefore?: Dim[]; fallback?: string }> = {
  страшно: { level: 'max', fallback: 'fear' },
  ужасно: { level: 'max', fallback: 'fear' },
  адски: { level: 'max' },
  брутално: { level: 'max', fallback: 'darkness' },
  жестоко: { level: 'max', fallback: 'darkness' },
  лудо: { level: 'max' },
  леко: { level: 'low', onlyBefore: ['fear', 'tension', 'darkness', 'sadness', 'action', 'mindbend', 'romance'], fallback: 'feelgood' },
  лекичко: { level: 'low', onlyBefore: ['fear', 'tension', 'darkness', 'sadness', 'action', 'mindbend', 'romance'], fallback: 'feelgood' },
};

export const INTENSIFIERS: Record<string, Level> = {
  много: 'max',
  мнооого: 'max',
  супер: 'max',
  мега: 'max',
  яко: 'max',
  наистина: 'max',
  истински: 'max',
  изключително: 'max',
  невероятно: 'max',
  тотално: 'max',
  абсолютно: 'max',
  максимално: 'max',
  бая: 'high',
  доста: 'high',
  very: 'max',
  really: 'max',
  super: 'max',
  extremely: 'max',
  so: 'max',
  най: 'max',
};

export const DIMINISHERS: Record<string, Level> = {
  малко: 'low',
  мъничко: 'low',
  'малко-малко': 'low',
  слабо: 'low',
  бегло: 'low',
  умерено: 'mid',
  средно: 'mid',
  нормално: 'mid',
  донякъде: 'mid',
  отчасти: 'mid',
  slightly: 'low',
  mildly: 'low',
  somewhat: 'mid',
  moderately: 'mid',
};

export const NEGATORS = new Set(['не', 'без', 'никак', 'никакъв', 'никаква', 'никакво', 'никакви', 'нищо', 'no', 'not', 'without', 'нула']);

/** Words after "не" that turn it into moderation: "не прекалено", "не много". */
export const MODERATION_AFTER_NOT = new Set(['прекалено', 'много', 'твърде', 'чак', 'особено', 'съвсем', 'толкова', 'кой', 'too', 'very']);

export const COMPARATIVE_UP = new Set(['повече', 'по-голямо', 'по-голям', 'по-силно', 'още', 'more']);
export const COMPARATIVE_DOWN = new Set(['по-малко', 'по-слабо', 'less']);

export const BOUNDARIES = new Set([',', '.', '!', '?', ';', ':', 'но', 'ама', 'обаче', 'а', 'и', 'или', 'плюс', 'but', 'and', 'or', 'хем']);

/** Words that carry no wish of their own. They never break a modifier's reach. */
export const FILLERS = new Set([
  'искам', 'искаш', 'иска', 'искаме', 'искате', 'исках', 'бих', 'искал', 'искала', 'желая', 'търся', 'търсим', 'трябва', 'ми', 'ме', 'ни', 'му', 'им', 'се', 'си',
  'нещо', 'нещичко', 'някакъв', 'някаква', 'някакво', 'някакви', 'някой', 'някоя', 'филм', 'филма', 'филмът', 'филми', 'филмче', 'филмчета', 'кино', 'сериал',
  'гледам', 'гледаме', 'гледаш', 'гледане', 'изгледам', 'изгледаме', 'да', 'е', 'са', 'съм', 'сме', 'сте', 'бъде', 'бъдат', 'ще', 'ли', 'беше', 'било', 'бил', 'била',
  'аз', 'ти', 'той', 'тя', 'ние', 'вие', 'те', 'тази', 'този', 'това', 'тези', 'тоя', 'таз', 'туй', 'вечер', 'вечерта', 'довечера', 'днес', 'сега', 'утре',
  'уикенда', 'уикенд', 'петък', 'събота', 'неделя', 'моля', 'хайде', 'дай', 'дайте', 'предложи', 'предложете', 'препоръчай', 'препоръчайте', 'избери', 'изберете',
  'намери', 'намерете', 'покажи', 'кажи', 'за', 'на', 'в', 'във', 'с', 'със', 'от', 'по', 'при', 'към', 'около', 'през', 'че', 'който', 'която', 'което', 'които',
  'какъв', 'каква', 'какво', 'какви', 'как', 'кой', 'коя', 'кое', 'кои', 'нека', 'може', 'можеш', 'става', 'просто', 'точно', 'само', 'също', 'пак', 'все', 'пък',
  'ок', 'ok', 'ей', 'хм', 'the', 'a', 'an', 'i', 'want', 'something', 'movie', 'film', 'some', 'me', 'with', 'for', 'tonight', 'please', 'to', 'of', 'that', 'is',
  'be', 'watch', 'по-скоро', 'по-добре', 'хубав', 'хубаво', 'хубави', 'хубава', 'добър', 'добро', 'добра', 'добри', 'готин', 'готино', 'готина', 'интересен',
  'интересно', 'интересна', 'малко-много', 'нещата', 'тип', 'вид', 'жанр', 'настроение', 'настроението', 'ден', 'нощ', 'тук', 'там', 'вкъщи', 'заедно', 'някак',
  'mood', 'into', 'kind', 'like', 'just', 'feel', 'feeling', 'някъде', 'гледал', 'гледала', 'гледали', 'страхотен', 'страхотно', 'страхотна', 'страхотни',
  'вариант', 'варианти', 'идея', 'идеи', 'препоръка', 'предложение', 'мен', 'нас', 'тебе', 'мене', 'моя', 'мой', 'мое', 'мои', 'твоя', 'твой', 'наш', 'наша',
  'определено', 'задължително', 'обичам', 'харесвам', 'харесва', 'харесах', 'харесало', 'привлича', 'обича', 'обичаме', 'мисля', 'мислех', 'смятам', 'знам', 'знаеш',
  'днешната', 'тазвечерния', 'нито', 'ако', 'когато', 'щом', 'защото', 'понеже', 'докато', 'вече', 'всъщност', 'например', 'напр', 'стил', 'стила', 'духа', 'нещо', 'неща',
  'струва', 'струват', 'казвам', 'казва', 'виждам', 'намирам', 'правя', 'прави', 'отида', 'отивам', 'имам', 'имаме', 'гледах', 'гледахме', 'видя', 'видим',
  'хареса', 'харесат', 'хареса', 'опитай', 'опитаме', 'пусни', 'пуснем', 'чувствам', 'чувство', 'нямам', 'няма', 'някого', 'никой', 'всички', 'всичко', 'друг',
  'друга', 'друго', 'други', 'малко-много', 'днеска', 'тая', 'тоз', 'оня', 'онази', 'онзи', 'онова', 'едно', 'един', 'една', 'съвсем', 'вариантче',
]);
