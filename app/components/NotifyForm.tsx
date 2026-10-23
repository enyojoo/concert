"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "../i18n";

const STORAGE_KEY = "enyo-sam-live-notify";

type Signup = {
  name: string;
  contact: string;
};

const empty: Signup = { name: "", contact: "" };

export function NotifyForm({ t }: { t: Dict["notify"] }) {
  const [form, setForm] = useState<Signup>(empty);
  const [saved, setSaved] = useState<Signup | null>(null);
  const [note, setNote] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Signup & {
        telegram?: string;
        vk?: string;
        email?: string;
      };
      const contact =
        parsed.contact ||
        [parsed.telegram, parsed.vk, parsed.email].filter(Boolean).join(" · ");
      if (parsed?.name && contact) setSaved({ name: parsed.name, contact });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function update(field: keyof Signup, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Signup = {
      name: form.name.trim(),
      contact: form.contact.trim(),
    };

    if (!next.name) {
      setNote(t.nameError);
      nameRef.current?.focus();
      return;
    }
    if (!next.contact) {
      setNote(t.contactError);
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next);
    setNote("");
  }

  function changeDetails() {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setForm(empty);
    setNote("");
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  if (saved) {
    return (
      <div className="notify-card thanks">
        <p className="thanks-kicker">{t.thanks}</p>
        <p className="thanks-name">{saved.name}</p>
        <p className="thanks-contacts">{saved.contact}</p>
        <button type="button" className="text-btn" onClick={changeDetails}>
          {t.change}
        </button>
      </div>
    );
  }

  return (
    <form className="notify-card" onSubmit={onSubmit} noValidate>
      <h2>{t.title}</h2>
      <p className="notify-copy">{t.copy}</p>

      <label className="field">
        <span>{t.name}</span>
        <input
          ref={nameRef}
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
        />
      </label>

      <label className="field">
        <span>{t.contact}</span>
        <input
          name="contact"
          autoComplete="off"
          value={form.contact}
          onChange={(event) => update("contact", event.target.value)}
        />
      </label>

      <button type="submit">{t.submit}</button>
      <p className="form-note" role="status">
        {note}
      </p>
    </form>
  );
}
