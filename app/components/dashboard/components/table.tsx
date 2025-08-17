
import { useState,useEffect } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Alarm } from "./types"

interface AlarmTableProps {
  data: Alarm[];
  onToggle: (id: string, value: boolean) => void;
  onSelect?: (alarm: Alarm) => void; 
  rowsPerPage?: number; // opcional, padrão 5
}

export default function Tablearea({
  data,
  onToggle,
  onSelect,
  rowsPerPage = 10,
}: AlarmTableProps) {
  const dictday: Record<number, string> = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado"
  }

  const [dayFilter, setDayFilter] = useState<string>("")
  const [periodFilter, setPeriodFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)

  // filtro pra se é de manhã ou tarde
  const getPeriod = (horario: string) => {
    const [hour, minute] = horario.split(":").map(Number)
    if (hour < 12 || (hour === 12 && minute <= 30)) return "manha"
    return "tarde"
  }

  const filteredData = data.filter(alarm => {
    const matchDay = dayFilter ? String(alarm.dia) === dayFilter : true
    const matchPeriod = periodFilter ? getPeriod(alarm.horario) === periodFilter : true
    return matchDay && matchPeriod
  })

  // paginação
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )
  useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1) // se não houver páginas, volta para 1
  }
}, [totalPages, currentPage])

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const handlePageChange = (page: number) => setCurrentPage(page)

  return (
    <div className="space-y-4">
      {/* filtros */}
      <div className="flex gap-4">
        <select 
          className="border p-2 rounded bg-seconderyGray"
          value={dayFilter}
          onChange={(e) => {
            setDayFilter(e.target.value)
            setCurrentPage(1) // reset página ao filtrar
          }}
        >
          <option value="">Todos os dias</option>
          {Object.entries(dictday).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded bg-seconderyGray"
          value={periodFilter}
          onChange={(e) => {
            setPeriodFilter(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="">Todos os períodos</option>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
        </select>
      </div>

      {/* tabela */}
      <Table className="border rounded-4xl">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="flex justify-center items-center">Dia da semana</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((alarm) => (
            <TableRow
              key={alarm.id}
              className="cursor-pointer hover:bg-seconderyGray"
              onClick={() => onSelect?.(alarm)}
            >
              <TableCell className="font-medium">{alarm.nome}</TableCell>
              <TableCell>{alarm.horario}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Switch
                  checked={alarm.ativo}
                  onCheckedChange={(checked) => onToggle(alarm.id, checked)}
                  aria-label={`Ativar/desativar ${alarm.nome}`}
                />
              </TableCell>
              <TableCell className="flex justify-center items-center">
                {dictday[alarm.dia]}
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-primary text-white" : "bg-seconderyGray"
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
  )
}
