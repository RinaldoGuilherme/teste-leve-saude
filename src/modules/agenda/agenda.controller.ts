import { Request, Response, Router } from "express";
import { AgendaService } from "./agenda.service";

export class AgendaController {
  private readonly agendaService: AgendaService;
  constructor() {
    this.agendaService = new AgendaService();
  }

  async buscarAgenda(req: Request, res: Response) {
    return await this.agendaService.buscarAgenda();
  }
}
