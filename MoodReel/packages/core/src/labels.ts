import type { Dim, Ending, ExclusionReason, Genre } from './types';

export interface DimMeta {
  label: string;
  /** Short label for chart axes. */
  short: string;
  /** What 0 and 10 mean on this scale. */
  low: string;
  high: string;
}

export const DIM_META: Record<Dim, DimMeta> = {
  fear: { label: 'Страх', short: 'Страх', low: 'спокойно', high: 'ужас' },
  tension: { label: 'Напрежение', short: 'Напрежение', low: 'отпуснато', high: 'на ръба' },
  mindbend: { label: 'Мозъчна гимнастика', short: 'Мозък', low: 'ясно', high: 'объркващо' },
  humor: { label: 'Смях', short: 'Смях', low: 'сериозно', high: 'до сълзи' },
  romance: { label: 'Романтика', short: 'Романтика', low: 'без', high: 'пеперуди' },
  action: { label: 'Екшън', short: 'Екшън', low: 'тихо', high: 'експлозии' },
  sadness: { label: 'Тъга', short: 'Тъга', low: 'леко', high: 'кърпички' },
  darkness: { label: 'Мрачност', short: 'Мрак', low: 'светло', high: 'много тъмно' },
  wonder: { label: 'Магия', short: 'Магия', low: 'реалистично', high: 'вълшебно' },
  pace: { label: 'Темпо', short: 'Темпо', low: 'бавно', high: 'бясно' },
};

export const GENRE_LABEL: Record<Genre, string> = {
  horror: 'Ужаси',
  thriller: 'Трилър',
  mystery: 'Мистерия',
  scifi: 'Фантастика',
  fantasy: 'Фентъзи',
  drama: 'Драма',
  comedy: 'Комедия',
  romance: 'Романтика',
  action: 'Екшън',
  adventure: 'Приключение',
  crime: 'Криминален',
  animation: 'Анимация',
  war: 'Военен',
  musical: 'Музикален',
};

export const ENDING_META: Record<Ending, { label: string; hint: string }> = {
  happy: { label: 'Светъл край', hint: 'Излизаш с усмивка.' },
  bittersweet: { label: 'Горчиво-сладък край', hint: 'Победа, която струва нещо.' },
  open: { label: 'Отворен край', hint: 'Ще спорите кой какво е разбрал.' },
  sad: { label: 'Тъжен край', hint: 'Дръж кърпички наблизо.' },
  bleak: { label: 'Мрачен край', hint: 'Тъмнината печели.' },
};

export const EXCLUSION_LABEL: Record<ExclusionReason, string> = {
  sadEnding: 'тъжен край',
  notHappy: 'не завършва щастливо',
  gore: 'кръв и насилие',
  jumpscares: 'внезапни стряскания',
  animalDeath: 'умира животно',
  family: 'не е за деца',
  tooLong: 'твърде дълъг',
  tooShort: 'твърде кратък',
  tooOld: 'твърде стар',
  tooNew: 'твърде нов',
  animation: 'анимация',
  notAnimation: 'не е анимация',
  genre: 'изключен жанр',
  seen: 'вече гледан',
  reference: 'това е примерът ти',
};

export const TAG_LABEL: Record<string, string> = {
  paranoia: 'параноя',
  isolation: 'изолация',
  creature: 'чудовище',
  obsession: 'обсесия',
  psychological: 'психологически',
  twist: 'голям обрат',
  'unreliable-narrator': 'ненадежден разказвач',
  dreams: 'сънища',
  time: 'време',
  memory: 'памет',
  identity: 'идентичност',
  heist: 'обир',
  space: 'космос',
  ai: 'изкуствен интелект',
  dystopia: 'антиутопия',
  survival: 'оцеляване',
  revenge: 'отмъщение',
  'serial-killer': 'сериен убиец',
  ghost: 'призраци',
  cult: 'секта',
  'slow-burn': 'бавно нагнетяване',
  'coming-of-age': 'порастване',
  family: 'семейство',
  friendship: 'приятелство',
  'road-trip': 'пътуване',
  music: 'музика',
  dance: 'танц',
  art: 'изкуство',
  satire: 'сатира',
  cozy: 'уютен',
  'visual-feast': 'визуален пир',
  'true-story': 'истинска история',
  whodunit: 'кой е убиецът',
  'small-town': 'малко градче',
  'class': 'класи',
  love: 'любов',
  grief: 'загуба',
  hope: 'надежда',
  underdog: 'аутсайдер',
  sports: 'спорт',
  food: 'храна',
  'one-location': 'едно място',
  'found-family': 'избрано семейство',
  'mind-games': 'игри на ума',
  war: 'война',
  'bulgarian': 'българско кино',
  journalism: 'журналистика',
  'quirky': 'чудат',
  'cult-classic': 'култов',
  'chase': 'гонка',
  'monster': 'чудовище',
  'school': 'училище',
  'ocean': 'океан',
  'nature': 'природа',
  'kids': 'деца',
  'loneliness': 'самота',
};

export function tagLabel(tag: string): string {
  return TAG_LABEL[tag] ?? tag.replace(/-/g, ' ');
}

/** Runtime as a timecode, the way an editor reads it: 01:49:00. */
export function timecode(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
}

export function runtimeLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} мин`;
  return m === 0 ? `${h} ч` : `${h} ч ${m} мин`;
}
