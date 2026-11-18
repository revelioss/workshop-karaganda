import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { publicAsset } from "@/lib/public-asset";

export const Route = createFileRoute("/")({ component: Home });

const WHATSAPP = "https://wa.me/77026527347";

const facts = [
  { value: "Длительность", label: "1 час" },
  { value: "Адрес", label: "Назарбаева 37" },
  { value: "Дата", label: "26 ноября, в 18:30" },
  { value: "Темы", label: "маркетинг, автоматизация, налогообложение" },
];

const shifts = [
  "Поймёте, как правильно работать с рекламой",
  "Научитесь автоматизировать обработку заявок",
  "Будете знать всё про налогообложение в 2026 году",
];

const speakers = [
  {
    name: "Жасулан Алимбаев",
    role: "Маркетолог, 5 лет опыта, работал с бюджетами от 10 млн тенге в месяц, специализируется на рекламных кабинетах и работе с блогерами.",
    photo: publicAsset("/speakers/zhasulan.jpg"),
    position: "object-top",
  },
  {
    name: "Сергей Чиняев",
    role: "Специалист по автоматизации обработки заявок. Разбирает NextBot, WhatsApp, Direct и CRM: amoCRM и Битрикс24.",
    photo: publicAsset("/speakers/sergey.jpg"),
    position: "object-top",
  },
  {
    name: "Оксана Згардан",
    role: "Бухгалтер, 5 лет стажа, высшее экономическое образование, диплом ACCA DipIFR. Обучение финансов и бухгалтерии на реальных рабочих задачах.",
    photo: publicAsset("/speakers/oksana-portrait.jpg"),
    position: "object-top",
  },
];

const ctaClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-blue px-7 text-base font-medium text-snow transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 active:opacity-80";

