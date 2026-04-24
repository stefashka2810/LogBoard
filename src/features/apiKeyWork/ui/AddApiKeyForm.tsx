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
  validateApiKeyName,
  validateApiKeyExpiration,
} from "@/features/apiKeyWork/model/validators";
import { useCreateApiKeyMutation } from "@/features/apiKeyWork/api/apiKeyApi";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

import { Calendar } from "@/shared/ui/Calendar";
import {
  DatePicker,
  Group,
  DateInput,
  DateSegment,
  Popover,
  Dialog,
  Button as RacButton,
  type DateValue,
} from "react-aria-components";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Check, Copy } from "lucide-react";
import { ApiKeyCopy } from "@/features/apiKeyWork/api/types";

export function AddApiKeyForm({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose?: () => void;
}) {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [expiresAt, setExpiresAt] = useState<DateValue | null>(null);
  const [createdKey, setCreatedKey] = useState<ApiKeyCopy | null>(null);
  const [copied, setCopied] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedExpiresAt, setTouchedExpiresAt] = useState(false);

  const [createApiKey, { isError, error, isLoading }] =
    useCreateApiKeyMutation();

  const handleClickCreate = async () => {
    try {
      let response: ApiKeyCopy;

      if (!expiresAt || expiresAt.toString().trim() === "") {
        response = await createApiKey({ projectId, name }).unwrap();
      } else {
        const isoDate = new Date(expiresAt.toString()).toISOString();
        response = await createApiKey({
          projectId,
          name,
          expiresAt: isoDate,
        }).unwrap();
      }

      setCreatedKey(response);
    } catch (error) {
      console.log("Failed to create api key:", error);
    }
  };

  const handleCopy = async () => {
    if (!createdKey?.apiKey) return;

    try {
      await navigator.clipboard.writeText(createdKey.apiKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  const expiresDateString = expiresAt ? expiresAt.toString() : "";

  const validateError = useMemo(
    () => ({
      name: validateApiKeyName(name),
      expiresAt: validateApiKeyExpiration(expiresDateString),
    }),
    [name, expiresDateString],
  );

  const canSubmit =
    !validateError.name && name.trim().length > 0 && !validateError.expiresAt;

  const createdAt = createdKey?.createdAt
    ? new Date(createdKey.createdAt).toLocaleString("ru-RU")
    : "";

  return (
    <Card
      style={{
        background: isMobile ? "#E4E0FF" : "transparent",
        border: "none",
        borderRadius: isMobile ? 0 : "xl",
      }}
      className={`${
        isMobile ? "rounded-0" : ""
      } w-full text-black px-4 py-6 max-h-96 overflow-y-auto `}
    >
      <CardHeader>
        {!isMobile && (
          <CardTitle>
            {createdKey ? "API ключ создан" : "Создать API ключ"}
          </CardTitle>
        )}
        <CardDescription className={`${isMobile ? "font-semibold" : ""}`}>
          {createdKey
            ? "Скопируйте ключ сейчас. После закрытия окна его нельзя будет посмотреть снова."
            : "Укажите название и срок действия ключа"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {createdKey ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl  bg-white/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-black">
                    Новый API ключ
                  </p>
                  <p className="mt-1 text-xs text-[#4B5B8F]">
                    Создан: {createdAt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-full bg-transparent px-3 py-2 text-sm font-medium  hover:cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-black" />
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-black" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-[#A33E94] p-3">
                <code className="block break-all font-mono text-sm leading-6 text-[#DDFBFF]">
                  {createdKey.apiKey}
                </code>
              </div>
            </div>
          </div>
        ) : (
          <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="keyName">Название ключа</Label>
                <div className="grid gap-0.5">
                  <Input
                    id="keyName"
                    name="keyName"
                    type="text"
                    value={name}
                    onBlur={() => setTouchedName(true)}
                    onChange={(e) => {
                      if (!touchedName) setTouchedName(true);
                      setName(e.target.value);
                    }}
                    required
                    placeholder="Например: Production Key"
                  />
                  {touchedName && validateError.name && (
                    <span className="text-xs text-black">
                      {validateError.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2 flex-col items-start">
                <Label
                  htmlFor="expiresAt"
                  className="flex flex-col items-start gap-1"
                >
                  Истекает в (необязательно)
                </Label>
                <div className="grid gap-0.5 w-full">
                  <DatePicker
                    aria-label="Дата истечения ключа"
                    value={expiresAt}
                    onChange={(date) => {
                      if (!touchedExpiresAt) setTouchedExpiresAt(true);
                      setExpiresAt(date);
                    }}
                    className="group flex flex-col gap-1 w-full"
                  >
                    <Group className="text-body flex h-9 w-full items-center rounded-md border border-white/70 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-white focus-within:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <DateInput className="flex flex-1 items-center bg-transparent outline-none">
                        {(segment) => (
                          <DateSegment
                            segment={segment}
                            className="rounded-sm px-[2px] tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground outline-none data-[placeholder]:text-muted-foreground"
                          />
                        )}
                      </DateInput>
                      <RacButton
                        aria-label="Открыть календарь"
                        className="outline-none flex items-center text-muted-foreground/80 hover:text-foreground pl-2"
                      >
                        <CalendarIcon className="h-4 w-4" />
                      </RacButton>
                    </Group>
                    <Popover className="z-50 rounded-md border bg-white text-popover-foreground shadow-md outline-none">
                      <Dialog className="p-3 outline-none">
                        <Calendar />
                      </Dialog>
                    </Popover>
                  </DatePicker>

                  {touchedExpiresAt && validateError.expiresAt && (
                    <span className="text-xs text-black">
                      {validateError.expiresAt}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
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

        {createdKey ? (
          <Button
            type="button"
            style={{
              color: "black",
            }}
            className="w-full py-1 rounded-md h-9 hover:scale-100 border-none bg-[#FEEB86]"
            onClick={onClose}
          >
            Закрыть
          </Button>
        ) : (
          <Button
            disabled={!canSubmit}
            style={{
              color: "black",
            }}
            className="w-full py-1 rounded-md h-9 hover:scale-100 border-none bg-[#FEEB86]"
            onClick={handleClickCreate}
          >
            {isLoading ? "Загрузка..." : "Создать"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AddApiKeyForm;
