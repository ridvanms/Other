import { timecode, type OracleAnswer, type OracleState, type OracleStep } from '@moodreel/core';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { clientId } from '../lib/clientId';
import { useApi } from '../state/api';
import { useStore } from '../state/store';
import { Icon } from './Icon';
import { Poster } from './Poster';
import './Oracle.css';

const ANSWERS: Array<{ id: OracleAnswer; label: string }> = [
  { id: 'yes', label: 'Да' },
  { id: 'probably', label: 'По-скоро да' },
  { id: 'unknown', label: 'Все ми е едно' },
  { id: 'probablyNot', label: 'По-скоро не' },
  { id: 'no', label: 'Не' },
];

export function Oracle({ onOpen }: { onOpen: (id: string) => void }) {
  const { api } = useApi();
  const { query, dispatch } = useStore();
  const hasRules = Object.keys(query.dealbreakers).length > 0 || query.exclude.length > 0;
  const [respectRules, setRespectRules] = useState(true);
  const [history, setHistory] = useState<OracleStep[]>([]);
  const [state, setState] = useState<OracleState | null>(null);
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(false);

  const run = useCallback(
    async (steps: OracleStep[]) => {
      try {
        setError('');
        setState(await api.oracle(steps, respectRules && hasRules ? query : undefined));
      } catch (e) {
        setError((e as Error).message);
      }
    },
    [api, query, respectRules, hasRules],
  );

  useEffect(() => {
    void run(history);
    // Re-run only when the answers or the rule toggle change, not on every keystroke elsewhere.
  }, [history, respectRules]);

  const answer = (id: OracleAnswer) => {
    if (!state?.question) return;
    setHistory((h) => [...h, { questionId: state.question!.id, answer: id }]);
  };
  const restart = () => {
    setHistory([]);
    setAccepted(false);
  };

  const top = state?.top ?? [];
  const leader = top[0];
  const clarity = leader ? Math.min(1, leader.probability / 0.45) : 0;

  return (
    <section className="oracle" aria-labelledby="oracle-title">
      <header className="oracle__head">
        <div>
          <p className="eyebrow">Оракулът</p>
          <h2 id="oracle-title">Не знаеш какво искаш? Отговори на няколко въпроса.</h2>
          <p className="oracle__lead">Всеки следващ въпрос е този, който най-добре разделя оставащите филми. Обикновено стигат 5–8.</p>
        </div>
        {hasRules && (
          <label className="oracle__rules">
            <input type="checkbox" checked={respectRules} onChange={(e) => setRespectRules(e.target.checked)} />
            Спазвай условията ми ({Object.keys(query.dealbreakers).length + (query.exclude.length ? 1 : 0)})
          </label>
        )}
      </header>

      {error && (
        <p className="results__error" role="alert">
          {error}
        </p>
      )}

      <div className="oracle__grid">
        <div className="oracle__stage">
          <AnimatePresence mode="wait">
            {state && !state.done && state.question && (
              <motion.div
                key={state.question.id}
                className="oracle__card"
                initial={{ opacity: 0, y: 16, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mono oracle__number">Въпрос {String(state.question.number).padStart(2, '0')}</p>
                <h3 className="oracle__question" aria-live="polite">
                  {state.question.text}
                </h3>
                <p className="oracle__hint">{state.question.hint}</p>
                <div className="oracle__answers">
                  {ANSWERS.map((a) => (
                    <button key={a.id} type="button" className={`btn oracle__answer oracle__answer--${a.id}`} onClick={() => answer(a.id)}>
                      {a.label}
                    </button>
                  ))}
                </div>
                {history.length > 0 && (
                  <button type="button" className="btn btn--ghost btn--small" onClick={() => setHistory((h) => h.slice(0, -1))}>
                    ← Върни последния отговор
                  </button>
                )}
              </motion.div>
            )}
            {state?.done && leader && (
              <motion.div key="verdict" className="oracle__verdict" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <p className="eyebrow">След {state.asked} въпроса мисля, че ти трябва…</p>
                <div className="oracle__winner">
                  <button type="button" className="oracle__winner-poster" onClick={() => onOpen(leader.movie.id)} aria-label={`Детайли за ${leader.movie.title}`}>
                    <Poster movie={leader.movie} size="lg" />
                  </button>
                  <div className="oracle__winner-info">
                    <h3>{leader.movie.title}</h3>
                    <p className="mono oracle__winner-meta">
                      {leader.movie.year} · {leader.movie.director} · {timecode(leader.movie.runtime)}
                    </p>
                    <p>{leader.movie.blurb}</p>
                    <div className="oracle__winner-actions">
                      {accepted ? (
                        <p className="oracle__thanks">Запазено в списъка ти. Приятно гледане!</p>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => {
                            dispatch({ type: 'addWatch', id: leader.movie.id });
                            api.feedback({ clientId: clientId(), movieId: leader.movie.id, verdict: 'watch' }).catch(() => undefined);
                            setAccepted(true);
                          }}
                        >
                          <Icon name="check" size={16} /> Гледам го!
                        </button>
                      )}
                      <button type="button" className="btn" onClick={restart}>
                        Започни отначало
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="oracle__mind" aria-label="Какво си мисли Оракулът">
          <p className="eyebrow">В мислите на Оракула</p>
          <p className="oracle__count">
            <span className="oracle__count-value">≈{state?.effectiveCandidates ?? '…'}</span>
            <span className="oracle__count-label">филма все още са в играта</span>
          </p>
          <ol className="oracle__top" style={{ filter: state?.done ? 'none' : `blur(${(1 - clarity) * 5}px)` }} aria-hidden={!state?.done}>
            {top.map((c) => (
              <li key={c.movie.id}>
                <span className="oracle__swatch" style={{ background: `linear-gradient(160deg, ${c.movie.palette[1]}, ${c.movie.palette[0]})` }} />
                <span className="oracle__top-title">{c.movie.title}</span>
                <span className="oracle__bar" aria-hidden="true">
                  <span style={{ width: `${Math.max(3, Math.min(100, (c.probability / (leader?.probability || 1)) * 100))}%` }} />
                </span>
                <span className="mono oracle__pct">{Math.round(c.probability * 100)}%</span>
              </li>
            ))}
          </ol>
          {!state?.done && <p className="oracle__note">Отговорите избистрят картината. Имената се изясняват, когато Оракулът е по-сигурен.</p>}
        </aside>
      </div>
    </section>
  );
}
