import { AgendaDTO } from "./agenda.dto";
import { EspecialidadeDTO } from "./especialidade.dto";

export class MedicoDTO {
  id: number;
  nome: string;
  genero: string;
  especialidade: EspecialidadeDTO;
  agenda: Array<AgendaDTO>;
  dataCadastro: string;
  dataAlteracao: string;
}
