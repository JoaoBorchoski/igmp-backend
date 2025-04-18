import { Router } from 'express'
import { CreateSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/create-sentido-abertura/create-sentido-abertura-controller'
import { ListSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/list-sentido-abertura/list-sentido-abertura-controller'
import { CountSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/count-sentido-abertura/count-sentido-abertura-controller'
import { SelectSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/select-sentido-abertura/select-sentido-abertura-controller'
import { IdSelectSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/id-select-sentido-abertura/id-select-sentido-abertura-controller'
import { GetSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/get-sentido-abertura/get-sentido-abertura-controller'
import { UpdateSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/update-sentido-abertura/update-sentido-abertura-controller'
import { DeleteSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/delete-sentido-abertura/delete-sentido-abertura-controller'
import { MultiDeleteSentidoAberturaController } from '@modules/configuracao/use-cases/sentido-abertura/multi-delete-sentido-abertura/multi-delete-sentido-abertura-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const sentidosAberturaRoutes = Router()

const createSentidoAberturaController = new CreateSentidoAberturaController()
const listSentidoAberturaController = new ListSentidoAberturaController()
const countSentidoAberturaController = new CountSentidoAberturaController()
const selectSentidoAberturaController = new SelectSentidoAberturaController()
const idSelectSentidoAberturaController = new IdSelectSentidoAberturaController()
const getSentidoAberturaController = new GetSentidoAberturaController()
const updateSentidoAberturaController = new UpdateSentidoAberturaController()
const deleteSentidoAberturaController = new DeleteSentidoAberturaController()
const multiDeleteSentidoAberturaController = new MultiDeleteSentidoAberturaController()

sentidosAberturaRoutes.post('/', ensureAuthenticated, createSentidoAberturaController.handle)
sentidosAberturaRoutes.post('/list', ensureAuthenticated, listSentidoAberturaController.handle)
sentidosAberturaRoutes.post('/count', ensureAuthenticated, countSentidoAberturaController.handle)
sentidosAberturaRoutes.get('/select/:id', ensureAuthenticated, idSelectSentidoAberturaController.handle)
sentidosAberturaRoutes.get('/select', ensureAuthenticated, selectSentidoAberturaController.handle)
sentidosAberturaRoutes.get('/:id', ensureAuthenticated, getSentidoAberturaController.handle)
sentidosAberturaRoutes.put('/:id', ensureAuthenticated, updateSentidoAberturaController.handle)
sentidosAberturaRoutes.delete('/:id', ensureAuthenticated, deleteSentidoAberturaController.handle)
sentidosAberturaRoutes.delete('/', ensureAuthenticated, multiDeleteSentidoAberturaController.handle)

export { sentidosAberturaRoutes }
