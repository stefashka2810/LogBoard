import ConfirmDelete from "@/shared/ui/ConfirmDelete";

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
  return (
    <ConfirmDelete
      open={true}
      title="Вы уверены, что хотите удалить проект?"
      onConfirm={onClickDelete}
      onClose={onCloseModal}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      successMessage="Проект успешно удален!"
      modalTitle="Удаление проекта"
    />
  );
};

export default ConfirmProjectDelete;
