"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { setLocale } from "../actions";
import type { Locale } from "../i18n";

function FlagEn() {
  return (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#c8102e" strokeWidth="2" />
      <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V30M0 15H60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

function FlagRu() {
  return (
    <svg className="flag" viewBox="0 0 3 2" aria-hidden="true">
      <rect width="3" height="2" fill="#fff" />
      <rect y="0.667" width="3" height="1.333" fill="#0039a6" />
      <rect y="1.333" width="3" height="0.667" fill="#d52b1e" />
    </svg>
  );
}

const options: { locale: Locale; name: string; Flag: () => React.JSX.Element }[] = [
  { locale: "en", name: "English", Flag: FlagEn },
  { locale: "ru", name: "Русский", Flag: FlagRu },
];

export function LanguageSwitch({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const active = options.find((option) => option.locale === current) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(locale: Locale) {
    setOpen(false);
    if (locale !== current) startTransition(() => setLocale(locale));
  }

  return (
    <div className="lang-picker" ref={root}>
      <button
        type="button"
        className="lang-trigger"
        aria-label={`Language, ${active.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
      >
        <active.Flag />
        <span lang={active.locale}>{active.name}</span>
        <svg className="chevron" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <ul className="lang-menu" id={listId} role="listbox" aria-label="Language">
          {options.map(({ locale, name, Flag }) => (
            <li key={locale} role="presentation">
              <button
                type="button"
                role="option"
                lang={locale}
                aria-selected={locale === current}
                onClick={() => choose(locale)}
              >
                <Flag />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
