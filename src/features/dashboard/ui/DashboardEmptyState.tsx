export function DashboardEmptyState() {
  return (
    <div className="flex h-full items-center justify-center bg-[#FEEB86]/20 px-6 pb-8 pt-6">
      <div className="w-full max-w-xl rounded-3xl border border-[#E9E9E9] bg-[#8E7FF0]/20 p-10 text-center">
        <h1 className="text-2xl font-semibold text-[#111111]">
          Выберите проект
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#111111]/60">
          Здесь появятся таблица логов и графики по выбранному проекту.
        </p>
      </div>
    </div>
  );
}
