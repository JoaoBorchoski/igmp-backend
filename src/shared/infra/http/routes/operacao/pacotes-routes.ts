import { Router } from 'express'
import { CreatePacoteController } from '@modules/operacao/use-cases/pacote/create-pacote/create-pacote-controller'
import { ListPacoteController } from '@modules/operacao/use-cases/pacote/list-pacote/list-pacote-controller'
import { CountPacoteController } from '@modules/operacao/use-cases/pacote/count-pacote/count-pacote-controller'
import { SelectPacoteController } from '@modules/operacao/use-cases/pacote/select-pacote/select-pacote-controller'
import { IdSelectPacoteController } from '@modules/operacao/use-cases/pacote/id-select-pacote/id-select-pacote-controller'
import { GetPacoteController } from '@modules/operacao/use-cases/pacote/get-pacote/get-pacote-controller'
import { UpdatePacoteController } from '@modules/operacao/use-cases/pacote/update-pacote/update-pacote-controller'
import { DeletePacoteController } from '@modules/operacao/use-cases/pacote/delete-pacote/delete-pacote-controller'
import { MultiDeletePacoteController } from '@modules/operacao/use-cases/pacote/multi-delete-pacote/multi-delete-pacote-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const pacotesRoutes = Router()

const createPacoteController = new CreatePacoteController()
const listPacoteController = new ListPacoteController()
const countPacoteController = new CountPacoteController()
const selectPacoteController = new SelectPacoteController()
const idSelectPacoteController = new IdSelectPacoteController()
const getPacoteController = new GetPacoteController()
const updatePacoteController = new UpdatePacoteController()
const deletePacoteController = new DeletePacoteController()
const multiDeletePacoteController = new MultiDeletePacoteController()

pacotesRoutes.post('/', ensureAuthenticated, createPacoteController.handle)
pacotesRoutes.post('/list', ensureAuthenticated, listPacoteController.handle)
pacotesRoutes.post('/count', ensureAuthenticated, countPacoteController.handle)
pacotesRoutes.get('/select/:id', ensureAuthenticated, idSelectPacoteController.handle)
pacotesRoutes.get('/select', ensureAuthenticated, selectPacoteController.handle)
pacotesRoutes.get('/:id', ensureAuthenticated, getPacoteController.handle)
pacotesRoutes.put('/:id', ensureAuthenticated, updatePacoteController.handle)
pacotesRoutes.delete('/:id', ensureAuthenticated, deletePacoteController.handle)
pacotesRoutes.delete('/', ensureAuthenticated, multiDeletePacoteController.handle)

export { pacotesRoutes }
