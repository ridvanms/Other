import { DIM_META, DIMS, type CommunityStats } from '@moodreel/core';
import { useEffect, useState } from 'react';
import { useApi } from '../state/api';
import './CommunityPulse.css';

/** What everyone else picked this week. Only exists when a shared server collects the votes. */
export function CommunityPulse({ refreshKey, onOpen }: { refreshKey: number; onOpen: (id: string) => void }) {
  const { api } = useApi();
  const [stats, setStats] = useState<CommunityStats | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .stats()
      .then((s) => alive && setStats(s))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [api, refreshKey]);

  // Nothing to show until someone has actually picked a film.
  if (api.mode === 'local' || !stats || stats.totalPicks === 0) return null;
  const mood = stats.mood;

  return (
    <section className="pulse panel" aria-labelledby="pulse-title">
      <div className="pulse__intro">
        <p className="eyebrow">Пулс</p>
        <h2 id="pulse-title">Тази седмица в MoodReel</h2>
        <p className="pulse__figure">{stats.weekPicks}</p>
        <p className="pulse__caption">{stats.weekPicks === 1 ? 'избран филм за последните 7 дни' : 'избрани филма за последните 7 дни'}</p>
      </div>

      <div className="pulse__block">
        <p className="eyebrow">Най-избирани</p>
        {stats.topWeek.length === 0 ? (
          <p className="pulse__empty">Още никой не е натиснал „Гледам го!“ тази седмица. Твоят избор ще е първият.</p>
        ) : (
          <ol className="pulse__top">
            {stats.topWeek.map(({ movie, picks }) => (
              <li key={movie.id}>
                <button type="button" onClick={() => onOpen(movie.id)}>
                  {movie.title}
                </button>
                <span className="mono">{picks}×</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <figure className="pulse__block pulse__mood">
        <figcaption className="eyebrow">Какво търсят хората спрямо средата (5)</figcaption>
        {!mood ? (
          <p className="pulse__empty">Трябват още няколко избора, за да има смислена средна стойност.</p>
        ) : (
          <table className="pulse__table">
            <tbody>
              {DIMS.filter((d) => mood[d] !== undefined).map((dim) => {
                const delta = mood[dim]! - 5;
                const width = Math.min(50, Math.abs(delta) * 10);
                return (
                  <tr key={dim}>
                    <th scope="row">{DIM_META[dim].short}</th>
                    <td>
                      <span className="pulse__track">
                        <span className={`pulse__bar ${delta >= 0 ? 'is-up' : 'is-down'}`} style={delta >= 0 ? { left: '50%', width: `${width}%` } : { right: '50%', width: `${width}%` }} />
                      </span>
                    </td>
                    <td className="mono pulse__value">
                      {delta >= 0 ? '+' : '−'}
                      {Math.abs(delta).toFixed(1).replace('.', ',')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {mood && <p className="pulse__legend">наляво – по-малко от средното · надясно – повече · от {stats.moodSamples} избора</p>}
      </figure>
    </section>
  );
}
