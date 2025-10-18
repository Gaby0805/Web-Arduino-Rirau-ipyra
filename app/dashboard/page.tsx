'use client'
import { useRouter } from "next/navigation";
import LogoSesi from "../components/common/LogoSesi";
import FirstArea from "../components/dashboard/Firstcol";
import SecondArea from "../components/dashboard/Secondcol";
import Thirdarea from "../components/dashboard/thirdcol";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Dashboard() {

    const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/"); // redireciona para login se não tiver token
    }
  }, []);



  return (
    <div className="" >
       
       <div className="w-full grid grid-cols-2">
          <div className="">
              <LogoSesi height={150} width={150}/>
          </div>

       </div>

       <div className="grid  gap-2  md:grid-cols-3 sm:grid-col-2 grid-cols-1 items-stretch min-h-screen">

        <FirstArea/>
        <SecondArea/>
        <Thirdarea />
       </div>

    </div>
  );
}
