'use client'

import DefaultButton from "./components/common/DefaultButton";
import DefaultTextInput from "./components/common/InputDefault";
import LogoSesi from "./components/common/LogoSesi";
import Image from "next/image";
import api from "./src/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.push("/dashboard");
  }, [router]);

  const loginform = async (username: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const { data } = await api.post<{ access_token: string }>("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      Cookies.set("token", data.access_token, { expires: 30, path: "/" });
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      toast.error("Erro no login");
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-5/12 h-max flex flex-col justify-center items-center">
        <LogoSesi width={250} height={194} classname="my-16"/>
        <div className="flex flex-1 justify-center items-center flex-col">
          <DefaultTextInput
            label="User"
            placeholder="User"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DefaultTextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DefaultButton
            Name="Logar"
            onClick={() => loginform(name, password)}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="relative w-full h-[100vh]">
          <Image
            src="/bglogin.png"
            alt="Background Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
