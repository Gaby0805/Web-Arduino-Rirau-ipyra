import LogoSesi from "../components/common/LogoSesi";
import FirstArea from "../components/dashboard/Firstcol";
import SecondArea from "../components/dashboard/Secondcol";
import Thirdarea from "../components/dashboard/thirdcol";

export default function Dashboard() {
  return (
    <div className="" >
       
       <div className="w-full grid grid-cols-2">
        <div className="">
            <LogoSesi height={150} width={150}/>
        </div>
        <div className="flex justify-end mr-6 mt-2">
          <div className="w-24 h-24 bg-seconderyGray rounded-full ">

          </div>

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
