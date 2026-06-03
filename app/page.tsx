function Eye({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 20 C 16 4, 48 4, 62 20 C 48 36, 16 36, 2 20 Z" />
      <circle cx="32" cy="20" r="8" />
      <circle cx="32" cy="20" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Gaze({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 20 C 16 4, 48 4, 62 20 C 48 36, 16 36, 2 20 Z" />
      <circle cx="32" cy="20" r="8" />
      <circle cx="32" cy="20" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const tenses = [
  {
    name: "Presente",
    note: "now · habits · general truths",
    forms: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
  },
  {
    name: "Pretérito imperfecto",
    note: "ongoing past · habitual past",
    forms: ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"],
  },
  {
    name: "Pretérito indefinido",
    note: "completed past · narrative",
    forms: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
  },
  {
    name: "Futuro simple",
    note: "future · probability now",
    forms: ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"],
  },
  {
    name: "Condicional",
    note: "would · polite requests",
    forms: ["hablaría", "hablarías", "hablaría", "hablaríamos", "hablaríais", "hablarían"],
  },
  {
    name: "Presente de subjuntivo",
    note: "doubt · desire · emotion",
    forms: ["hable", "hables", "hable", "hablemos", "habléis", "hablen"],
  },
];

const persons = ["yo", "tú", "él / ella", "nosotros", "vosotros", "ellos / ellas"];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="w-full border-b hairline">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="ink-stamp" aria-hidden>
              <Eye className="w-6 h-4" />
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-lg leading-none">Verbos</span>
              <span className="text-xs text-muted mt-1 tracking-wide">
                atlas español · атлас іспанських дієслів
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#verbos">Verbos</a>
            <a href="#conjugacion">Conjugación</a>
            <a href="#metodo">Método</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-8 py-24">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8 flex flex-col gap-8">
            <span className="text-xs tracking-[0.3em] uppercase text-muted">
              Conjugación española · A1 — C1
            </span>
            <h1 className="text-balance">
              Кожне закінчення —
              <span className="vermillion"> це історія, </span>
              а не правило.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed">
              Атлас іспанських дієслів: усі часи, всі особи, повільно й
              намірено. Без стріків, без таймерів — лише слово та його зміна.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#conjugacion"
                className="inline-flex items-center justify-center h-12 px-8 border hairline-strong hover:bg-sumi hover:text-washi transition-colors duration-500"
              >
                Почати
              </a>
              <a
                href="#metodo"
                className="inline-flex items-center justify-center h-12 px-2 text-sm"
              >
                Про метод →
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end items-end">
            <Gaze className="w-56 h-[28rem] text-sumi opacity-[0.10] select-none" />
          </div>
        </section>

        <hr />

        <section id="verbos" className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--hairline)]">
          {[
            {
              infinitive: "hablar",
              meaning: "to speak",
              type: "regular · -ar",
              example: "Hablo español desde los diez años.",
              forms: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
            },
            {
              infinitive: "comer",
              meaning: "to eat",
              type: "regular · -er",
              example: "Como fruta cada mañana.",
              forms: ["como", "comes", "come", "comemos", "coméis", "comen"],
            },
            {
              infinitive: "ir",
              meaning: "to go",
              type: "altamente irregular",
              example: "Voy al mercado los domingos.",
              forms: ["voy", "vas", "va", "vamos", "vais", "van"],
            },
          ].map((v) => (
            <article
              key={v.infinitive}
              className="washi-card p-10 flex flex-col gap-6 hover:translate-y-[-2px] transition-transform duration-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-3xl">{v.infinitive}</h3>
                  <p className="text-sm text-muted mt-2 tracking-wide italic">
                    {v.meaning}
                  </p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted text-right max-w-[90px]">
                  {v.type}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
                {v.forms.map((f, i) => (
                  <span key={i} className="font-serif text-base">
                    {f}
                  </span>
                ))}
              </div>

              <p className="text-sm text-sumi-soft border-l hairline pl-4 italic">
                {v.example}
              </p>

              <div className="flex items-center justify-between pt-2 mt-auto">
                <button className="text-xs tracking-[0.2em] uppercase text-muted hover:vermillion transition-colors">
                  Conjugación
                </button>
                <Eye className="w-5 h-3 text-muted" />
              </div>
            </article>
          ))}
        </section>

        <section id="conjugacion" className="mt-32 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-6">
            <span className="text-xs tracking-[0.3em] uppercase text-muted">
              Conjugación
            </span>
            <h2>
              Одне дієслово,
              <br />
              <span className="gold-leaf italic">шість часів.</span>
            </h2>
            <p className="text-muted leading-relaxed">
              Повна таблиця дієслова <em className="font-serif">hablar</em> у
              шести основних часах іспанської мови. Натисніть на форму, щоб
              побачити її у реченні. Без таймерів, без очок — текст і є
              практика.
            </p>
            <div className="pt-4">
              <Eye className="w-10 h-6 text-muted opacity-50" />
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="washi-card p-8 overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="text-xs tracking-[0.2em] uppercase text-muted">
                    <th className="font-normal pb-6 pr-6 w-[170px]">Tiempo</th>
                    {persons.map((p) => (
                      <th key={p} className="font-normal pb-6 pr-3 font-serif normal-case text-[12px] tracking-normal text-muted">
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tenses.map((t) => (
                    <tr
                      key={t.name}
                      className="border-t hairline hover:bg-[var(--washi-deep)] transition-colors"
                    >
                      <td className="py-5 pr-6 align-top">
                        <div className="text-sm font-serif">{t.name}</div>
                        <div className="text-[10px] text-muted mt-1 italic leading-snug max-w-[160px]">
                          {t.note}
                        </div>
                      </td>
                      {t.forms.map((f, fi) => (
                        <td
                          key={fi}
                          className={`py-5 pr-3 font-serif text-base ${
                            fi < 3 ? "text-sumi" : "text-muted"
                          }`}
                        >
                          {f}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted mt-4 italic">
              Праві три стовпчики (nosotros · vosotros · ellos) — форми
              множини, ліво-центральні — однини.
            </p>
          </div>
        </section>

        <hr />

        <section id="practice" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="washi-card p-10">
            <span className="text-xs tracking-[0.3em] uppercase text-muted">
              Práctica
            </span>
            <h2 className="mt-4 mb-8">Одне речення.</h2>

            <div className="space-y-6">
              <p className="font-serif text-2xl leading-relaxed">
                Ayer, yo ____ español con mi amigo.
              </p>

              <div className="flex flex-col gap-3">
                <label className="text-xs tracking-[0.2em] uppercase text-muted">
                  Tu forma
                </label>
                <input
                  type="text"
                  placeholder="escribe la forma correcta…"
                  className="border-b hairline-strong pb-2 text-lg font-serif placeholder:text-[var(--nezumi)] focus:border-[var(--akane)] transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button className="h-10 px-6 bg-sumi text-washi text-sm tracking-wide hover:bg-[var(--akane)] transition-colors duration-500">
                  Comprobar
                </button>
                <button className="h-10 px-4 text-sm text-muted hover:vermillion transition-colors">
                  Ver respuesta
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-6">
              <Eye className="w-10 h-6 mt-2 text-muted shrink-0" />
              <div>
                <h3 className="mb-3">Lee despacio</h3>
                <p className="text-muted leading-relaxed">
                  Кожну форму варто прочитати вголос. Вимова — це частина
                  значення, і вона заслуговує на ту ж увагу, що й самі літери.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <Eye className="w-10 h-6 mt-2 vermillion shrink-0" />
              <div>
                <h3 className="mb-3">Mira la terminación</h3>
                <p className="text-muted leading-relaxed">
                  Іспанська морфологія — це переважно про закінчення. Дивись
                  на них уважно: <em>-aba, -é, -ará, -ría</em> — кожне
                  відкриває інший час.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <Eye className="w-10 h-6 mt-2 text-muted shrink-0" />
              <div>
                <h3 className="mb-3">Vuelve mañana</h3>
                <p className="text-muted leading-relaxed">
                  Поверніться до того ж дієслова завтра. Пам'ять — це не
                  спалах, а повернення: одне й те саме слово, та сама форма,
                  знову й знову.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="mt-32 max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-muted">
            Método
          </span>
          <h2 className="mt-4 mb-8">Сад, а не спортзал.</h2>
          <p className="text-muted leading-relaxed mb-6">
            Verbos побудовано на простій ідеї: вивчення має бути схожим на
            садівництво більше, ніж на спорт. Ви повертаєтесь до тих самих
            дієслів у різні пори року, і повільно вони стають знайомими.
          </p>
          <p className="text-muted leading-relaxed">
            Інтерфейс призначений для того, щоб зникнути.
            <a href="#" className="vermillion"> Що залишається — це слово</a>.
          </p>
        </section>
      </main>

      <footer className="border-t hairline mt-24">
        <div className="max-w-5xl mx-auto px-8 py-10 flex items-center justify-between text-xs text-muted tracking-wide">
          <span>© Verbos · atlas español</span>
          <div className="flex items-center gap-6">
            <a href="#">Método</a>
            <a href="#">Changelog</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
