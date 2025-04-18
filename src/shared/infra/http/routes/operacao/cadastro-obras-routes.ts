import { Router } from 'express'
import { CreateCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/create-cadastro-obra/create-cadastro-obra-controller'
import { ListCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/list-cadastro-obra/list-cadastro-obra-controller'
import { CountCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/count-cadastro-obra/count-cadastro-obra-controller'
import { SelectCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/select-cadastro-obra/select-cadastro-obra-controller'
import { IdSelectCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/id-select-cadastro-obra/id-select-cadastro-obra-controller'
import { GetCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/get-cadastro-obra/get-cadastro-obra-controller'
import { UpdateCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/update-cadastro-obra/update-cadastro-obra-controller'
import { DeleteCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/delete-cadastro-obra/delete-cadastro-obra-controller'
import { MultiDeleteCadastroObraController } from '@modules/operacao/use-cases/cadastro-obra/multi-delete-cadastro-obra/multi-delete-cadastro-obra-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const cadastroObrasRoutes = Router()

const createCadastroObraController = new CreateCadastroObraController()
const listCadastroObraController = new ListCadastroObraController()
const countCadastroObraController = new CountCadastroObraController()
const selectCadastroObraController = new SelectCadastroObraController()
const idSelectCadastroObraController = new IdSelectCadastroObraController()
const getCadastroObraController = new GetCadastroObraController()
const updateCadastroObraController = new UpdateCadastroObraController()
const deleteCadastroObraController = new DeleteCadastroObraController()
const multiDeleteCadastroObraController = new MultiDeleteCadastroObraController()

cadastroObrasRoutes.post('/', ensureAuthenticated, createCadastroObraController.handle)
cadastroObrasRoutes.post('/list', ensureAuthenticated, listCadastroObraController.handle)
cadastroObrasRoutes.post('/count', ensureAuthenticated, countCadastroObraController.handle)
cadastroObrasRoutes.get('/select/:id', ensureAuthenticated, idSelectCadastroObraController.handle)
cadastroObrasRoutes.get('/select', ensureAuthenticated, selectCadastroObraController.handle)
cadastroObrasRoutes.get('/:id', ensureAuthenticated, getCadastroObraController.handle)
cadastroObrasRoutes.put('/:id', ensureAuthenticated, updateCadastroObraController.handle)
cadastroObrasRoutes.delete('/:id', ensureAuthenticated, deleteCadastroObraController.handle)
cadastroObrasRoutes.delete('/', ensureAuthenticated, multiDeleteCadastroObraController.handle)

export { cadastroObrasRoutes }
