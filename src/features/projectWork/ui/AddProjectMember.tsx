import { UserRoundPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Project } from "@/entities/project/model/types";
import Modal from "@/shared/ui/Modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";
import { validateUsername } from "@/features/userAuth/model/validators";
import { useAddProjectMemberMutation } from "@/features/projectWork/api/projectApi";
import { ProjectMemberRole } from "@/features/projectWork/api/types";
import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";

const AddProjectMemberForm = ({ project }: { project: Project }) => {
  const isMobile = useIsMobile();
  const [username, setUsername] = useState("");
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [role, setRole] = useState<ProjectMemberRole>(
    project.role === "OWNER" ? "ADMIN" : "READER",
  );
  const [addProjectMember, { isLoading, isError, error, isSuccess }] =
    useAddProjectMemberMutation();

  const roleOptions = useMemo<ProjectMemberRole[]>(
    () => (project.role === "OWNER" ? ["ADMIN", "READER"] : ["READER"]),
    [project.role],
  );

  const usernameError = useMemo(() => validateUsername(username), [username]);

  const canSubmit = !usernameError && username.trim().length > 0;

  const handleSubmit = async () => {
    try {
      await addProjectMember({
        projectId: project.id,
        username,
        role,
      }).unwrap();
    } catch (submitError) {
      console.log("Failed to add project member:", submitError);
    }
  };

  return (
    <Card
      style={{
        background: isMobile ? "#E4E0FF" : "transparent",
        border: "none",
        borderRadius: isMobile ? 0 : "xl",
      }}
      className={`${isMobile ? "rounded-0" : ""} w-full text-black px-4 py-6`}
    >
      <CardHeader>
        {!isMobile && <CardTitle>Добавить участника</CardTitle>}
        <CardDescription className={`${isMobile ? "font-semibold" : ""}`}>
          Пригласите пользователя в проект и назначьте ему роль
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="memberUsername">Username</Label>
              <div className="grid gap-0.5">
                <Input
                  id="memberUsername"
                  name="memberUsername"
                  type="text"
                  value={username}
                  onBlur={() => setTouchedUsername(true)}
                  onChange={(e) => {
                    if (!touchedUsername) setTouchedUsername(true);
                    setUsername(e.target.value);
                  }}
                  required
                  placeholder="Например: john_doe"
                />
                {touchedUsername && usernameError && (
                  <span className="text-xs text-black">{usernameError}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Роль</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {roleOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRole(option)}
                    className={`rounded-xl border px-4 py-3 text-left transition-all hover:cursor-pointer ${
                      role === option
                        ? "border-[#F07FE5] bg-[#F07FE5]/10"
                        : "border-white/45 bg-white/45 hover:bg-white/65"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-[#15204B]">
                      {option}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#4B5B8F]">
                      {option === "ADMIN"
                        ? "Может управлять наблюдателями и api ключами"
                        : "Только просмотр логов проекта"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        {isError && (
          <span className="text-xs text-black">
            {typeof error === "string"
              ? error
              : "Не удалось добавить участника. Попробуйте позже."}
          </span>
        )}

        {isSuccess && (
          <span className="text-xs text-black">
            Участник успешно добавлен в проект.
          </span>
        )}

        <div className="flex w-full ">
          <Button
            type="button"
            disabled={!canSubmit || isLoading}
            style={{ color: "black" }}
            className="h-9 flex-1 rounded-md border-none bg-[#FEEB86] hover:scale-100"
            onClick={handleSubmit}
          >
            {isLoading ? "Загрузка..." : "Добавить"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export const AddProjectMember = (project: Project) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <>
      {isMobile ? (
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetContent side="bottom" className="h-fit">
            <SheetHeader>
              <SheetTitle>Добавить участника</SheetTitle>
            </SheetHeader>
            <AddProjectMemberForm project={project} />
          </SheetContent>
        </Sheet>
      ) : (
        <Modal open={open} onClose={() => handleOpenChange(false)}>
          <AddProjectMemberForm project={project} />
        </Modal>
      )}

      <button
        className="inline-flex rounded-full px-3 py-1 bg-[#4C6DFA]/20 text-[#4C6DFA] hover:cursor-pointer"
        onClick={() => handleOpenChange(true)}
      >
        <UserRoundPlus stroke={"#4C6DFA"} />
      </button>
    </>
  );
};
