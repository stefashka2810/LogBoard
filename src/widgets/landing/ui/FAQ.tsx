"use client";

import React, { useMemo, useState } from "react";

export default function FAQSection() {
  const faqs = useMemo(
    () => [
      {
        q: "Как отправлять логи в систему?",
        a: "Логи отправляются через REST-запрос на API. Обычно вы передаёте проект, дату/время, уровень и сообщение.",
      },
      {
        q: "Какие фильтры доступны в поиске?",
        a: "Можно фильтровать по дате и по уровню лога, а также искать по тексту сообщения. Результаты выводятся с пагинацией.",
      },
      {
        q: "Какие поля отображаются в списке логов?",
        a: "В списке отображаются дата, уровень и сообщение. Это базовые поля для быстрого просмотра и анализа.",
      },
      {
        q: "Можно ли сортировать логи?",
        a: "Да, сортировка доступна по каждому полю: по дате, по уровню и по сообщению — чтобы быстрее находить нужные записи.",
      },
      {
        q: "Как работают графики по периоду?",
        a: "Графики масштабируются по выбранному периоду: при выборе одного дня данные разбиваются по часам, при выборе недели — по дням.",
      },
      {
        q: "Зачем нужен личный кабинет?",
        a: "В личном кабинете пользователь управляет учётной записью, проектами и настройками. В списке проектов можно выбрать проект и перейти к поиску логов по нему.",
      },
    ],
    [],
  );

  return (
    <section className="mx-auto w-full max-w-5xl px-[4vw] py-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {faqs.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-4xl border border-black/10 bg-[#F1F1F1] p-5 transition hover:border-black/25">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-body text-black/40">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-body font-bold leading-tight text-black">{q}</h3>
        </div>

        <span className="text-h3 ml-4 text-black/40 transition group-hover:text-black hover:cursor-pointer">
          {open ? "–" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-body text-black/70">{a}</p>
        </div>
      </div>
    </div>
  );
}
