import express, { Application, NextFunction, Request, Response } from "express";
import { AgendaController } from "./agenda.controller";
const router = express.Router();

const agendaController = new AgendaController();

interface IResponse extends Response {
  error?: (code: number, message: string) => Response;
  success?: (code: number, message: string, result: any) => Response;
}

router.get("/agendas", async (req: Request, res: Response): Promise<void> => {
  res.json(await agendaController.buscarAgenda(req, res)).status(200);
});

export const agenda = router;
