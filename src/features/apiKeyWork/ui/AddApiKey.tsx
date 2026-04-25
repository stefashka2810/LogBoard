import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import AddApiKeyForm from "@/features/apiKeyWork/ui/AddApiKeyForm";
import Modal from "@/shared/ui/Modal";
import { useState } from "react";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";
import { Project } from "@/entities/project/model/types";

export const AddApiKey = (currentProject: Project) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleActionWithModal = (flag: boolean) => {
    setOpen(flag);
  };

  return (
    <>
      <button
        onClick={() => handleActionWithModal(true)}
        className="flex w-fit items-center gap-2 rounded-lg bg-[#A33E94]/40 px-4 py-2.5 text-sm font-semibold text-[#081133]  transition-transform hover:cursor-pointer hover:scale-[1.02]"
      >
        <Plus className="size-4 shrink-0 text-black" />
        <span>Создать ключ</span>
      </button>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-fit">
            <SheetHeader>
              <SheetTitle>Создать ключ</SheetTitle>
            </SheetHeader>
            <AddApiKeyForm
              projectId={currentProject.id}
              onClose={() => handleActionWithModal(false)}
            ></AddApiKeyForm>
          </SheetContent>
        </Sheet>
      ) : (
        <Modal open={open} onClose={() => handleActionWithModal(false)}>
          <AddApiKeyForm
            projectId={currentProject.id}
            onClose={() => handleActionWithModal(false)}
          ></AddApiKeyForm>
        </Modal>
      )}
    </>
  );
};
