import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/shared/ui/Modal";
import AddProjectForm from "@/features/projectWork/ui/AddProjectForm";

const AddProject = ({
  handleClick2,
}: {
  handleClick2: (arg: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
    handleClick2(open);
  };

  return (
    <>
      <Modal open={open} onClose={handleClick}>
        <AddProjectForm onLoginSuccessAction={handleClick} />
      </Modal>
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
