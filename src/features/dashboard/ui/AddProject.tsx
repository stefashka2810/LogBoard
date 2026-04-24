import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/shared/ui/Modal";
import AddProjectForm from "@/features/projectWork/ui/AddProjectForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

const AddProject = ({
  handleClick2,
}: {
  handleClick2: (arg: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    const newOpen = !open;
    setOpen(newOpen);
    handleClick2(newOpen);
  };

  return (
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-fit">
            <SheetHeader>
              <SheetTitle>Создать проект</SheetTitle>
            </SheetHeader>
            <AddProjectForm onLoginSuccessAction={handleClick} />
          </SheetContent>
        </Sheet>
      ) : (
        <Modal open={open} onClose={handleClick}>
          <AddProjectForm onLoginSuccessAction={handleClick} />
        </Modal>
      )}
      <button
        onClick={handleClick}
        className="mt-3 flex w-full items-center gap-2 rounded-md bg-[#E4E0FF] hover:cursor-pointer px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-[#E4E0FF]/80"
      >
        <Plus className="size-4 shrink-0 text-black" />
        <span>Добавить новый проект</span>
      </button>
    </>
  );
};

export default AddProject;
