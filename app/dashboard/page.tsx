import DefaultButton from "../components/common/DefaultButton";
import FirstArea from "../components/dashboard/Firstcol";
import SecondArea from "../components/dashboard/Secondcol";

export default function Dashboard() {
  return (
    <div className="grid  gap-2  md:grid-cols-3 sm:grid-col-2 grid-cols-1 items-stretch min-h-screen" >
        <FirstArea/>
        <SecondArea/>
        <div>teste3</div>

    </div>
  );
}
