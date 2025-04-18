import { Router } from 'express'
import { CreateFuncionarioController } from '@modules/configuracao/use-cases/funcionario/create-funcionario/create-funcionario-controller'
import { ListFuncionarioController } from '@modules/configuracao/use-cases/funcionario/list-funcionario/list-funcionario-controller'
import { CountFuncionarioController } from '@modules/configuracao/use-cases/funcionario/count-funcionario/count-funcionario-controller'
import { SelectFuncionarioController } from '@modules/configuracao/use-cases/funcionario/select-funcionario/select-funcionario-controller'
import { IdSelectFuncionarioController } from '@modules/configuracao/use-cases/funcionario/id-select-funcionario/id-select-funcionario-controller'
import { GetFuncionarioController } from '@modules/configuracao/use-cases/funcionario/get-funcionario/get-funcionario-controller'
import { UpdateFuncionarioController } from '@modules/configuracao/use-cases/funcionario/update-funcionario/update-funcionario-controller'
import { DeleteFuncionarioController } from '@modules/configuracao/use-cases/funcionario/delete-funcionario/delete-funcionario-controller'
import { MultiDeleteFuncionarioController } from '@modules/configuracao/use-cases/funcionario/multi-delete-funcionario/multi-delete-funcionario-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const funcionariosRoutes = Router()

const createFuncionarioController = new CreateFuncionarioController()
const listFuncionarioController = new ListFuncionarioController()
const countFuncionarioController = new CountFuncionarioController()
const selectFuncionarioController = new SelectFuncionarioController()
const idSelectFuncionarioController = new IdSelectFuncionarioController()
const getFuncionarioController = new GetFuncionarioController()
const updateFuncionarioController = new UpdateFuncionarioController()
const deleteFuncionarioController = new DeleteFuncionarioController()
const multiDeleteFuncionarioController = new MultiDeleteFuncionarioController()

funcionariosRoutes.post('/', ensureAuthenticated, createFuncionarioController.handle)
funcionariosRoutes.post('/list', ensureAuthenticated, listFuncionarioController.handle)
funcionariosRoutes.post('/count', ensureAuthenticated, countFuncionarioController.handle)
funcionariosRoutes.get('/select/:id', ensureAuthenticated, idSelectFuncionarioController.handle)
funcionariosRoutes.get('/select', ensureAuthenticated, selectFuncionarioController.handle)
funcionariosRoutes.get('/:id', ensureAuthenticated, getFuncionarioController.handle)
funcionariosRoutes.put('/:id', ensureAuthenticated, updateFuncionarioController.handle)
funcionariosRoutes.delete('/:id', ensureAuthenticated, deleteFuncionarioController.handle)
funcionariosRoutes.delete('/', ensureAuthenticated, multiDeleteFuncionarioController.handle)

export { funcionariosRoutes }
