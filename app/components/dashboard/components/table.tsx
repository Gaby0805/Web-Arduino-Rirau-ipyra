'use client'

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Alarm } from "../components/types"; 
import { deleteAlarm, updateStatus } from "@/app/components/dashboard/func/alarm";
import { toast } from "sonner";

interface AlarmTableProps {
  data: Alarm[];
  onToggle: (id: number, value: boolean) => Promise<void>;
  onDelete: (ids: number[]) => Promise<void>;
}

export default function Tablearea({
  data,
  onToggle,
  onDelete,
}: AlarmTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleDelete = async () => {
    const idsToDelete = Array.from(selectedIds).map((key) =>
      Number(key.split("-")[0])
    );
    try {
      for (const id of idsToDelete) {
        await deleteAlarm(id);
      }
      await onDelete(idsToDelete);
      setSelectedIds(new Set());
      toast("Alarmes excluídos com sucesso!");
    } catch (error) {
      toast("Erro ao deletar alarmes");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Excluir selecionados</button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((alarm) => (
            <TableRow key={alarm.id}>
              <TableCell>{alarm.nome}</TableCell>
              <TableCell>{alarm.horario}</TableCell>
              <TableCell>
                <Switch
                  checked={alarm.ativo}
                  onCheckedChange={(checked) => onToggle(alarm.id, checked)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
