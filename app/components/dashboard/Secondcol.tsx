'use client'

import { useState, useEffect } from "react";
import Tablearea from "./components/table";
import type { Alarm } from "./components/types";
import { toast } from "sonner";
import { updateStatus, deleteAlarm } from "./func/alarm";
import api from "@/app/src/api";

// Formato que a API retorna
type AlarmApi = {
  id: number;
  label: string;
  time: string;        // ex: "07:00:00.372000"
  is_active: boolean;
  days: number[];      // ex: [0,1]
  user_id: number;
};

export default function SecondArea() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  // Buscar alarmes do backend
  const fetchAlarms = async () => {
    try {
      const { data } = await api.get<AlarmApi[]>("/alarms");
      const mapped: Alarm[] = (Array.isArray(data) ? data : []).map((a) => ({
        id: a.id,
        label: a.label,
        horario: a.time?.slice(0, 5) ?? "", // "HH:mm"
        is_active: a.is_active,
        dia: a.days ?? [],
      }));
      setAlarms(mapped);
    } catch (error) {
      console.error("Erro ao buscar alarme", error);
      toast("Erro ao buscar alarmes");
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  // Atualiza status do alarme
  const handleToggle = async (id: number, value: boolean) => {
    // Atualiza UI imediatamente
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: value } : a))
    );

    // Envia para backend
    try {
      await updateStatus(id, value);
      toast("Status atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      // Reverte toggle em caso de erro
      setAlarms((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_active: !value } : a))
      );
      toast("Erro ao atualizar status");
    }
  };

  // Deletar alarmes selecionados
  const handleDelete = async (ids: number[]) => {
    try {
      await deleteAlarm(ids);
      fetchAlarms();
      toast("Alarmes deletados com sucesso");
    } catch (error) {
      console.error("Erro ao deletar alarmes:", error);
      toast("Erro ao deletar alarmes");
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <Tablearea
        data={alarms}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
