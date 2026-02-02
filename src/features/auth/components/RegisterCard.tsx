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
import { useState } from "react";
import {
  confirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/features/auth/lib/validators";
import { Eye, EyeClosed } from "lucide-react";

export function RegisterCard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isOpened, setIsOpened] = useState({
    first: false,
    second: false,
  });

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
            <a href="/login" className="underline-offset-4 hover:underline">
              Войдите
            </a>
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
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() =>
                    setError({
                      username: validateUsername(username),
                      email: error.email,
                      password: error.password,
                      password2: error.password2,
                    })
                  }
                  required
                />
                {error.username && (
                  <span className={"text-xs"}>{error.username}</span>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Почта</Label>
              <div className="grid gap-0.5">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setError({
                      username: error.username,
                      email: validateEmail(email),
                      password: error.password,
                      password2: error.password2,
                    })
                  }
                  required
                />
                {error.email && (
                  <span className={"text-xs"}>{error.email}</span>
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
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setError({
                      username: error.username,
                      email: error.email,
                      password: validatePassword(password),
                      password2: error.password2,
                    })
                  }
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

                {error.password && (
                  <span className={"text-xs"}>{error.password}</span>
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
                  onChange={(e) => setPassword2(e.target.value)}
                  onBlur={() =>
                    setError({
                      username: error.username,
                      email: error.email,
                      password: error.password,
                      password2: confirmPassword(password, password2),
                    })
                  }
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

                {error.password2 && (
                  <span className={"text-xs"}>{error.password2}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={
            !!error.username ||
            !!error.email ||
            !!error.password ||
            !!error.password2 ||
            !username ||
            !email ||
            !password ||
            !password2
          }
          className={`w-full py-1 text-white md:text-sm rounded-md h-9 hover:scale-100 border-none bg-[linear-gradient(90deg,#E948C5_0%,#CD407B_53%,#75042D_100%)]`}
        >
          Зарегистрироваться
        </Button>
      </CardFooter>
    </Card>
  );
}
