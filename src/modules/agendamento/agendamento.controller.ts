import { Request, Response, Router } from "express";
import { AgendamentoService } from "./agendamento.service";

export class AgendamentoController {
  private readonly agendamentoService: AgendamentoService;
  constructor() {
    this.agendamentoService = new AgendamentoService();
  }

  async salvarAgendamento(req: Request, res: Response) {
    return await this.agendamentoService.salvarAgendamento(req, res);
  }
}
