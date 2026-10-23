import Image from "next/image";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { NotifyForm } from "./components/NotifyForm";
import { getDict } from "./i18n";

export default async function HomePage() {
  const t = await getDict();

  return (
    <>
      <main id="top">
        <section className="hero">
          <div className="sheet">
            <p className="kicker">{t.kicker}</p>

            <div className="lockup">
              <div className="name">
                <h1>Enyo Sam</h1>
                <p className="live">Live</p>
              </div>
              <p className="edition">{t.edition}</p>
            </div>

            <figure className="artist">
              <Image
                src="/images/artist.png"
                alt="Enyo Sam"
                width={867}
                height={941}
                priority
              />
            </figure>

            <div className="announce">
              <p>{t.tagline}</p>
              <p className="soon">{t.soon}</p>
              <p className="place">{t.place}</p>
            </div>
          </div>
        </section>

        <section className="lineup" aria-labelledby="lineup-title">
          <div className="lineup-inner">
            <p className="kicker">{t.guests}</p>
            <h2 id="lineup-title">{t.lineupTitle}</h2>
            <ol className="lineup-grid">
              {["01", "02", "03", "04"].map((slot) => (
                <li key={slot}>
                  <span className="slot-index">{slot}</span>
                  <span className="slot-frame" aria-hidden="true">
                    <svg className="avatar" viewBox="0 0 80 96">
                      <circle cx="40" cy="30" r="16" />
                      <path d="M12 90c2.2-20 13-30 28-30s25.8 10 28 30" />
                    </svg>
                  </span>
                  <span className="slot-name">{t.tba}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="signup" id="notify">
          <NotifyForm t={t.notify} />
        </div>
      </main>

      <footer className="site-footer">
        <LanguageSwitch current={t.htmlLang} />
      </footer>
    </>
  );
}
