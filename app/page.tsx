import DefaultButton from "./components/common/DefaultButton";
import DefaultTextInput from "./components/common/InputDefault";
import LogoSesi from "./components/common/LogoSesi";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full h-full" >
      
      <div className="w-5/12  h-max flex flex-col justify-center items-center">
      
      <LogoSesi width={250} height={194} classname="my-16"/>
      
      <div className="flex flex-1 justify-center items-center flex-col">
        <DefaultTextInput label="User" placeholder="User" className=""/>
        <DefaultTextInput label="password" placeholder="password" className=""/>
        <DefaultButton Name="logar"/>
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
