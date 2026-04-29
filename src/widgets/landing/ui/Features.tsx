import Image from "next/image";
import { CircleUserRound, FolderCog, Search } from "lucide-react";

const Features = () => {
  const cardBase =
    "w-[clamp(180px,22vw,270px)] aspect-square rounded-4xl p-4 shadow-sm";
  const cardLight = `${cardBase} bg-[#F1F1F1] text-black`;
  const cardDark = `${cardBase} bg-[#1A1A1A] text-white`;

  const cardInner = "w-full h-full flex flex-col justify-between items-center";

  const iconLight =
    "w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] text-black/50";

  return (
    <>
      <section className={"grid lg:grid-cols-[50vw_1fr] lg:gap-2"}>
        <div className="relative flex flex-col h-fit after:block after:content-[''] after:h-[180px]">
          <div className="relative w-[170px] h-[170px] lg:w-[250px] lg:h-[250px]">
            <Image
              src="/images/01.svg"
              alt="1"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className={"absolute top-1/5 left-10  flex flex-col gap-5"}>
            <span className={"text-[#616161] font-bold"}>Возможности</span>
            <span className={"text-h2 font-bold"}>
              ЛУЧШИЕ ВОЗМОЖНОСТИ <br />
              НАШЕЙ ПЛАТФОРМЫ
            </span>
            <div
              className={
                "text-body flex flex-row p-4 w-fit h-fit text-black italic rounded-4xl bg-[#83FF8F]"
              }
            >
              LogBoard — это централизованная система логов, которая
              предоставляет удобный интерфейс для их поиска, фильтрации и
              анализа.
            </div>
          </div>
        </div>

        <div
          className={
            "grid grid-cols-[max-content_max-content] gap-2 sm:gap-5 justify-end"
          }
        >
          <div className={"flex flex-col w-fit lg:pt-15 gap-2 sm:gap-5"}>
            <div className={cardLight}>
              <div className={cardInner}>
                <span className={"font-bold text-h3"}>Гибкий поиск</span>
                <Search className={iconLight} strokeWidth={3} />
                <span className={"text-body text-center"}>
                  Поддерживает поиск по содержимому сообщения, фильтрацию по
                  дате и уровню лога, сортировку по времени
                </span>
              </div>
            </div>

            <div className={cardLight}>
              <div className={cardInner}>
                <span className={"font-bold text-h3"}>Личный кабинет</span>
                <CircleUserRound className={iconLight} strokeWidth={3} />
                <span className={"text-body text-center"}>
                  Кабинет пользователя для безопасносного управления проектами
                </span>
              </div>
            </div>
          </div>

          <div className={"flex flex-col w-fit gap-2 sm:gap-5"}>
            <div className={cardDark}>
              <div className={cardInner}>
                <span className={"font-bold text-h3"}>Аналитика</span>

                <div className="relative w-[70%] h-[25%]">
                  <Image
                    src="/images/Vector.svg"
                    alt="Vector"
                    fill
                    className="object-contain"
                  />
                </div>

                <span className={"text-body text-center"}>
                  Визуализация результатов анализа логов по их уровню
                </span>
              </div>
            </div>

            <div className={cardLight}>
              <div className={cardInner}>
                <span className={"font-bold text-h3 text-center"}>
                  Управление проектами
                </span>
                <FolderCog className={iconLight} strokeWidth={3} />
                <span className={"text-body text-center"}>
                  Доступ к проектам и их логам, возможность управлять их
                  API-ключами и участниками
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
