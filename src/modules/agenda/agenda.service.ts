import { AgendaDTO } from "../../dto/agenda.dto";
import { MedicoDTO } from "../../dto/medico.dto";
import { RetornoMedicosDTO } from "../../dto/retorno-medicos.dto";
import { GENERO } from "../../enum/genero.enum";
import medicos from "../../mock/medicos.json";

export class AgendaService {
  constructor() {}

  async buscarAgenda(): Promise<RetornoMedicosDTO[]> {
    return medicos.map((medico: MedicoDTO) => {
      const verificacaoDeGenero =
        medico.genero === GENERO.MASCULINO ? "Dr." : "Dra.";
      const horarios = medico.agenda
        .filter((agendas: AgendaDTO) => {
          return agendas.deletado === 0;
        })
        .map((agenda: AgendaDTO) => {
          return agenda.dataAgendamento;
        });

      return {
        id: medico.id,
        nome: `${verificacaoDeGenero} ${medico.nome}`,
        especialidade: medico.especialidade.nome,
        horarios_disponiveis: horarios,
      };
    });
  }
}
