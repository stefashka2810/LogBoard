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
  validatePassword,
  validateUsername,
} from "@/features/auth/lib/validators";
import { Eye, EyeClosed } from "lucide-react";

export function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [touchedUsername, setTouchedUsername] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const error = useMemo(
    () => ({
      username: validateUsername(username),
      password: validatePassword(password),
    }),
    [username, password],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Войдите в свой аккаунт</CardTitle>
        <CardDescription>
          Для входа введите ваш username и пароль
        </CardDescription>
        <CardAction>
          <a
            href="/register"
            className="text-sm underline-offset-4 hover:underline"
          >
            Зарегистрироваться
          </a>
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
                  onBlur={() => setTouchedUsername(true)}
                  onChange={(e) => {
                    if (!touchedUsername) setTouchedUsername(true);
                    setUsername(e.target.value);
                  }}
                  required
                />
                {touchedUsername && error.username && (
                  <span className={"text-xs"}>{error.username}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </a>
              </div>
              <div className={"grid gap-0.5"}>
                <Input
                  id="password"
                  name="password"
                  type={isOpened ? "text" : "password"}
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
                    onClick={() => setIsOpened((prev) => !prev)}
                    aria-label={isOpened ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {isOpened ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </button>
                </Input>

                {touchedPassword && error.password && (
                  <span className={"text-xs"}>{error.password}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={
            !!error.username || !!error.password || !username || !password
          }
          className={`w-full py-1 text-white md:text-sm rounded-md h-9 hover:scale-100 border-none bg-[linear-gradient(90deg,#E948C5_0%,#CD407B_53%,#75042D_100%)]`}
          onClick={() => console.log(!!error.username || !!error.password)}
        >
          Войти
        </Button>
      </CardFooter>
    </Card>
  );
}
