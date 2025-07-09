import { Router } from "express"
import { CreatePedidoItemController } from "@modules/operacao/use-cases/pedido-item/create-pedido-item/create-pedido-item-controller"
import { ListPedidoItemController } from "@modules/operacao/use-cases/pedido-item/list-pedido-item/list-pedido-item-controller"
import { CountPedidoItemController } from "@modules/operacao/use-cases/pedido-item/count-pedido-item/count-pedido-item-controller"
import { SelectPedidoItemController } from "@modules/operacao/use-cases/pedido-item/select-pedido-item/select-pedido-item-controller"
import { IdSelectPedidoItemController } from "@modules/operacao/use-cases/pedido-item/id-select-pedido-item/id-select-pedido-item-controller"
import { GetPedidoItemController } from "@modules/operacao/use-cases/pedido-item/get-pedido-item/get-pedido-item-controller"
import { UpdatePedidoItemController } from "@modules/operacao/use-cases/pedido-item/update-pedido-item/update-pedido-item-controller"
import { DeletePedidoItemController } from "@modules/operacao/use-cases/pedido-item/delete-pedido-item/delete-pedido-item-controller"
import { MultiDeletePedidoItemController } from "@modules/operacao/use-cases/pedido-item/multi-delete-pedido-item/multi-delete-pedido-item-controller"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"
import { SelectPedidoItemPedidoController } from "@modules/operacao/use-cases/pedido-item/select-pedido-item-pedido/select-pedido-item-pedido-controller"
import { GetPedidoItemProdutoController } from "@modules/operacao/use-cases/pedido-item/get-pedido-item-produto/get-pedido-item-produto-controller"

const pedidosItemsRoutes = Router()

const createPedidoItemController = new CreatePedidoItemController()
const listPedidoItemController = new ListPedidoItemController()
const countPedidoItemController = new CountPedidoItemController()
const selectPedidoItemController = new SelectPedidoItemController()
const idSelectPedidoItemController = new IdSelectPedidoItemController()
const getPedidoItemController = new GetPedidoItemController()
const updatePedidoItemController = new UpdatePedidoItemController()
const deletePedidoItemController = new DeletePedidoItemController()
const multiDeletePedidoItemController = new MultiDeletePedidoItemController()
const selectPedidoItemPedidoController = new SelectPedidoItemPedidoController()
const getPedidoItemProdutoController = new GetPedidoItemProdutoController()

pedidosItemsRoutes.post("/", ensureAuthenticated, createPedidoItemController.handle)
pedidosItemsRoutes.post("/list", ensureAuthenticated, listPedidoItemController.handle)
pedidosItemsRoutes.post("/count", ensureAuthenticated, countPedidoItemController.handle)
pedidosItemsRoutes.get("/select/:id", ensureAuthenticated, idSelectPedidoItemController.handle)
pedidosItemsRoutes.get("/select", ensureAuthenticated, selectPedidoItemController.handle)
pedidosItemsRoutes.get("/selectPedido", ensureAuthenticated, selectPedidoItemPedidoController.handle)
pedidosItemsRoutes.get("/selectPedido/:id", ensureAuthenticated, idSelectPedidoItemController.handle)
pedidosItemsRoutes.get("/:id", ensureAuthenticated, getPedidoItemController.handle)
pedidosItemsRoutes.get("/produto/:id", ensureAuthenticated, getPedidoItemProdutoController.handle)
pedidosItemsRoutes.put("/:id", ensureAuthenticated, updatePedidoItemController.handle)
pedidosItemsRoutes.delete("/:id", ensureAuthenticated, deletePedidoItemController.handle)
pedidosItemsRoutes.delete("/", ensureAuthenticated, multiDeletePedidoItemController.handle)

export { pedidosItemsRoutes }
