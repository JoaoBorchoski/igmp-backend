import { Router } from "express"
import { CreateTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/create-tipo-porta/create-tipo-porta-controller"
import { ListTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/list-tipo-porta/list-tipo-porta-controller"
import { CountTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/count-tipo-porta/count-tipo-porta-controller"
import { SelectTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/select-tipo-porta/select-tipo-porta-controller"
import { IdSelectTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/id-select-tipo-porta/id-select-tipo-porta-controller"
import { GetTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/get-tipo-porta/get-tipo-porta-controller"
import { UpdateTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/update-tipo-porta/update-tipo-porta-controller"
import { DeleteTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/delete-tipo-porta/delete-tipo-porta-controller"
import { MultiDeleteTipoPortaController } from "@modules/configuracao/use-cases/tipo-porta/multi-delete-tipo-porta/multi-delete-tipo-porta-controller"
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated"
import { CountProdutoController } from "@modules/configuracao/use-cases/produto/count-produto/count-produto-controller"
import { CreateProdutoController } from "@modules/configuracao/use-cases/produto/create-produto/create-produto-controller"
import { DeleteProdutoController } from "@modules/configuracao/use-cases/produto/delete-produto/delete-produto-controller"
import { IdSelectProdutoController } from "@modules/configuracao/use-cases/produto/id-select-produto/id-select-produto-controller"
import { ListProdutoController } from "@modules/configuracao/use-cases/produto/list-produto/list-produto-controller"
import { SelectProdutoController } from "@modules/configuracao/use-cases/produto/select-produto/select-produto-controller"
import { UpdateProdutoController } from "@modules/configuracao/use-cases/produto/update-produto/update-produto-controller"
import { GetProdutoController } from "@modules/configuracao/use-cases/produto/get-produto/get-produto-controller"
import { MultiDeleteProdutoController } from "@modules/configuracao/use-cases/produto/multi-delete-produto/multi-delete-produto-controller"

const produtoRoutes = Router()

const createProdutoController = new CreateProdutoController()
const listProdutoController = new ListProdutoController()
const countProdutoController = new CountProdutoController()
const selectProdutoController = new SelectProdutoController()
const idSelectProdutoController = new IdSelectProdutoController()
const getProdutoController = new GetProdutoController()
const updateProdutoController = new UpdateProdutoController()
const deleteProdutoController = new DeleteProdutoController()
const multiDeleteProdutoController = new MultiDeleteProdutoController()

produtoRoutes.post("/", ensureAuthenticated, createProdutoController.handle)
produtoRoutes.post("/list", ensureAuthenticated, listProdutoController.handle)
produtoRoutes.post("/count", ensureAuthenticated, countProdutoController.handle)
produtoRoutes.get("/select/:id", ensureAuthenticated, selectProdutoController.handle)
produtoRoutes.get("/select", ensureAuthenticated, idSelectProdutoController.handle)
produtoRoutes.get("/:id", ensureAuthenticated, getProdutoController.handle)
produtoRoutes.put("/:id", ensureAuthenticated, updateProdutoController.handle)
produtoRoutes.delete("/:id", ensureAuthenticated, deleteProdutoController.handle)
produtoRoutes.delete("/", ensureAuthenticated, multiDeleteProdutoController.handle)

export { produtoRoutes }
