import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableHead as TableHeadCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Alarm } from "./types";
import {deleteAlarm} from "../func/alarm";
import { toast } from "sonner";

interface AlarmTableProps {
  data: Alarm[];
  onToggle: (id: string, value: boolean) => void;
  onSelect?: (alarm: Alarm) => void;
  onDelete?: (ids: number[]) => void; // <--- adicionado
  rowsPerPage?: number;
}
export default function Tablearea({
  data,
  onToggle,
  onSelect,
  onDelete,
  rowsPerPage = 10,
}: AlarmTableProps) {
  const dictday: Record<number, string> = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
  };

  const [dayFilter, setDayFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

const clickdelete = () => {
    if (confirm("certeza?") && onDelete) {
      const idsToDelete = Array.from(selectedIds).map((key) =>
        Number(key.split("-")[0])
      );
      onDelete(idsToDelete);
      deleteAlarm(idsToDelete)
      setSelectedIds(new Set()); // limpa seleção
    }

};

  const getPeriod = (horario: string) => {
    const [hour, minute] = horario.split(":").map(Number);
    if (hour < 12 || (hour === 12 && minute <= 30)) return "manha";
    return "tarde";
  };
console.log(selectedIds)
  // 1. Expande primeiro
  const expandedData = data.flatMap((alarm) =>
    alarm.dia.map((day) => ({ ...alarm, day }))
  );

  // 2. Filtra
  const filteredData = expandedData.filter((alarm) => {
    const matchDay = dayFilter
      ? alarm.day === Number(dayFilter)
      : true;
    const matchPeriod = periodFilter
      ? getPeriod(alarm.horario) === periodFilter
      : true;
    return matchDay && matchPeriod;
  });

  // 3. Paginação
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages, currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Alterna seleção da linha
  const toggleSelect = (alarm: Alarm & { day: number }) => {
    const key = `${alarm.id}-${alarm.day}`;
    const newSelected = new Set(selectedIds);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedIds(newSelected);
    onSelect?.(alarm);
  };
  
  async function handleToggle(id: number, value: boolean) {
  // Atualiza UI imediatamente
  setAlarms((prev) =>
    prev.map((a) => (a.id === id ? { ...a, is_active: value } : a))
  );

  // Envia para o backend
  try {
    await updateStatus(id, value);
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    // Reverte o toggle em caso de erro
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: !value } : a))
    );
    toast("Erro ao atualizar status");
  }
}

  return (
    <div className="space-y-4">
      {/* filtros */}
      <div className="flex gap-4">
        <select
          className="border p-2 rounded bg-seconderyGray"
          value={dayFilter}
          onChange={(e) => {
            setDayFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todos os dias</option>
          {Object.entries(dictday).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded bg-seconderyGray"
          value={periodFilter}
          onChange={(e) => {
            setPeriodFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Todos os períodos</option>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
        </select>

        <button
          className="border p-2 rounded bg-seconderyGray cursor-pointer"
          onClick={() => clickdelete()}
        >
          Limpar seleção
        </button>
      </div>

      {/* tabela */}
      <Table className="border rounded-4xl">
        <TableHeader>
          <TableRow>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Horário</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell className="flex justify-center items-center">
              Dia da semana
            </TableHeadCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((alarm) => (
            <TableRow
              key={`${alarm.id}-${alarm.day}`}
              className={`cursor-pointer ${
                selectedIds.has(`${alarm.id}-${alarm.day}`)
                  ? "bg-gray-900"
                  : "hover:bg-seconderyGray"
              }`}
              onClick={() => toggleSelect(alarm)}
            >
              <TableCell className="font-medium">{alarm.label}</TableCell>
              <TableCell>{alarm.horario}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Switch
                  checked={alarm.is_active}
                  onCheckedChange={(checked) => onToggle(alarm.id, checked)}
                  aria-label={`Ativar/desativar ${alarm.label}`}
                />
              </TableCell>
              <TableCell className="flex justify-center items-center">
                {dictday[alarm.day]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* paginação */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-2">
          <button
            className="px-3 py-1 border rounded bg-seconderyGray disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "bg-seconderyGray"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded bg-seconderyGray disabled:opacity-50"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
