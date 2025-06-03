import multer from "multer"
import uploadConfig from "@config/upload"
import { Router } from "express"
import { CreatePedidoController } from "@modules/operacao/use-cases/pedido/create-pedido/create-pedido-controller"
import { ListPedidoController } from "@modules/operacao/use-cases/pedido/list-pedido/list-pedido-controller"
import { CountPedidoController } from "@modules/operacao/use-cases/pedido/count-pedido/count-pedido-controller"
import { SelectPedidoController } from "@modules/operacao/use-cases/pedido/select-pedido/select-pedido-controller"
import { IdSelectPedidoController } from "@modules/operacao/use-cases/pedido/id-select-pedido/id-select-pedido-controller"
import { GetPedidoController } from "@modules/operacao/use-cases/pedido/get-pedido/get-pedido-controller"
import { UpdatePedidoController } from "@modules/operacao/use-cases/pedido/update-pedido/update-pedido-controller"
import { DeletePedidoController } from "@modules/operacao/use-cases/pedido/delete-pedido/delete-pedido-controller"
import { MultiDeletePedidoController } from "@modules/operacao/use-cases/pedido/multi-delete-pedido/multi-delete-pedido-controller"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"
import { ImportPedidosController } from "@modules/operacao/use-cases/pedido/import-pedido/import-funcinario-controller"

const uploadFiles = multer(uploadConfig)
const pedidosRoutes = Router()

const createPedidoController = new CreatePedidoController()
const listPedidoController = new ListPedidoController()
const countPedidoController = new CountPedidoController()
const selectPedidoController = new SelectPedidoController()
const idSelectPedidoController = new IdSelectPedidoController()
const getPedidoController = new GetPedidoController()
const updatePedidoController = new UpdatePedidoController()
const deletePedidoController = new DeletePedidoController()
const multiDeletePedidoController = new MultiDeletePedidoController()
const importPedidosController = new ImportPedidosController()

pedidosRoutes.post("/", ensureAuthenticated, createPedidoController.handle)
pedidosRoutes.post("/import", ensureAuthenticated, uploadFiles.single("arquivos"), importPedidosController.handle)
pedidosRoutes.post("/list", ensureAuthenticated, listPedidoController.handle)
pedidosRoutes.post("/count", ensureAuthenticated, countPedidoController.handle)
pedidosRoutes.get("/select/:id", ensureAuthenticated, idSelectPedidoController.handle)
pedidosRoutes.get("/select", ensureAuthenticated, selectPedidoController.handle)
pedidosRoutes.get("/:id", ensureAuthenticated, getPedidoController.handle)
pedidosRoutes.put("/:id", ensureAuthenticated, updatePedidoController.handle)
pedidosRoutes.delete("/:id", ensureAuthenticated, deletePedidoController.handle)
pedidosRoutes.delete("/", ensureAuthenticated, multiDeletePedidoController.handle)

export { pedidosRoutes }
