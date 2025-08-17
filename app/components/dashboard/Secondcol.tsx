'use client'

// Exemplo de uso
import { useState } from "react";
import { Alarm } from "./components/types";
import Tablearea from "./components/table";

export default function Dashboard() {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: "1", nome: "INV001", horario: "08:00", ativo: true, dia: 0 },
    { id: "2", nome: "INV002", horario: "10:30", ativo: false, dia: 1},
    { id: "3", nome: "INV002", horario: "10:30", ativo: false, dia: 2},
    { id: "4", nome: "INV002", horario: "15:30", ativo: false, dia: 3},
    { id: "14", nome: "INV002", horario: "10:30", ativo: false, dia: 4},
    { id: "16", nome: "INV002", horario: "10:30", ativo: false, dia: 4},
    { id: "214", nome: "INV002", horario: "10:30", ativo: false, dia: 4},
    { id: "643", nome: "INV002", horario: "10:30", ativo: false, dia: 4},
    { id: "65", nome: "INV002", horario: "10:30", ativo: false, dia: 4},
    { id: "512", nome: "INV002", horario: "10:30", ativo: false, dia: 5},
    { id: "7", nome: "INV002", horario: "10:30", ativo: false, dia: 6},
  ]);

  function handleToggle(id: string, value: boolean) {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ativo: value } : a))
    );
  }

  return(

      <div className=" flex flex-col justify-center">
      <Tablearea data={alarms} onToggle={handleToggle} />

  </div>
)
}