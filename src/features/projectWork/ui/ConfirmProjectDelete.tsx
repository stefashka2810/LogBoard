import { Button } from "@/shared/ui/Button";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

interface ConfirmProjectDeleteProps {
  onClickDelete: () => void;
  onCloseModal: () => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
}

const ConfirmProjectDelete = ({
  onClickDelete,
  onCloseModal,
  error,
  isLoading,
  isSuccess,
  isError,
}: ConfirmProjectDeleteProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        background: isMobile ? "#E4E0FF" : "transparent",
      }}
      className={
        "flex flex-col gap-2 items-center justify-center w-full h-fit p-8"
      }
    >
      <span className={"font-semibold mb-3"}>
        Вы уверены, что хотите удалить проект?
      </span>

      {isError && (
        <span className={"text-xs text-black"}>
          {typeof error === "string"
            ? error
            : error && typeof error === "object" && "message" in error
              ? (error as { message: string }).message
              : "Произошла ошибка. Попробуйте позже"}
        </span>
      )}

      {isSuccess && (
        <span className={"text-xs text-black"}>Проект успешно удален!</span>
      )}

      <div className={"flex flex-row w-full gap-2 justify-center items-center"}>
        <Button
          className="w-full py-1 text-white md:text-sm rounded-md h-9 hover:scale-100 border-none bg-[#F07FE5]"
          onClick={onClickDelete}
        >
          {isLoading ? "Удаление..." : "Да, удалить"}
        </Button>

        <Button
          className="w-full py-1 md:text-sm rounded-md h-9 border-none hover:scale-100 bg-white"
          onClick={onCloseModal}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default ConfirmProjectDelete;
