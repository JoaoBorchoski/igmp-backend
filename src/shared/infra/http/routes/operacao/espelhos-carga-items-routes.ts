import { Router } from "express"
import { CreateEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/create-espelho-carga-items/create-espelho-carga-items-controller"
import { ListEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/list-espelho-carga-items/list-espelho-carga-items-controller"
import { CountEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/count-espelho-carga-items/count-espelho-carga-items-controller"
import { SelectEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/select-espelho-carga-items/select-espelho-carga-items-controller"
import { IdSelectEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/id-select-espelho-carga-items/id-select-espelho-carga-items-controller"
import { GetEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/get-espelho-carga-items/get-espelho-carga-items-controller"
import { UpdateEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/update-espelho-carga-items/update-espelho-carga-items-controller"
import { DeleteEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/delete-espelho-carga-items/delete-espelho-carga-items-controller"
import { MultiDeleteEspelhoCargaItemsController } from "@modules/operacao/use-cases/espelho-carga-items/multi-delete-espelho-carga-items/multi-delete-espelho-carga-items-controller"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"

const espelhosCargaItemsRoutes = Router()

const createEspelhoCargaItemsController = new CreateEspelhoCargaItemsController()
const listEspelhoCargaItemsController = new ListEspelhoCargaItemsController()
const countEspelhoCargaItemsController = new CountEspelhoCargaItemsController()
const selectEspelhoCargaItemsController = new SelectEspelhoCargaItemsController()
const idSelectEspelhoCargaItemsController = new IdSelectEspelhoCargaItemsController()
const getEspelhoCargaItemsController = new GetEspelhoCargaItemsController()
const updateEspelhoCargaItemsController = new UpdateEspelhoCargaItemsController()
const deleteEspelhoCargaItemsController = new DeleteEspelhoCargaItemsController()
const multiDeleteEspelhoCargaItemsController = new MultiDeleteEspelhoCargaItemsController()

espelhosCargaItemsRoutes.post("/", ensureAuthenticated, createEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.post("/list", ensureAuthenticated, listEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.post("/count", ensureAuthenticated, countEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.get("/select/:id", ensureAuthenticated, idSelectEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.get("/select", ensureAuthenticated, selectEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.get("/:id", ensureAuthenticated, getEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.put("/:id", ensureAuthenticated, updateEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.delete("/:id", ensureAuthenticated, deleteEspelhoCargaItemsController.handle)
espelhosCargaItemsRoutes.delete("/", ensureAuthenticated, multiDeleteEspelhoCargaItemsController.handle)

export { espelhosCargaItemsRoutes }
