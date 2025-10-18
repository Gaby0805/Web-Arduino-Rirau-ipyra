import Image from "next/image";

interface LogoSesiProps {
    width: number;
    height: number;
    classname?: string;

}

export default function LogoSesi({ width, height,classname}: LogoSesiProps) {

    return (
        <>
        <Image
        src={"/logos/Sesi_logo.png"}
            width={width}
            height={height}
            alt="Logo Sesi"    
            className={classname}
        />
        </>
    )
}