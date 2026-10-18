import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';
import './PromptBar.css';

export const EXAMPLES = [
  'Нещо страшно, но не прекалено',
  'Нещо объркващо като The Thing или Black Swan',
  'Избери ми филм, не искам тъжен край',
  'Кофти ден съм, искам нещо за повдигане',
  'С децата, нещо вълшебно, до 2 часа',
  'Романтична комедия от 90-те',
  'Мрачен трилър с обрат, без кръв',
  'Нещо в стил Нолан, но по-кратко',
];

interface Props {
  take: number;
  busy: boolean;
  onSubmit: (text: string) => void;
  feedback: { tone: 'info' | 'warn'; text: string } | null;
}

export function PromptBar({ take, busy, onSubmit, feedback }: Props) {
  const [text, setText] = useState('');
  const [placeholder, setPlaceholder] = useState(0);
  const [clap, setClap] = useState(0);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const inputId = useId();
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focused || text || reduced) return;
    const timer = setInterval(() => setPlaceholder((p) => (p + 1) % EXAMPLES.length), 3600);
    return () => clearInterval(timer);
  }, [focused, text, reduced]);

  const submit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || busy) return;
    setClap((c) => c + 1);
    onSubmit(trimmed);
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(text);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit(text);
    }
  };

  return (
    <form className="slate" onSubmit={onFormSubmit} aria-busy={busy}>
      <div className="slate__clapper" aria-hidden="true">
        <span key={clap} className={`slate__stick ${clap ? 'slate__stick--clap' : ''}`} />
        <span className="slate__base" />
      </div>
      <div className="slate__meta mono" aria-hidden="true">
        <span>Продукция: <b>тази вечер</b></span>
        <span>Сцена: <b>настроение</b></span>
        <span>Дубл: <b>{String(take).padStart(2, '0')}</b></span>
      </div>
      <label htmlFor={inputId} className="slate__label">
        Опиши с думи какво ти се гледа
      </label>
      <div className="slate__field">
        <textarea
          id={inputId}
          ref={area}
          className="slate__input"
          rows={2}
          maxLength={400}
          value={text}
          placeholder={`${EXAMPLES[placeholder]}…`}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="btn btn--primary slate__go" type="submit" disabled={busy || !text.trim()}>
          {busy ? 'Мисля…' : 'Намери'}
        </button>
      </div>
      <div className="slate__examples">
        <span className="eyebrow">Опитай</span>
        {EXAMPLES.slice(0, 6).map((example) => (
          <button
            key={example}
            type="button"
            className="slate__example"
            onClick={() => {
              setText(example);
              submit(example);
              area.current?.focus();
            }}
          >
            {example}
          </button>
        ))}
      </div>
      <p className={`slate__feedback slate__feedback--${feedback?.tone ?? 'info'}`} role="status" aria-live="polite">
        {feedback?.text ?? ''}
      </p>
    </form>
  );
}
