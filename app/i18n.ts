import { cookies, headers } from "next/headers";

export type Locale = "en" | "ru";

export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ru";
}

export type Dict = {
  htmlLang: Locale;
  ogLocale: string;
  title: string;
  description: string;
  kicker: string;
  edition: string;
  tagline: string;
  soon: string;
  place: string;
  guests: string;
  lineupTitle: string;
  tba: string;
  notify: {
    title: string;
    copy: string;
    name: string;
    contact: string;
    submit: string;
    nameError: string;
    contactError: string;
    thanks: string;
    change: string;
  };
};

const dictionaries: Record<Locale, Dict> = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    title: "Enyo Sam Live — Faith, Love & Hope 1.0",
    description:
      "Enyo Sam Live. An intimate evening of Soul, R&B, Afrobeat and Faith music. Faith, Love & Hope 1.0. Coming soon.",
    kicker: "Music Concert",
    edition: "Faith, Love & Hope 1.0",
    tagline: "An intimate evening of Soul, R&B, Afrobeat and Faith music",
    soon: "Coming soon",
    place: "Saint Petersburg, Russia",
    guests: "Special guests",
    lineupTitle: "Four artists on the night",
    tba: "To be announced",
    notify: {
      title: "Notify me",
      copy: "Leave a way to reach you when the night is set.",
      name: "Name",
      contact: "Telegram, VK, MAX or Email",
      submit: "Keep me posted",
      nameError: "Add your name.",
      contactError: "Add Telegram, VK, MAX, or email.",
      thanks: "You’re on the list",
      change: "Change details",
    },
  },
  ru: {
    htmlLang: "ru",
    ogLocale: "ru_RU",
    title: "Enyo Sam Live — Вера, Любовь и Надежда 1.0",
    description:
      "Enyo Sam Live. Камерный вечер соула, R&B, афробита и духовной музыки. Вера, Любовь и Надежда 1.0. Скоро.",
    kicker: "Музыкальный концерт",
    edition: "Вера, Любовь и Надежда 1.0",
    tagline: "Камерный вечер соула, R&B, афробита и духовной музыки",
    soon: "Скоро",
    place: "Санкт-Петербург, Россия",
    guests: "Специальные гости",
    lineupTitle: "Четыре артиста в этот вечер",
    tba: "Будет объявлено",
    notify: {
      title: "Сообщите мне",
      copy: "Оставьте контакт, и мы сообщим, когда дата вечера будет назначена.",
      name: "Имя",
      contact: "Telegram, VK, MAX или email",
      submit: "Держите меня в курсе",
      nameError: "Укажите имя.",
      contactError: "Укажите Telegram, VK, MAX или email.",
      thanks: "Вы в списке",
      change: "Изменить данные",
    },
  },
};

// Russian if the device's top-ranked language is Russian; English for everything else.
export function pickLocale(acceptLanguage: string | null): Locale {
  const top = (acceptLanguage ?? "")
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1, index };
    })
    .filter((entry) => entry.tag && entry.tag !== "*" && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index)[0];

  return top?.tag.split("-")[0] === "ru" ? "ru" : "en";
}

// A choice made with the language switch (cookie) wins over auto-detection.
export async function getLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  return pickLocale((await headers()).get("accept-language"));
}

export async function getDict(): Promise<Dict> {
  return dictionaries[await getLocale()];
}
