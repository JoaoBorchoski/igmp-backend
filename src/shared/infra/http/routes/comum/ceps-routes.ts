import { Router } from 'express'
import { CreateCepController } from '@modules/comum/use-cases/cep/create-cep/create-cep-controller'
import { ListCepController } from '@modules/comum/use-cases/cep/list-cep/list-cep-controller'
import { CountCepController } from '@modules/comum/use-cases/cep/count-cep/count-cep-controller'
import { SelectCepController } from '@modules/comum/use-cases/cep/select-cep/select-cep-controller'
import { IdSelectCepController } from '@modules/comum/use-cases/cep/id-select-cep/id-select-cep-controller'
import { GetCepController } from '@modules/comum/use-cases/cep/get-cep/get-cep-controller'
import { UpdateCepController } from '@modules/comum/use-cases/cep/update-cep/update-cep-controller'
import { DeleteCepController } from '@modules/comum/use-cases/cep/delete-cep/delete-cep-controller'
import { MultiDeleteCepController } from '@modules/comum/use-cases/cep/multi-delete-cep/multi-delete-cep-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const cepsRoutes = Router()

const createCepController = new CreateCepController()
const listCepController = new ListCepController()
const countCepController = new CountCepController()
const selectCepController = new SelectCepController()
const idSelectCepController = new IdSelectCepController()
const getCepController = new GetCepController()
const updateCepController = new UpdateCepController()
const deleteCepController = new DeleteCepController()
const multiDeleteCepController = new MultiDeleteCepController()

cepsRoutes.post('/', ensureAuthenticated, createCepController.handle)
cepsRoutes.post('/list', ensureAuthenticated, listCepController.handle)
cepsRoutes.post('/count', ensureAuthenticated, countCepController.handle)
cepsRoutes.get('/select/:id', ensureAuthenticated, idSelectCepController.handle)
cepsRoutes.get('/select', ensureAuthenticated, selectCepController.handle)
cepsRoutes.get('/:id', ensureAuthenticated, getCepController.handle)
cepsRoutes.put('/:id', ensureAuthenticated, updateCepController.handle)
cepsRoutes.delete('/:id', ensureAuthenticated, deleteCepController.handle)
cepsRoutes.delete('/', ensureAuthenticated, multiDeleteCepController.handle)

export { cepsRoutes }
