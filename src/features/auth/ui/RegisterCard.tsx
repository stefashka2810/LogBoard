"use client";

import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardAction,
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
  confirmPassword,
  validatePassword,
  validateUsername,
} from "@/features/auth/lib/validators";
import { Eye, EyeClosed } from "lucide-react";
import { useRegisterUserMutation } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RegisterCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isOpened, setIsOpened] = useState({
    first: false,
    second: false,
  });
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPassword2, setTouchedPassword2] = useState(false);
  const [register, { isError, error }] = useRegisterUserMutation();
  const router = useRouter();

  const validateError = useMemo(
    () => ({
      username: validateUsername(username),
      password: validatePassword(password),
      password2: confirmPassword(password, password2),
    }),
    [username, password, password2],
  );

  const handleClickRegister = async () => {
    try {
      await register({ username, password }).unwrap();
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Создайте аккаунт</CardTitle>
        <CardDescription>
          Для регистрации введите username и пароль
        </CardDescription>
        <CardAction>
          <span className={"text-sm"}>
            Есть аккаунт?{" "}
            <Link href="/login" className="underline-offset-4 hover:underline">
              Войдите
            </Link>
          </span>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form autoComplete={"off"}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="grid gap-0.5">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="nickname"
                  value={username}
                  onChange={(e) => {
                    if (!touchedUsername) setTouchedUsername(true);
                    setUsername(e.target.value);
                  }}
                  onBlur={() => setTouchedUsername(true)}
                  required
                />
                {touchedUsername && validateError.username && (
                  <span className={"text-xs"}>{validateError.username}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Пароль</Label>
              <div className={"grid gap-0.5"}>
                <Input
                  id="password"
                  name="password"
                  type={isOpened.first ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    if (!touchedPassword) setTouchedPassword(true);
                    setPassword(e.target.value);
                  }}
                  onBlur={() => setTouchedPassword(true)}
                  required
                  className="pr-1"
                >
                  <button
                    type="button"
                    className="outline-none bg-transparent w-fit h-fit hover:cursor-pointer p-1 ml-1
                    text-white/30 hover:text-white/50
                    transition-colors"
                    onClick={() =>
                      setIsOpened({
                        first: !isOpened.first,
                        second: isOpened.second,
                      })
                    }
                    aria-label={
                      isOpened.first ? "Скрыть пароль" : "Показать пароль"
                    }
                  >
                    {isOpened.first ? (
                      <Eye size={18} />
                    ) : (
                      <EyeClosed size={18} />
                    )}
                  </button>
                </Input>

                {touchedPassword && validateError.password && (
                  <span className={"text-xs"}>{validateError.password}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Подтвердите пароль</Label>
              <div className={"grid gap-0.5"}>
                <Input
                  id="password"
                  name="password"
                  type={isOpened.second ? "text" : "password"}
                  autoComplete="current-password"
                  value={password2}
                  onChange={(e) => {
                    if (!touchedPassword2) setTouchedPassword2(true);
                    setPassword2(e.target.value);
                  }}
                  onBlur={() => setTouchedPassword2(true)}
                  required
                  className="pr-1"
                >
                  <button
                    type="button"
                    className="outline-none bg-transparent w-fit h-fit hover:cursor-pointer p-1 ml-1
                    text-white/30 hover:text-white/50
                    transition-colors"
                    onClick={() =>
                      setIsOpened({
                        first: isOpened.first,
                        second: !isOpened.second,
                      })
                    }
                    aria-label={
                      isOpened.second ? "Скрыть пароль" : "Показать пароль"
                    }
                  >
                    {isOpened.second ? (
                      <Eye size={18} />
                    ) : (
                      <EyeClosed size={18} />
                    )}
                  </button>
                </Input>

                {touchedPassword2 && validateError.password2 && (
                  <span className={"text-xs"}>{validateError.password2}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {isError && (
          <span className={"text-xs"}>
            {"data" in (error ?? {})
              ? String((error as { data: unknown }).data)
              : "message" in (error ?? {})
                ? (error as { message: string }).message
                : "Произошла ошибка"}
          </span>
        )}
        <Button
          disabled={
            !!validateError.username ||
            !!validateError.password ||
            !!validateError.password2 ||
            !username ||
            !password ||
            !password2
          }
          onClick={handleClickRegister}
          className={`w-full py-1 text-white md:text-sm rounded-md h-9 hover:scale-100 border-none bg-[linear-gradient(90deg,#E948C5_0%,#CD407B_53%,#75042D_100%)]`}
        >
          Зарегистрироваться
        </Button>
      </CardFooter>
    </Card>
  );
}
