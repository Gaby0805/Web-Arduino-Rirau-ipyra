import DefaultButton from "../common/DefaultButton";

export default function FirstArea() {
    return (

        <div className="flex flex-col ">

            <div className="flex flex-1 flex-col  justify-center items-center  mb-22">
                <p className="text-2xl">Ativar alarme</p>
                <DefaultButton Name="ativar" className="m-10"/>
            </div>
        </div>
    )
}