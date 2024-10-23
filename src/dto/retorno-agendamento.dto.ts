export class RetornoAgendamentoDTO {
  mensagem: string;
  agendamento: Agendamento;
}

class Agendamento {
  medico: string;
  paciente: string;
  data_horario: string;
}
