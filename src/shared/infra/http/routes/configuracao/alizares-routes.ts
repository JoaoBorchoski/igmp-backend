import { Router } from 'express'
import { CreateAlizarController } from '@modules/configuracao/use-cases/alizar/create-alizar/create-alizar-controller'
import { ListAlizarController } from '@modules/configuracao/use-cases/alizar/list-alizar/list-alizar-controller'
import { CountAlizarController } from '@modules/configuracao/use-cases/alizar/count-alizar/count-alizar-controller'
import { SelectAlizarController } from '@modules/configuracao/use-cases/alizar/select-alizar/select-alizar-controller'
import { IdSelectAlizarController } from '@modules/configuracao/use-cases/alizar/id-select-alizar/id-select-alizar-controller'
import { GetAlizarController } from '@modules/configuracao/use-cases/alizar/get-alizar/get-alizar-controller'
import { UpdateAlizarController } from '@modules/configuracao/use-cases/alizar/update-alizar/update-alizar-controller'
import { DeleteAlizarController } from '@modules/configuracao/use-cases/alizar/delete-alizar/delete-alizar-controller'
import { MultiDeleteAlizarController } from '@modules/configuracao/use-cases/alizar/multi-delete-alizar/multi-delete-alizar-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const alizaresRoutes = Router()

const createAlizarController = new CreateAlizarController()
const listAlizarController = new ListAlizarController()
const countAlizarController = new CountAlizarController()
const selectAlizarController = new SelectAlizarController()
const idSelectAlizarController = new IdSelectAlizarController()
const getAlizarController = new GetAlizarController()
const updateAlizarController = new UpdateAlizarController()
const deleteAlizarController = new DeleteAlizarController()
const multiDeleteAlizarController = new MultiDeleteAlizarController()

alizaresRoutes.post('/', ensureAuthenticated, createAlizarController.handle)
alizaresRoutes.post('/list', ensureAuthenticated, listAlizarController.handle)
alizaresRoutes.post('/count', ensureAuthenticated, countAlizarController.handle)
alizaresRoutes.get('/select/:id', ensureAuthenticated, idSelectAlizarController.handle)
alizaresRoutes.get('/select', ensureAuthenticated, selectAlizarController.handle)
alizaresRoutes.get('/:id', ensureAuthenticated, getAlizarController.handle)
alizaresRoutes.put('/:id', ensureAuthenticated, updateAlizarController.handle)
alizaresRoutes.delete('/:id', ensureAuthenticated, deleteAlizarController.handle)
alizaresRoutes.delete('/', ensureAuthenticated, multiDeleteAlizarController.handle)

export { alizaresRoutes }
