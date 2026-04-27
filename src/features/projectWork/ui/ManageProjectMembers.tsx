import {
  Check,
  CircleX,
  LoaderCircle,
  Shield,
  UserRound,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import {
  useDeleteProjectMemberMutation,
  useGetProjectMembersQuery,
  useUpdateProjectMemberRoleMutation,
} from "@/features/projectWork/api/projectApi";
import { Project } from "@/entities/project/model/types";
import Modal from "@/shared/ui/Modal";
import { useState } from "react";

export const ManageProjectMembers = (project: Project) => {
  const { data, isLoading, isError, error } = useGetProjectMembersQuery(
    project.id,
  );

  const [deleteProjectMember, { isLoading: isDeleting }] =
    useDeleteProjectMemberMutation();
  const [
    updateProjectMemberRole,
    { isLoading: isUpdating, isError: isErrorUpdate, error: updateError },
  ] = useUpdateProjectMemberRoleMutation();
  const [open, setOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<"ADMIN" | "READER">(
    "READER",
  );

  const handleDelete = async (userId: number) => {
    try {
      setDeletingUserId(userId);
      await deleteProjectMember({ projectId: project.id, userId }).unwrap();
    } catch (deleteError) {
      console.log("Failed to delete project member:", deleteError);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleStartEdit = (userId: number, role: "ADMIN" | "READER") => {
    setEditingUserId(userId);
    setSelectedRole(role);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleUpdateRole = async (userId: number) => {
    try {
      await updateProjectMemberRole({
        projectId: project.id,
        userId,
        role: selectedRole,
      }).unwrap();
      setEditingUserId(null);
    } catch (roleError) {
      console.log("Failed to update project member role:", roleError);
    }
  };

  const getRoleStyles = (role: string) => {
    if (role === "OWNER") {
      return "text-[#3652D9]";
    }
    if (role === "ADMIN") {
      return "text-[#A33E94]";
    }
    return " text-[#1E5F7A]";
  };

  return (
    <>
      <button
        className={
          "inline-flex rounded-full  px-3 py-1 bg-[#4C6DFA]/20 text-[#4C6DFA] hover:cursor-pointer"
        }
        onClick={() => setOpen(true)}
      >
        <UsersRound />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} maxWidth={560}>
        <div className="w-[90vw] max-w-[560px] rounded-[1.5rem] bg-[#E4E0FF] p-5 text-black sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-h3 font-bold ">Участники проекта</h2>
              <p className="mt-2 text-sm leading-6 text-[#4B5B8F]">
                Управляйте составом команды и удаляйте участников, которым
                больше не нужен доступ.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-white/70 bg-white/60 p-3 sm:p-4">
            {isErrorUpdate && (
              <div className="mb-4 rounded-xl border border-[#A33E94]/15 bg-[#A33E94]/8 px-4 py-3 text-sm text-[#A33E94]">
                {typeof updateError === "string"
                  ? updateError
                  : "Не удалось обновить роль участника."}
              </div>
            )}

            {isLoading && (
              <div className="flex min-h-40 items-center justify-center">
                <LoaderCircle className="h-6 w-6 animate-spin text-[#3652D9]" />
              </div>
            )}

            {isError && (
              <div className="flex min-h-40 flex-col items-center justify-center text-center">
                <p className="text-base font-semibold text-[#A33E94]">
                  Не удалось загрузить участников
                </p>
                <p className="mt-2 text-sm text-[#4B5B8F]">
                  {typeof error === "string"
                    ? error
                    : "Попробуйте обновить данные позже."}
                </p>
              </div>
            )}

            {!isLoading && !isError && (!data || data.length === 0) && (
              <div className="flex min-h-40 flex-col items-center justify-center text-center">
                <p className="text-base font-semibold text-[#3652D9]">
                  В проекте пока нет участников
                </p>
                <p className="mt-2 text-sm text-[#4B5B8F]">
                  Добавьте коллег, чтобы открыть им доступ к проекту.
                </p>
              </div>
            )}

            {!isLoading && !isError && data && data.length > 0 && (
              <div className="flex flex-col gap-3">
                {data.map((member) => {
                  const canEditRole =
                    project.role === "OWNER" && member.role !== "OWNER";
                  const canDelete =
                    (project.role === "OWNER" && member.role !== "OWNER") ||
                    (project.role === "ADMIN" && member.role === "READER");
                  const isDeletingCurrent = deletingUserId === member.userId;
                  const isEditingCurrent = editingUserId === member.userId;

                  return (
                    <div
                      key={member.userId}
                      className="flex items-center justify-between gap-3 rounded-[1rem] border border-[#4C6DFA]/10 px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E4E0FF] ">
                          {member.role === "OWNER" ? (
                            <Shield className="h-5 w-5" />
                          ) : (
                            <UserRound className="h-5 w-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#15204B] sm:text-base">
                            {member.username}
                          </p>
                          {isEditingCurrent ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {(["ADMIN", "READER"] as const).map((role) => (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => setSelectedRole(role)}
                                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                    selectedRole === role
                                      ? "bg-[#4C6DFA] text-white"
                                      : "bg-[#E4E0FF] text-[#3652D9] hover:cursor-pointer"
                                  }`}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span
                              className={`text-body ${getRoleStyles(member.role)}`}
                            >
                              {member.role}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={"flex flex-row gap-3"}>
                        {canEditRole &&
                          (isEditingCurrent ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleUpdateRole(member.userId)}
                                disabled={isUpdating}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#4C6DFA]/15 bg-white/80 text-[#3652D9] transition-colors hover:cursor-pointer hover:bg-[#4C6DFA] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Сохранить роль участника"
                              >
                                {isUpdating ? (
                                  <LoaderCircle className="h-5 w-5 animate-spin" />
                                ) : (
                                  <Check className="h-5 w-5" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A33E94]/15 bg-white/80 text-[#A33E94] transition-colors hover:cursor-pointer hover:bg-[#A33E94] hover:text-white"
                                aria-label="Отменить изменение роли"
                              >
                                <CircleX className="h-5 w-5" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                handleStartEdit(
                                  member.userId,
                                  member.role as "ADMIN" | "READER",
                                )
                              }
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A33E94]/15 bg-white/80 text-[#A33E94] transition-colors hover:cursor-pointer hover:bg-[#A33E94] hover:text-white"
                              aria-label="Изменить роль участника"
                            >
                              <UserRoundPen className="h-5 w-5" />
                            </button>
                          ))}

                        {canDelete && !isEditingCurrent && (
                          <button
                            type="button"
                            onClick={() => handleDelete(member.userId)}
                            disabled={isDeleting}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A33E94]/15 bg-white/80 text-[#A33E94] transition-colors hover:cursor-pointer hover:bg-[#A33E94] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Удалить участника"
                          >
                            {isDeletingCurrent ? (
                              <LoaderCircle className="h-5 w-5 animate-spin" />
                            ) : (
                              <CircleX className="h-5 w-5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
