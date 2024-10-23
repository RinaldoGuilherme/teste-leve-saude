import { Response, Request } from "express";
import { RetornoAgendamentoDTO } from "../../dto/retorno-agendamento.dto";
import { AgendamentoDTO } from "../../dto/agendamento.dto";
import { MensagemDeErrorDTO } from "../../dto/mensagem-error.dto";
import { RetornoMedicoDTO } from "../../dto/retorno-medico";
import medicos from "../../mock/medicos.json";
import { MedicoDTO } from "../../dto/medico.dto";
import { AgendaDTO } from "../../dto/agenda.dto";

export class AgendamentoService {
  constructor() {}

  private validacao(agendamento: AgendamentoDTO) {
    const error: Array<string> = ["Campos obrigatórios"];
    if (
      !agendamento.data_horario ||
      agendamento.data_horario === "" ||
      typeof agendamento.data_horario !== "string"
    )
      error.push("data_horario");
    if (!agendamento.medico_id || typeof agendamento.medico_id !== "number")
      error.push("medico_id");
    if (
      !agendamento.paciente_nome ||
      agendamento.paciente_nome === "" ||
      typeof agendamento.paciente_nome !== "string"
    )
      error.push("paciente_nome");

    if (error.length > 1) {
      return error;
    }
  }

  async salvarAgendamento(
    req: Request,
    res: Response,
  ): Promise<RetornoAgendamentoDTO | undefined> {
    const agendamento: AgendamentoDTO = req.body;
    const validacaoCampos = this.validacao(agendamento);
    const error: MensagemDeErrorDTO = {
      error: false,
      mensagem: ["Revise os campos, por gentileza."],
    };
    if (validacaoCampos && validacaoCampos.length > 1) {
      res.json({ error: true, mensagem: validacaoCampos }).status(400);
      return;
    }

    const medico: RetornoMedicoDTO = medicos
      .filter((medico: MedicoDTO) => {
        return medico.id === agendamento.medico_id;
      })
      .map((medico: MedicoDTO) => {
        const dataHorario = medico.agenda.map((agendas: AgendaDTO) => {
          if (agendas.dataAgendamento !== agendamento.data_horario) {
            error.error = true;
            error.mensagem.push(
              "data_horario invalida, por gentileza escolha uma valida.",
            );
          }
          return agendas.dataAgendamento;
        });
        return {
          nomeMedico: medico.nome,
          data_horario: dataHorario[0],
        };
      })[0];

    if (error.error) {
      res.json({ error: error.error, mensagem: error.mensagem }).status(400);
      return;
    }

    res
      .json({
        mensagem: "Agendamento realizado com sucesso",
        agendamento: {
          medico: medico?.nomeMedico,
          paciente: agendamento?.paciente_nome,
          data_horario: medico?.data_horario,
        },
      })
      .status(200);
  }
}
