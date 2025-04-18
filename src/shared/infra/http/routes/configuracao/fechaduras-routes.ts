import { Router } from 'express'
import { CreateFechaduraController } from '@modules/configuracao/use-cases/fechadura/create-fechadura/create-fechadura-controller'
import { ListFechaduraController } from '@modules/configuracao/use-cases/fechadura/list-fechadura/list-fechadura-controller'
import { CountFechaduraController } from '@modules/configuracao/use-cases/fechadura/count-fechadura/count-fechadura-controller'
import { SelectFechaduraController } from '@modules/configuracao/use-cases/fechadura/select-fechadura/select-fechadura-controller'
import { IdSelectFechaduraController } from '@modules/configuracao/use-cases/fechadura/id-select-fechadura/id-select-fechadura-controller'
import { GetFechaduraController } from '@modules/configuracao/use-cases/fechadura/get-fechadura/get-fechadura-controller'
import { UpdateFechaduraController } from '@modules/configuracao/use-cases/fechadura/update-fechadura/update-fechadura-controller'
import { DeleteFechaduraController } from '@modules/configuracao/use-cases/fechadura/delete-fechadura/delete-fechadura-controller'
import { MultiDeleteFechaduraController } from '@modules/configuracao/use-cases/fechadura/multi-delete-fechadura/multi-delete-fechadura-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const fechadurasRoutes = Router()

const createFechaduraController = new CreateFechaduraController()
const listFechaduraController = new ListFechaduraController()
const countFechaduraController = new CountFechaduraController()
const selectFechaduraController = new SelectFechaduraController()
const idSelectFechaduraController = new IdSelectFechaduraController()
const getFechaduraController = new GetFechaduraController()
const updateFechaduraController = new UpdateFechaduraController()
const deleteFechaduraController = new DeleteFechaduraController()
const multiDeleteFechaduraController = new MultiDeleteFechaduraController()

fechadurasRoutes.post('/', ensureAuthenticated, createFechaduraController.handle)
fechadurasRoutes.post('/list', ensureAuthenticated, listFechaduraController.handle)
fechadurasRoutes.post('/count', ensureAuthenticated, countFechaduraController.handle)
fechadurasRoutes.get('/select/:id', ensureAuthenticated, idSelectFechaduraController.handle)
fechadurasRoutes.get('/select', ensureAuthenticated, selectFechaduraController.handle)
fechadurasRoutes.get('/:id', ensureAuthenticated, getFechaduraController.handle)
fechadurasRoutes.put('/:id', ensureAuthenticated, updateFechaduraController.handle)
fechadurasRoutes.delete('/:id', ensureAuthenticated, deleteFechaduraController.handle)
fechadurasRoutes.delete('/', ensureAuthenticated, multiDeleteFechaduraController.handle)

export { fechadurasRoutes }
