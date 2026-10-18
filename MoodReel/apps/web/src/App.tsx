import { mergeEffects, type Effect, type MovieSummary } from '@moodreel/core';
import { useEffect, useMemo, useState } from 'react';
import { createApi, type Api } from './api';
import { CommunityPulse } from './components/CommunityPulse';
import { ContactSheet } from './components/ContactSheet';
import { EffectChips } from './components/EffectChips';
import { FilmDrawer } from './components/FilmDrawer';
import { Header, type View } from './components/Header';
import { Icon } from './components/Icon';
import { Mixer } from './components/Mixer';
import { Oracle } from './components/Oracle';
import { PickFlow } from './components/PickFlow';
import { PromptBar } from './components/PromptBar';
import { Results } from './components/Results';
import { Watchlist } from './components/Watchlist';
import { useRecommendations } from './hooks/useRecommendations';
import { ApiProvider, useApi } from './state/api';
import { StoreProvider, useStore } from './state/store';
import './App.css';

/** The page opens on the brief's own example, so the first screen already shows what the tool does. */
const OPENING_PROMPT = 'Нещо страшно, но не прекалено, без тъжен край';

interface Boot {
  api: Api;
  catalog: MovieSummary[];
  defaults: Effect[];
}

export function App() {
  const [boot, setBoot] = useState<Boot | null>(null);
  const [failed, setFailed] = useState('');

  useEffect(() => {
    (async () => {
      const api = await createApi();
      const [catalog, opening] = await Promise.all([api.movies(), api.parse(OPENING_PROMPT)]);
      setBoot({ api, catalog, defaults: mergeEffects([], opening.effects, 'replace') });
    })().catch((error: Error) => setFailed(error.message));
  }, []);

  const byId = useMemo(() => new Map((boot?.catalog ?? []).map((m) => [m.id, m])), [boot]);

  if (failed) {
    return (
      <div className="boot">
        <p className="eyebrow">MoodReel</p>
        <h1>Лентата се скъса</h1>
        <p>{failed}</p>
        <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
          Опитай пак
        </button>
      </div>
    );
  }
  if (!boot) {
    return (
      <div className="boot" aria-busy="true">
        <Icon name="reel" size={44} className="boot__reel" />
        <p className="eyebrow">Зареждам лентата…</p>
      </div>
    );
  }

  return (
    <ApiProvider value={{ api: boot.api, catalog: boot.catalog, byId }}>
      <StoreProvider defaults={boot.defaults}>
        <Shell />
      </StoreProvider>
    </ApiProvider>
  );
}

function Shell() {
  const { api, catalog } = useApi();
  const { state, query, dispatch } = useStore();
  const [view, setView] = useState<View>('mood');
  const [openId, setOpenId] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [takes, setTakes] = useState(1);
  const [pulseKey, setPulseKey] = useState(0);
  const [parseError, setParseError] = useState('');
  const { data, loading, error } = useRecommendations(query, state.seed);

  const highlighted = useMemo(() => new Set((data?.results ?? []).slice(0, 6).map((r) => r.movie.id)), [data]);

  const submit = async (text: string) => {
    setParsing(true);
    setParseError('');
    try {
      const result = await api.parse(text);
      dispatch({ type: 'parsed', text, result });
      setTakes((t) => t + 1);
    } catch (e) {
      setParseError((e as Error).message);
    } finally {
      setParsing(false);
    }
  };

  const feedback = useMemo(() => {
    if (parseError) return { tone: 'warn' as const, text: parseError };
    const last = state.lastParse;
    if (!last) return { tone: 'info' as const, text: `Започваме с пример от заданието: „${OPENING_PROMPT}“. Напиши своето.` };
    const { result } = last;
    if (!result.understood) return { tone: 'warn' as const, text: 'Не разбрах съвсем. Опитай с настроение („смешно“, „мрачно“), жанр, филм, на който да прилича, или условие като „без тъжен край“.' };
    const parts = [] as string[];
    if (result.moods.length) parts.push(`Усещам: ${result.moods.join(', ').toLowerCase()}.`);
    parts.push(result.mode === 'refine' ? 'Добавих това към текущите ти желания.' : `Разбрах ${result.effects.length === 1 ? 'едно нещо' : `${result.effects.length} неща`} – виж ги по-долу.`);
    if (result.unknown.length) parts.push(`Не разпознах: ${result.unknown.slice(0, 4).map((w) => `„${w}“`).join(', ')}.`);
    return { tone: 'info' as const, text: parts.join(' ') };
  }, [state.lastParse, parseError]);

  return (
    <>
      <div className="safe-top" aria-hidden="true" />
      <Header view={view} onView={setView} saved={state.watchlist.length} mode={api.mode} />
      <main className="shell">
        {view === 'mood' && (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero__copy">
                <p className="eyebrow">{catalog.length} ръчно описани филма · без спойлери</p>
                <h1 id="hero-title">
                  Какво ще гледаме <em>тази вечер?</em>
                </h1>
                <p className="hero__lead">
                  Кажи го с думи, нагласи пулта или остави Оракула да пита. MoodReel тегли всеки филм по десет измерения на настроението и изключва това, което не искаш – без да издава краищата.
                </p>
              </div>
              <PromptBar take={takes} busy={parsing} onSubmit={submit} feedback={feedback} />
              <EffectChips />
            </section>

            <div className="desk">
              <div className="desk__left">
                <Mixer highlighted={highlighted} excluded={data?.pool.excluded ?? {}} byReason={data?.pool.byReason ?? {}} onOpen={setOpenId} />
              </div>
              <div className="desk__right">
                <ContactSheet pool={data?.pool ?? null} highlighted={highlighted} onOpen={setOpenId} />
                <Results data={data} loading={loading} error={error} onOpen={setOpenId} onPick={() => setPicking(true)} />
              </div>
            </div>

            <CommunityPulse refreshKey={pulseKey} onOpen={setOpenId} />
          </>
        )}
        {view === 'oracle' && <Oracle onOpen={setOpenId} />}
        {view === 'list' && <Watchlist onOpen={setOpenId} />}
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p>
            <b>MoodReel</b> – уеб проект. Данните за филмите и плакатите са създадени за проекта: настроенията са оценени ръчно, плакатите се генерират от код.
          </p>
          <p className="mono">{api.mode === 'remote' ? 'API · Express + React' : 'Двигателят работи в браузъра'}</p>
        </div>
      </footer>

      {view === 'mood' && (
        <div className="pickbar">
          <button type="button" className="btn btn--primary pickbar__btn" onClick={() => setPicking(true)} disabled={!data?.results.length}>
            <Icon name="reel" size={18} /> Избери ми филм
          </button>
        </div>
      )}

      <PickFlow
        open={picking}
        onClose={() => {
          setPicking(false);
          setPulseKey((k) => k + 1);
        }}
      />
      <FilmDrawer id={openId} onClose={() => setOpenId(null)} onOpen={setOpenId} />
    </>
  );
}
