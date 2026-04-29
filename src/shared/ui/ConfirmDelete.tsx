import { Button } from "@/shared/ui/Button";
import Modal from "@/shared/ui/Modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

interface ConfirmDeleteProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
  successMessage: string;
  confirmLabel?: string;
  modalTitle?: string;
  maxWidth?: number;
}

const ConfirmDelete = ({
  open,
  title,
  onConfirm,
  onClose,
  error,
  isLoading,
  isSuccess,
  isError,
  successMessage,
  confirmLabel = "Да, удалить",
  modalTitle = "Подтверждение действия",
  maxWidth = 400,
}: ConfirmDeleteProps) => {
  const isMobile = useIsMobile();

  const content = (
    <div
      style={{
        background: isMobile ? "#E4E0FF" : "transparent",
      }}
      className="flex h-fit w-full flex-col items-center justify-center gap-2 p-8"
    >
      <span className="mb-3 font-semibold">{title}</span>

      {isError && (
        <span className="text-xs text-black">
          {typeof error === "string"
            ? error
            : error && typeof error === "object" && "message" in error
              ? (error as { message: string }).message
              : "Произошла ошибка. Попробуйте позже"}
        </span>
      )}

      {isSuccess && (
        <span className="text-xs text-black">{successMessage}</span>
      )}

      <div className="flex w-full flex-row items-center justify-center gap-2">
        <Button
          style={{
            color: "white",
          }}
          className="h-9 w-full rounded-md border-none bg-[#F07FE5] py-1 hover:scale-100"
          onClick={onConfirm}
        >
          {isLoading ? "Выполняется..." : confirmLabel}
        </Button>

        <Button
          className="h-9 w-full rounded-md border-none bg-white py-1 hover:scale-100"
          onClick={onClose}
        >
          Отмена
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
        <SheetContent side="bottom" className="h-fit">
          <SheetHeader>
            <SheetTitle>{modalTitle}</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Modal open={open} onClose={onClose} maxWidth={maxWidth}>
      {content}
    </Modal>
  );
};

export default ConfirmDelete;
