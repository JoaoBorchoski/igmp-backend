import { Router } from 'express'
import { CreatePacoteItemController } from '@modules/operacao/use-cases/pacote-item/create-pacote-item/create-pacote-item-controller'
import { ListPacoteItemController } from '@modules/operacao/use-cases/pacote-item/list-pacote-item/list-pacote-item-controller'
import { CountPacoteItemController } from '@modules/operacao/use-cases/pacote-item/count-pacote-item/count-pacote-item-controller'
import { SelectPacoteItemController } from '@modules/operacao/use-cases/pacote-item/select-pacote-item/select-pacote-item-controller'
import { IdSelectPacoteItemController } from '@modules/operacao/use-cases/pacote-item/id-select-pacote-item/id-select-pacote-item-controller'
import { GetPacoteItemController } from '@modules/operacao/use-cases/pacote-item/get-pacote-item/get-pacote-item-controller'
import { UpdatePacoteItemController } from '@modules/operacao/use-cases/pacote-item/update-pacote-item/update-pacote-item-controller'
import { DeletePacoteItemController } from '@modules/operacao/use-cases/pacote-item/delete-pacote-item/delete-pacote-item-controller'
import { MultiDeletePacoteItemController } from '@modules/operacao/use-cases/pacote-item/multi-delete-pacote-item/multi-delete-pacote-item-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const pacotesItemsRoutes = Router()

const createPacoteItemController = new CreatePacoteItemController()
const listPacoteItemController = new ListPacoteItemController()
const countPacoteItemController = new CountPacoteItemController()
const selectPacoteItemController = new SelectPacoteItemController()
const idSelectPacoteItemController = new IdSelectPacoteItemController()
const getPacoteItemController = new GetPacoteItemController()
const updatePacoteItemController = new UpdatePacoteItemController()
const deletePacoteItemController = new DeletePacoteItemController()
const multiDeletePacoteItemController = new MultiDeletePacoteItemController()

pacotesItemsRoutes.post('/', ensureAuthenticated, createPacoteItemController.handle)
pacotesItemsRoutes.post('/list', ensureAuthenticated, listPacoteItemController.handle)
pacotesItemsRoutes.post('/count', ensureAuthenticated, countPacoteItemController.handle)
pacotesItemsRoutes.get('/select/:id', ensureAuthenticated, idSelectPacoteItemController.handle)
pacotesItemsRoutes.get('/select', ensureAuthenticated, selectPacoteItemController.handle)
pacotesItemsRoutes.get('/:id', ensureAuthenticated, getPacoteItemController.handle)
pacotesItemsRoutes.put('/:id', ensureAuthenticated, updatePacoteItemController.handle)
pacotesItemsRoutes.delete('/:id', ensureAuthenticated, deletePacoteItemController.handle)
pacotesItemsRoutes.delete('/', ensureAuthenticated, multiDeletePacoteItemController.handle)

export { pacotesItemsRoutes }
