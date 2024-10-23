import express, { Application, NextFunction, Request, Response } from "express";
import { AgendamentoController } from "./agendamento.controller";
import { RetornoAgendamentoDTO } from "../../dto/retorno-agendamento.dto";
const router = express.Router();

const agendaController = new AgendamentoController();

interface IResponse extends Response {
  error?: (code: number, message: string) => Response;
  success?: (code: number, message: string, result: any) => Response;
}

router.post(
  "/agendamento",
  async (req: Request, res: Response): Promise<void> => {
    await agendaController.salvarAgendamento(req, res);
  },
);

export const agendamento = router;
