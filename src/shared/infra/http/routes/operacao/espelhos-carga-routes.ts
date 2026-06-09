import { Router } from "express"
import { CreateEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/create-espelho-carga/create-espelho-carga-controller"
import { ListEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/list-espelho-carga/list-espelho-carga-controller"
import { CountEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/count-espelho-carga/count-espelho-carga-controller"
import { SelectEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/select-espelho-carga/select-espelho-carga-controller"
import { IdSelectEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/id-select-espelho-carga/id-select-espelho-carga-controller"
import { GetEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/get-espelho-carga/get-espelho-carga-controller"
import { UpdateEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/update-espelho-carga/update-espelho-carga-controller"
import { DeleteEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/delete-espelho-carga/delete-espelho-carga-controller"
import { MultiDeleteEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/multi-delete-espelho-carga/multi-delete-espelho-carga-controller"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"
import { ExportEspelhoCargaController } from "@modules/operacao/use-cases/espelho-carga/export-espelho-carga/export-espelho-carga-controller"
import { ListEspelhoCargaAbertoController } from "@modules/operacao/use-cases/espelho-carga/list-espelho-carga-aberto/list-espelho-carga-aberto-controller"

const espelhosCargaRoutes = Router()

const createEspelhoCargaController = new CreateEspelhoCargaController()
const listEspelhoCargaController = new ListEspelhoCargaController()
const countEspelhoCargaController = new CountEspelhoCargaController()
const selectEspelhoCargaController = new SelectEspelhoCargaController()
const idSelectEspelhoCargaController = new IdSelectEspelhoCargaController()
const getEspelhoCargaController = new GetEspelhoCargaController()
const updateEspelhoCargaController = new UpdateEspelhoCargaController()
const deleteEspelhoCargaController = new DeleteEspelhoCargaController()
const multiDeleteEspelhoCargaController = new MultiDeleteEspelhoCargaController()
const exportEspelhoCargaController = new ExportEspelhoCargaController()
const listEspelhoCargaAbertoController = new ListEspelhoCargaAbertoController()

espelhosCargaRoutes.post("/", ensureAuthenticated, createEspelhoCargaController.handle)
espelhosCargaRoutes.post("/list", ensureAuthenticated, listEspelhoCargaController.handle)
espelhosCargaRoutes.post("/count", ensureAuthenticated, countEspelhoCargaController.handle)
espelhosCargaRoutes.get("/select/:id", ensureAuthenticated, idSelectEspelhoCargaController.handle)
espelhosCargaRoutes.get("/select", ensureAuthenticated, selectEspelhoCargaController.handle)
espelhosCargaRoutes.get("/:id", ensureAuthenticated, getEspelhoCargaController.handle)
espelhosCargaRoutes.put("/:id", ensureAuthenticated, updateEspelhoCargaController.handle)
espelhosCargaRoutes.delete("/:id", ensureAuthenticated, deleteEspelhoCargaController.handle)
espelhosCargaRoutes.delete("/", ensureAuthenticated, multiDeleteEspelhoCargaController.handle)
espelhosCargaRoutes.get("/export/:id", ensureAuthenticated, exportEspelhoCargaController.handle)
espelhosCargaRoutes.post("/list-aberto", ensureAuthenticated, listEspelhoCargaAbertoController.handle)

export { espelhosCargaRoutes }
