import { entropy, sigmoid } from '../math';
import type { MovieSummary } from '../types';

/**
 * The Oracle: an Akinator-style dialogue.
 *
 * Every film starts with equal weight. Each question has a soft likelihood
 * p(film) that the honest answer for that film is "yes". Answers update the
 * weights Bayes-style, and the next question is the one with the highest
 * expected information gain over what is left. It is stateless: the client
 * sends the whole answer history and the server replays it.
 */

export type OracleAnswer = 'yes' | 'probably' | 'unknown' | 'probablyNot' | 'no';

export interface OracleQuestion {
  id: string;
  text: string;
  /** Short hint shown under the question. */
  hint: string;
  p: (movie: MovieSummary) => number;
}

const s = (x: number) => sigmoid(x);
const feelGood = (m: MovieSummary) =>
  (m.profile.humor + m.profile.wonder - m.profile.darkness - m.profile.sadness + (m.ending === 'happy' ? 4 : m.ending === 'bittersweet' ? 1 : -3)) / 3;

export const QUESTIONS: readonly OracleQuestion[] = [
  { id: 'fear', text: 'Искаш ли поне малко да те е страх?', hint: 'Сърцето да потропва.', p: (m) => s((m.profile.fear - 4.5) / 0.9) },
  { id: 'laugh', text: 'Искаш ли да се смееш на глас?', hint: 'Не просто усмивка.', p: (m) => s((m.profile.humor - 5.5) / 0.9) },
  { id: 'cry', text: 'Става ли да има и сълзи?', hint: 'Кърпичките са наблизо.', p: (m) => s((m.profile.sadness - 6) / 0.9) },
  { id: 'think', text: 'Искаш ли филм, който ще ти завърти мозъка?', hint: 'Обрати, загадки, теории след края.', p: (m) => s((m.profile.mindbend - 6) / 0.9) },
  { id: 'love', text: 'Трябва ли да има любовна история?', hint: 'Пеперуди в стомаха.', p: (m) => s((m.profile.romance - 5) / 0.9) },
  { id: 'action', text: 'Искаш ли екшън – гонки, бой, експлозии?', hint: 'Адреналин.', p: (m) => s((m.profile.action - 6) / 0.9) },
  { id: 'dark', text: 'Добре ли си с наистина мрачна атмосфера?', hint: 'Тежки теми, тъмни ъгли.', p: (m) => s((m.profile.darkness - 6) / 0.9) },
  { id: 'magic', text: 'Искаш ли нещо вълшебно или фантастично?', hint: 'Светове, които не съществуват.', p: (m) => s((m.profile.wonder - 6.5) / 0.9) },
  { id: 'edge', text: 'Искаш ли да стоиш на ръба на дивана?', hint: 'Напрежение до последната минута.', p: (m) => s((m.profile.tension - 7) / 0.9) },
  { id: 'fast', text: 'Бързо темпо, а не бавно нагнетяване?', hint: 'Без нито една скучна минута.', p: (m) => s((m.profile.pace - 6) / 0.9) },
  { id: 'bright', text: 'Искаш ли да излезеш с усмивка?', hint: 'Светло, топло, позитивно.', p: (m) => s(feelGood(m) / 1.2) },
  { id: 'long', text: 'Имаш ли настроение за дълъг, епичен филм?', hint: 'Над два часа.', p: (m) => s((m.runtime - 128) / 8) },
  { id: 'classic', text: 'Става ли класика отпреди 2000 г.?', hint: 'Може да е по-стар от теб.', p: (m) => s((1999.5 - m.year) / 2) },
  { id: 'animated', text: 'Анимация?', hint: 'Рисувано, куклено или компютърно.', p: (m) => (m.genres.includes('animation') ? 0.96 : 0.04) },
  { id: 'foreign', text: 'Искаш ли кино извън Холивуд – с друг език?', hint: 'Френско, корейско, японско, българско…', p: (m) => (m.language === 'английски' ? 0.08 : 0.92) },
  { id: 'twist', text: 'Искаш ли голям обрат, който не очакваш?', hint: '„Чакай… КАКВО?!“', p: (m) => (m.tags.includes('twist') ? 0.92 : 0.12) },
  { id: 'cozy', text: 'Търсиш ли нещо уютно за под одеялото?', hint: 'Чай, одеяло, нищо тежко.', p: (m) => (m.tags.includes('cozy') ? 0.92 : m.profile.darkness <= 2 && m.profile.tension <= 4 ? 0.6 : 0.08) },
  { id: 'true', text: 'Искаш ли история, която наистина се е случила?', hint: 'По действителен случай.', p: (m) => (m.tags.includes('true-story') ? 0.92 : 0.1) },
];

