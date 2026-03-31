"use client";

import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { useMemo, useState } from "react";
import {
  validateProjectDescription,
  validateProjectName,
} from "@/features/projectWork/model/validators";
import { useCreateProjectMutation } from "@/features/projectWork/api/projectApi";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

export function AddProjectForm({
  onLoginSuccessAction,
}: {
  onLoginSuccessAction: () => void;
}) {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [touchedName, setTouchedName] = useState(false);
  const [touchedDescription, setTouchedDescription] = useState(false);

  const [createProject, { isError, error, isLoading, isSuccess }] =
    useCreateProjectMutation();

  const handleClickCreate = async () => {
    try {
      await createProject({ name, description }).unwrap();

      setTimeout(() => {
        onLoginSuccessAction();
      }, 2000);
    } catch (error) {
      console.log("Failed to create project:", error);
    }
  };

  const validateError = useMemo(
    () => ({
      name: validateProjectName(name),
      description: validateProjectDescription(description),
    }),
    [name, description],
  );

  const canSubmit =
    !validateError.name &&
    !validateError.description &&
    name.trim().length > 0 &&
    description.trim().length > 0;

  return (
    <Card
      style={{
        background: isMobile ? "#E4E0FF" : "transparent",
        border: "none",
        borderRadius: isMobile ? 0 : "xl",
      }}
      className={`${isMobile ? "rounded-0" : ""} w-full text-black px-4 py-6 max-h-96 overflow-y-auto `}
    >
      <CardHeader>
        {!isMobile && <CardTitle>{`Создать проект`}</CardTitle>}
        <CardDescription className={`${isMobile ? "font-semibold" : ""}`}>
          Укажите название и короткое описание проекта
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Название проекта</Label>
              <div className="grid gap-0.5">
                <Input
                  id="projectName"
                  name="projectName"
                  type="text"
                  value={name}
                  onBlur={() => setTouchedName(true)}
                  onChange={(e) => {
                    if (!touchedName) setTouchedName(true);
                    setName(e.target.value);
                  }}
                  required
                  placeholder="Например: LogBoard"
                />
                {touchedName && validateError.name && (
                  <span className="text-xs">{validateError.name}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="projectDescription">Описание</Label>
              <div className="grid gap-0.5">
                <Input
                  id="projectDescription"
                  name="projectDescription"
                  type="text"
                  value={description}
                  onBlur={() => setTouchedDescription(true)}
                  onChange={(e) => {
                    if (!touchedDescription) setTouchedDescription(true);
                    setDescription(e.target.value);
                  }}
                  required
                  placeholder="Что это за проект и для чего он?"
                />
                {touchedDescription && validateError.description && (
                  <span className="text-xs">{validateError.description}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
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
          <span className={"text-xs text-black"}>Проект успешно добавлен!</span>
        )}
        <Button
          disabled={!canSubmit}
          style={{
            color: "white",
          }}
          className="w-full py-1 rounded-md h-9 hover:scale-100 border-none bg-[#F07FE5]"
          onClick={handleClickCreate}
        >
          {isLoading ? "Загрузка..." : "Создать"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddProjectForm;
