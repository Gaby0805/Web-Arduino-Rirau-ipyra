import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Thirdarea() {

    const values = {
        "true": true,
        "false": false
    }

    return(
        <div className=" flex flex-col justify-center items-center">
            <div className="relative w-2/3 m-5">
            <input
                id="inp"
                type="text"
                placeholder=" "
                className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
            />
            <label
                htmlFor="inp"
                className="absolute left-3 top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-blue-500 peer-focus:text-sm"
            >
                Nome do horário
            </label>
            </div>

            <Select >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="padrão" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"true"}> Ativado</SelectItem>
                <SelectItem value={"false"}> Desativado</SelectItem>
            </SelectContent>
            </Select>
        </div>
    )
}