/** Strength of each answer: 1 = certain, 0 = no information. Sign picks the side. */
const ANSWER_STRENGTH: Record<OracleAnswer, number> = { yes: 1, probably: 0.55, unknown: 0, probablyNot: -0.55, no: -1 };
/** Even a confident "no" keeps a little weight: people misjudge films and we score them by hand. */
const NOISE = 0.07;

export interface OracleStep {
  questionId: string;
  answer: OracleAnswer;
}

export interface OracleCandidate {
  movie: MovieSummary;
  probability: number;
}

export interface OracleState {
  done: boolean;
  question: { id: string; text: string; hint: string; number: number } | null;
  /** 2^entropy: roughly how many films the oracle is still torn between. */
  effectiveCandidates: number;
  top: OracleCandidate[];
  asked: number;
}

export interface OracleOptions {
  maxQuestions?: number;
  minQuestions?: number;
  /** Stop once the leader is this likely. */
  confidence?: number;
}

function likelihood(p: number, answer: OracleAnswer): number {
  const strength = ANSWER_STRENGTH[answer];
  if (strength === 0) return 1;
  const pYes = NOISE + (1 - 2 * NOISE) * p;
  const pSide = strength > 0 ? pYes : 1 - pYes;
  const k = Math.abs(strength);
  return 1 - k + k * pSide;
}

function expectedEntropy(weights: readonly number[], probs: readonly number[]): number {
  let wYes = 0;
  let wNo = 0;
  const yes: number[] = [];
  const no: number[] = [];
  for (let i = 0; i < weights.length; i++) {
    const w = weights[i]!;
    const pYes = NOISE + (1 - 2 * NOISE) * probs[i]!;
    yes.push(w * pYes);
    no.push(w * (1 - pYes));
    wYes += w * pYes;
    wNo += w * (1 - pYes);
  }
  const total = wYes + wNo;
  if (total === 0) return 0;
  return (wYes / total) * entropy(yes) + (wNo / total) * entropy(no);
}

export function runOracle(pool: readonly MovieSummary[], history: readonly OracleStep[], options: OracleOptions = {}): OracleState {
  const maxQuestions = options.maxQuestions ?? 9;
  const minQuestions = options.minQuestions ?? 4;
  const confidence = options.confidence ?? 0.42;

  const weights = pool.map(() => 1);
  const asked = new Set<string>();
  for (const step of history) {
    const question = QUESTIONS.find((q) => q.id === step.questionId);
    if (!question || asked.has(question.id)) continue;
    asked.add(question.id);
    pool.forEach((m, i) => {
      weights[i] = weights[i]! * likelihood(question.p(m), step.answer);
    });
  }

  const total = weights.reduce((sum, w) => sum + w, 0) || 1;
  const ranked = pool
    .map((movie, i) => ({ movie, probability: weights[i]! / total }))
    .sort((a, b) => b.probability - a.probability);
  const currentEntropy = entropy(weights);
  const top = ranked.slice(0, 5);
  const leader = top[0]?.probability ?? 0;

  let best: { question: OracleQuestion; gain: number } | null = null;
  for (const question of QUESTIONS) {
    if (asked.has(question.id)) continue;
    const probs = pool.map((m) => question.p(m));
    const gain = currentEntropy - expectedEntropy(weights, probs);
    if (!best || gain > best.gain) best = { question, gain };
  }

  const done =
    pool.length <= 1 ||
    !best ||
    asked.size >= maxQuestions ||
    (asked.size >= minQuestions && (leader >= confidence || best.gain < 0.04));

  return {
    done,
    question: done || !best ? null : { id: best.question.id, text: best.question.text, hint: best.question.hint, number: asked.size + 1 },
    effectiveCandidates: Math.max(1, Math.round(2 ** currentEntropy)),
    top,
    asked: asked.size,
  };
}
