import DefaultButton from "../common/DefaultButton";
import LogoSesi from "../common/LogoSesi";

export default function FirstArea() {
    return (

        <div className="flex flex-col ">
            <div>
                <LogoSesi height={150} width={150} />
            </div>
            <div className="flex flex-1 flex-col  justify-start items-center m-10  ">
                <p className="text-2xl">Ativar alarme</p>
                <DefaultButton Name="ativar" className="m-10"/>
            </div>
        </div>
    )
}