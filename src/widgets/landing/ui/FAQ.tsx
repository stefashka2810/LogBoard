"use client";

import React, { useMemo, useState } from "react";

export default function FAQSection() {
  const faqs = useMemo(
    () => [
      {
        q: "Как подключить приложение к LogBoard?",
        a: "Для каждого проекта можно создать API-ключ и использовать его при отправке логов в систему. Это позволяет безопасно разделять доступ между разными проектами и источниками данных.",
      },
      {
        q: "Что можно делать с логами в dashboard?",
        a: "В dashboard доступны поиск по сообщению, фильтрация по уровню и периоду, сортировка по времени, а также просмотр таблицы логов и сводной аналитики по выбранному проекту.",
      },
      {
        q: "Какие данные отображаются в таблице логов?",
        a: "В таблице отображаются уровень лога, текст сообщения и время события. Такой формат позволяет быстро просматривать записи и находить важные ошибки и предупреждения.",
      },
      {
        q: "Как в системе организован доступ к проектам?",
        a: "Доступ к проекту получают только его участники. Внутри проекта можно управлять составом команды, а действия пользователя зависят от его роли: OWNER, ADMIN или READER.",
      },
      {
        q: "Для чего нужны графики и аналитика?",
        a: "Графики помогают увидеть общую активность логов за выбранный период и понять, как распределяются события по уровням.",
      },
      {
        q: "Что пользователь может делать после входа в систему?",
        a: "После авторизации пользователь может выбрать проект, перейти к его логам, управлять участниками и API-ключами в пределах своих прав.",
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
