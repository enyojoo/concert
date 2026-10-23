import Image from "next/image";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { NotifyForm } from "./components/NotifyForm";
import { SocialLinks } from "./components/SocialLinks";
import { getDict } from "./i18n";

const MANAGER_URL = "https://vk.ru/lovelyanastasia";

function VkIcon() {
  return (
    <svg className="vk-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.195 1.254.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
    </svg>
  );
}

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
        <SocialLinks label={t.socials} />
        <p className="credit">
          <span className="footer-label">{t.manager.role}</span>
          <a className="credit-link" href={MANAGER_URL} target="_blank" rel="noopener noreferrer">
            <VkIcon />
            <span>{t.manager.name}</span>
          </a>
        </p>
        <LanguageSwitch current={t.htmlLang} />
        <p className="copyright">© {new Date().getFullYear()} Enyo Sam Live</p>
      </footer>
    </>
  );
}
