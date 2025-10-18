'use client'

import DefaultButton from "./components/common/DefaultButton";
import DefaultTextInput from "./components/common/InputDefault";
import LogoSesi from "./components/common/LogoSesi";
import Image from "next/image";
import api from "./src/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";  // ✅ importar js-cookie

export default function Home() {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter();


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard"); // redireciona para login se não tiver token
    }
  }, []);
  
  

  const loginform = async (name: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", name);
      formData.append("password", password);

      const { data } = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = data;

      // ✅ Salva o token nos cookies
    Cookies.set("token", access_token, { 
      expires: 30 / (60 * 24),  // 0.0208333 dias
      path: "/" 
    });
    router.push("/dashboard");
      console.log('Token salvo nos cookies');
      return data;

    } catch (error: any) {
      toast.error("Erro no login");
      console.error("Erro no login:", error.response?.data || error.message);
      throw error;
    }
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-5/12 h-max flex flex-col justify-center items-center">
        <LogoSesi width={250} height={194} classname="my-16"/>
        <div className="flex flex-1 justify-center items-center flex-col">
          <DefaultTextInput label="User" placeholder="User" value={name} onChange={(e)=> setName(e.target.value)}/>
          <DefaultTextInput label="Password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <DefaultButton Name="Logar" onClick={() => loginform(name, password)} />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="relative w-full h-[100vh]">
          <Image src="/bglogin.png" alt="Background Image" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
