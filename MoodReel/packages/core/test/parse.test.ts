import { describe, expect, it } from 'vitest';
import { MOVIES } from '../src/catalog';
import { buildQuery, mergeEffects, type Effect } from '../src/effects';
import { createParser } from '../src/nlp/parse';

const parser = createParser(MOVIES);

function query(text: string) {
  const result = parser.parse(text);
  return { result, effects: mergeEffects([], result.effects, 'replace'), q: buildQuery(mergeEffects([], result.effects, 'replace')) };
}

describe('parser – the examples from the brief', () => {
  it('"страшно, но не прекалено" asks for moderate fear', () => {
    const { q } = query('Искам нещо страшно, но не прекалено');
    expect(q.dims.fear).toMatchObject({ target: 5, max: 6.5 });
  });

  it('"объркващо като The Thing или Black Swan" picks up both references and the mind-bending wish', () => {
    const { q } = query('нещо объркващо като The Thing или Black Swan');
    expect(q.like).toEqual(['the-thing-1982', 'black-swan-2010']);
    expect(q.dims.mindbend?.target).toBeGreaterThanOrEqual(7);
  });

  it('keeps "не прекалено" when a dealbreaker follows in the next clause', () => {
    const { q } = query('Нещо страшно, но не прекалено, без тъжен край');
    expect(q.dims.fear).toMatchObject({ target: 5, max: 6.5 });
    expect(q.dealbreakers.noSadEnding).toBe(true);
  });

  it('"не искам филми с тъжен край" switches on the sad-ending filter', () => {
    const { q, result } = query('Избери ми филм, не искам филми с тъжен край');
    expect(q.dealbreakers.noSadEnding).toBe(true);
    expect(result.mode).toBe('refine');
  });
});

describe('parser – modifiers', () => {
  it.each([
    ['не прекалено страшно', 'mid'],
    ['малко страшно', 'low'],
    ['много страшно', 'max'],
    ['най-страшния филм', 'max'],
    ['не искам нищо страшно', 'none'],
    ['страшно, ама не много', 'mid'],
  ])('%s → fear %s', (text, level) => {
    const { effects } = query(text);
    const fear = effects.find((e): e is Extract<Effect, { kind: 'dim' }> => e.kind === 'dim' && e.dim === 'fear');
    expect(fear?.level).toBe(level);
  });

  it('reads "страшно" as an intensifier when another wish follows', () => {
    const { q } = query('нещо страшно смешно');
    expect(q.dims.humor?.target).toBeGreaterThanOrEqual(9);
    expect(q.dims.fear).toBeUndefined();
  });

  it('keeps an explicit qualifier when a genre word repeats the dimension', () => {
    const { q } = query('не прекалено страшно хорър');
    expect(q.dims.fear?.target).toBe(5);
    expect(q.genres.include).toContain('horror');
  });

  it('does not stretch a bare "не" backwards', () => {
    const { q } = query('искам анимация, ама не за деца');
    expect(q.dealbreakers.animation).toBe('only');
    expect(q.dealbreakers.familyFriendly).toBeUndefined();
  });

  it('treats comparatives as refinements', () => {
    const { result } = query('по-малко страшно');
    expect(result.mode).toBe('refine');
    expect(result.effects[0]).toMatchObject({ kind: 'dimDelta', dim: 'fear' });
    const merged = mergeEffects([{ kind: 'dim', dim: 'fear', constraint: { target: 7.5, min: 5.5 } }], result.effects, 'refine');
    expect(merged[0]).toMatchObject({ kind: 'dim', dim: 'fear', constraint: { target: 5 } });
  });
});

describe('parser – dealbreakers, length and era', () => {
  it.each([
    ['без кръв', 'noGore'],
    ['без jump scares моля', 'noJumpscares'],
    ['да не ме стряска', 'noJumpscares'],
    ['да не умира кучето', 'noAnimalDeath'],
    ['без да умира куче', 'noAnimalDeath'],
    ['за гледане с децата', 'familyFriendly'],
    ['с щастлив край', 'happyOnly'],
    ['да свършва добре', 'noSadEnding'],
  ] as const)('%s → %s', (text, key) => {
    expect(query(text).q.dealbreakers[key]).toBe(true);
  });

  it.each([
    ['под 2 часа', 120],
    ['до 90 минути', 90],
    ['имам час и половина', 90],
  ])('%s → at most %i minutes', (text, minutes) => {
    expect(query(text).q.dealbreakers.maxRuntime).toBe(minutes);
  });

  it('understands decades and year ranges', () => {
    expect(query('нещо от 80-те').q.dealbreakers).toMatchObject({ minYear: 1980, maxYear: 1989 });
    expect(query('след 2015').q.dealbreakers).toMatchObject({ minYear: 2015 });
    expect(query('от 1990 до 1999').q.dealbreakers).toMatchObject({ minYear: 1990, maxYear: 1999 });
  });
});

describe('parser – references, moods and keywords', () => {
  it('matches Bulgarian titles and transliterations', () => {
    expect(query('нещо като Интерстелар').q.like).toEqual(['interstellar-2014']);
    expect(query('като Черният лебед').q.like).toEqual(['black-swan-2010']);
    expect(query('нещо като Матрицата, но по-смешно').q.like).toEqual(['the-matrix-1999']);
  });

  it('does not mistake everyday phrases for titles', () => {
    expect(query('сам вкъщи съм').q.like).toEqual([]);
  });

  it('detects the user being down and lifts the mood instead of matching sadness', () => {
    const { result, q } = query('кофти ден съм, искам нещо за повдигане');
    expect(result.moods).toContain('Кофти ден');
    expect(q.dims.sadness?.max).toBeLessThanOrEqual(5);
    expect(q.dims.humor?.target).toBeGreaterThanOrEqual(6);
  });

  it('falls back to a keyword search through the blurbs', () => {
    const { q } = query('филм с акула');
    expect(q.boostIds).toContain('jaws-1975');
  });

  it('recognises directors by surname', () => {
    const { q } = query('нещо в стил Нолан');
    expect(q.boostIds).toEqual(expect.arrayContaining(['inception-2010', 'memento-2000', 'interstellar-2014']));
  });

  it('reports when it understood nothing', () => {
    const result = parser.parse('абвгд жзий');
    expect(result.understood).toBe(false);
  });
});
