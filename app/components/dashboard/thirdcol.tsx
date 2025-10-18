"use client"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DefaultButton from "../common/DefaultButton"
import api from "@/app/src/api" // seu axios

export default function Thirdarea() {
  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [alarmActive, setAlarmActive] = useState("true")
  const [dayOfWeek, setDayOfWeek] = useState("1")

  // Função para criar alarme
  const handleCreateAlarm = async () => {
    try {
      const payload = {
        label: name,
        time: time + ":00", // adiciona segundos para combinar com backend, ex: "07:30:00"
        is_active: alarmActive === "true",
        days: [parseInt(dayOfWeek)], // se você quiser salvar vários dias futuramente, pode ser array
        user_id: 1 // colocar o ID do usuário correto
      }
      const response = await api.post("/alarms", payload)
      console.log("Alarme criado:", response.data)
      // aqui você pode limpar os estados ou exibir mensagem
      window.location.reload()
    } catch (error) {
      console.error("Erro ao criar alarme:", error)
    }

    
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Input nome do horário */}
      <div className="relative w-2/3 m-5">
        <input
          id="inp"
          type="text"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
        />
        <label
          htmlFor="inp"
          className="absolute left-3 top-6 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-blue-500 peer-focus:text-sm"
        >
          Nome do horário
        </label>
      </div>

      {/* Input hora */}
      <div className="relative w-2/3 mb-5">
        <input
          id="time-input"
          type="time"
          placeholder=" "
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:border-blue-500"
        />
        <label
          htmlFor="time-input"
          className="absolute left-16 top-6 text-gray-400 text-sm transition-all 
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
                     peer-focus:top-0 peer-focus:left-2 peer-focus:text-blue-500 peer-focus:text-sm"
        >
          Horário
        </label>
      </div>

      {/* Select padrão */}
      <div className="mb-5">
        <p className="mb-2 ml-2">Por padrão o alarme será:</p>
        <Select value={alarmActive} onValueChange={(val) => setAlarmActive(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="padrão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"false"}>Desativado</SelectItem>
            <SelectItem value={"true"}>Ativado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select dia da semana */}
      <div className="mb-5">
        <p className="mb-2 ml-2">Dia da semana:</p>
        <Select value={dayOfWeek} onValueChange={(val) => setDayOfWeek(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="padrão" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"1"}>Segunda-feira</SelectItem>
            <SelectItem value={"2"}>Terça-feira</SelectItem>
            <SelectItem value={"3"}>Quarta-feira</SelectItem>
            <SelectItem value={"4"}>Quinta-feira</SelectItem>
            <SelectItem value={"5"}>Sexta-feira</SelectItem>
            <SelectItem value={"6"}>Sábado</SelectItem>
            <SelectItem value={"0"}>Domingo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DefaultButton Name="Criar" onClick={handleCreateAlarm} />
    </div>
  )
}
