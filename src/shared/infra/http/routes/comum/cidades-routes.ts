import { Router } from 'express'
import { CreateCidadeController } from '@modules/comum/use-cases/cidade/create-cidade/create-cidade-controller'
import { ListCidadeController } from '@modules/comum/use-cases/cidade/list-cidade/list-cidade-controller'
import { CountCidadeController } from '@modules/comum/use-cases/cidade/count-cidade/count-cidade-controller'
import { SelectCidadeController } from '@modules/comum/use-cases/cidade/select-cidade/select-cidade-controller'
import { IdSelectCidadeController } from '@modules/comum/use-cases/cidade/id-select-cidade/id-select-cidade-controller'
import { GetCidadeController } from '@modules/comum/use-cases/cidade/get-cidade/get-cidade-controller'
import { UpdateCidadeController } from '@modules/comum/use-cases/cidade/update-cidade/update-cidade-controller'
import { DeleteCidadeController } from '@modules/comum/use-cases/cidade/delete-cidade/delete-cidade-controller'
import { MultiDeleteCidadeController } from '@modules/comum/use-cases/cidade/multi-delete-cidade/multi-delete-cidade-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const cidadesRoutes = Router()

const createCidadeController = new CreateCidadeController()
const listCidadeController = new ListCidadeController()
const countCidadeController = new CountCidadeController()
const selectCidadeController = new SelectCidadeController()
const idSelectCidadeController = new IdSelectCidadeController()
const getCidadeController = new GetCidadeController()
const updateCidadeController = new UpdateCidadeController()
const deleteCidadeController = new DeleteCidadeController()
const multiDeleteCidadeController = new MultiDeleteCidadeController()

cidadesRoutes.post('/', ensureAuthenticated, createCidadeController.handle)
cidadesRoutes.post('/list', ensureAuthenticated, listCidadeController.handle)
cidadesRoutes.post('/count', ensureAuthenticated, countCidadeController.handle)
cidadesRoutes.get('/select/:id', ensureAuthenticated, idSelectCidadeController.handle)
cidadesRoutes.get('/select', ensureAuthenticated, selectCidadeController.handle)
cidadesRoutes.get('/:id', ensureAuthenticated, getCidadeController.handle)
cidadesRoutes.put('/:id', ensureAuthenticated, updateCidadeController.handle)
cidadesRoutes.delete('/:id', ensureAuthenticated, deleteCidadeController.handle)
cidadesRoutes.delete('/', ensureAuthenticated, multiDeleteCidadeController.handle)

export { cidadesRoutes }