function BookLink({
  children,
  className,
  offset = "night",
}: {
  children: string;
  className?: string;
  offset?: "night" | "paper";
}) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className ?? ctaClass} ${offset === "paper" ? "focus-visible:ring-offset-paper" : "focus-visible:ring-offset-night"}`}
    >
      {children}
    </a>
  );
}

function RevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Number(el.dataset.delay || 0)}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
  return null;
}

function Home() {
  return (
    <div className="min-h-screen">
      <RevealOnScroll />
      <header className="sticky top-0 z-20 border-b border-snow/10 bg-night/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <a href="#top" className="text-sm font-medium text-snow">
            Караганда
          </a>
          <BookLink
            offset="night"
            className="inline-flex h-11 items-center rounded-full bg-blue px-4 text-sm font-medium text-snow"
          >
            Записаться
          </BookLink>
        </div>
      </header>

      <main id="top">
        <section className="bg-night px-6 py-24 text-snow sm:py-32">
          <div className="mx-auto max-w-5xl">
            <h1
              className="rise max-w-4xl text-4xl font-semibold leading-none sm:text-6xl"
              style={{ animationDelay: "40ms" }}
            >
              Практический воркшоп для предпринимателей
            </h1>
            <p
              className="rise mt-6 max-w-3xl text-2xl leading-normal text-snow sm:text-3xl"
              style={{ animationDelay: "140ms" }}
            >
              Покажем, как настроить рекламу, автоматизировать работу с клиентами и расскажем про
              особенности налогообложения
            </p>
            <div className="rise mt-10" style={{ animationDelay: "240ms" }}>
              <BookLink>Забронировать место</BookLink>
            </div>
          </div>
        </section>

        <section className="bg-snow py-10 text-ink sm:py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 data-reveal className="text-center text-xl font-semibold">
              Наши партнёры
            </h2>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:mt-8 sm:gap-x-20">
              <li>
                <img
                  src={publicAsset("/partners/karaganda.png")}
                  alt="Караганда"
                  className="h-14 w-auto sm:h-16"
                />
              </li>
              <li>
                <img
                  src={publicAsset("/partners/legal.png")}
                  alt="Палата юридических консультантов"
                  className="h-10 w-auto max-w-[min(100%,18rem)] sm:h-12 sm:max-w-none"
                />
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-paper px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
              {facts.map((fact, index) => (
                <li
                  key={fact.value}
                  data-reveal
                  data-delay={index * 70}
                  className="bg-snow px-4 py-6 sm:px-5"
                >
                  <p className="text-lg font-semibold leading-tight tracking-tight text-ink sm:text-2xl">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-sm text-quiet">{fact.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-night px-6 py-20 text-snow">
          <div className="mx-auto max-w-5xl">
            <h2 data-reveal className="max-w-3xl text-4xl font-semibold sm:text-5xl">
              Результаты воркшопа
            </h2>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-snow/15 md:grid-cols-3">
              {shifts.map((item, index) => (
                <li key={item} data-reveal data-delay={index * 80} className="bg-night px-5 py-6">
                  <p className="text-sm tabular-nums text-mist">0{index + 1}</p>
                  <p className="mt-3 text-xl font-semibold leading-normal">{item}</p>
                </li>
              ))}
            </ol>
            <div data-reveal className="mt-10">
              <BookLink>Забронировать место</BookLink>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-night py-20 text-snow">
          <div className="mx-auto max-w-5xl px-6">
            <h2 data-reveal className="text-4xl font-semibold sm:text-5xl">Кто выступает</h2>
          </div>
          <div className="speakers-marquee mt-10">
            <div className="speakers-track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex" aria-hidden={copy === 1}>
                  {speakers.map((speaker) => (
                    <li key={`${copy}-${speaker.name}`} className="w-72 shrink-0 pr-4 sm:w-80">
                      <img
                        src={speaker.photo}
                        alt={copy === 0 ? speaker.name : ""}
                        className={`aspect-[3/4] w-full rounded-2xl object-cover ${speaker.position}`}
                      />
                      <div className="px-1 py-5">
                        <h3 className="text-xl font-semibold">{speaker.name}</h3>
                        <p className="mt-2 text-sm leading-normal text-mist">{speaker.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper px-6 pt-20">
          <div className="mx-auto max-w-5xl">
            <article
              data-reveal
              className="rounded-3xl bg-night px-8 py-10 text-snow sm:px-12 sm:py-14"
            >
              <h2 className="text-3xl font-semibold sm:text-4xl">Стоимость участия</h2>
              <p className="mt-6 whitespace-nowrap text-6xl font-semibold leading-none tracking-normal tabular-nums sm:text-8xl">
                15 000
              </p>
              <p className="mt-4 text-xl font-medium text-snow sm:text-2xl">тенге с человека</p>
              <p className="mt-6 max-w-xl text-base leading-normal text-mist">
                Один билет на воркшоп. Бонусы ниже — в подарок участникам, бесплатно.
              </p>
              <div className="mt-8">
                <BookLink>Забронировать место</BookLink>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-paper px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 data-reveal className="text-4xl font-semibold text-ink sm:text-5xl">Бонус</h2>
            <p data-reveal className="mt-4 max-w-2xl text-lg leading-normal text-quiet">
              В подарок участникам. Бесплатно, дополнительно к воркшопу.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article
                data-reveal
                className="cosmos relative overflow-hidden rounded-2xl p-8 text-snow ring-2 ring-blue shadow-[0_18px_50px_rgba(0,113,227,0.28)]"
              >
                <div className="cosmos-sky" aria-hidden="true" />
                <div className="cosmos-stars-far" aria-hidden="true" />
                <div className="cosmos-stars" aria-hidden="true" />
                <div className="relative z-10">
                  <p className="inline-flex rounded-full bg-snow/15 px-3 py-1 text-xs font-medium text-snow">
                    Бесплатно
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-snow">Персональная консультация</h3>
                  <p className="mt-3 leading-normal text-snow">
                    После лекции можно разобрать вашу ситуацию лично: рекламу, заявки или финансы. Не
                    общий разбор, а ваш бизнес.
                  </p>
                </div>
              </article>
              <article
                data-reveal
                data-delay={120}
                className="rounded-2xl bg-snow p-8 text-ink ring-2 ring-blue shadow-[0_18px_50px_rgba(0,113,227,0.16)]"
              >
                <p className="inline-flex rounded-full bg-blue/10 px-3 py-1 text-xs font-medium text-blue">
                  В подарок участникам
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Материалы в Telegram</h3>
                <p className="mt-3 leading-normal text-quiet">
                  После семинара вы получите дополнительные материалы в Telegram-боте.
                </p>
              </article>
            </div>
            <div data-reveal className="mt-10">
              <BookLink offset="paper">Забронировать место</BookLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-snow/10 bg-night px-6 py-6 text-mist">
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <p className="text-center text-xs text-snow sm:text-sm">2026 · Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
