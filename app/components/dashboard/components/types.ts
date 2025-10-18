export type Alarm = {
  id: number;
  nome: string;
  horario: string;
  ativo: boolean;
  dia: number[]; // array de dias da semana (0-6)
};
