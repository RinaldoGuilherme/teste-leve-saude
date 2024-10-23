import express from "express";
import serverless from "serverless-http";
import { agenda } from "./src/modules/agenda/agenda.rotas";
import { agendamento } from "./src/modules/agendamento/agendamento.rotas";

const app = express();

app.use(express.json());
app.use(agenda);
app.use(agendamento);

export const handler = serverless(app);
