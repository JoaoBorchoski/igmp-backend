import { Router } from 'express'
import { CreateTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/create-tipo-porta/create-tipo-porta-controller'
import { ListTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/list-tipo-porta/list-tipo-porta-controller'
import { CountTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/count-tipo-porta/count-tipo-porta-controller'
import { SelectTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/select-tipo-porta/select-tipo-porta-controller'
import { IdSelectTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/id-select-tipo-porta/id-select-tipo-porta-controller'
import { GetTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/get-tipo-porta/get-tipo-porta-controller'
import { UpdateTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/update-tipo-porta/update-tipo-porta-controller'
import { DeleteTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/delete-tipo-porta/delete-tipo-porta-controller'
import { MultiDeleteTipoPortaController } from '@modules/configuracao/use-cases/tipo-porta/multi-delete-tipo-porta/multi-delete-tipo-porta-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const tiposPortaRoutes = Router()

const createTipoPortaController = new CreateTipoPortaController()
const listTipoPortaController = new ListTipoPortaController()
const countTipoPortaController = new CountTipoPortaController()
const selectTipoPortaController = new SelectTipoPortaController()
const idSelectTipoPortaController = new IdSelectTipoPortaController()
const getTipoPortaController = new GetTipoPortaController()
const updateTipoPortaController = new UpdateTipoPortaController()
const deleteTipoPortaController = new DeleteTipoPortaController()
const multiDeleteTipoPortaController = new MultiDeleteTipoPortaController()

tiposPortaRoutes.post('/', ensureAuthenticated, createTipoPortaController.handle)
tiposPortaRoutes.post('/list', ensureAuthenticated, listTipoPortaController.handle)
tiposPortaRoutes.post('/count', ensureAuthenticated, countTipoPortaController.handle)
tiposPortaRoutes.get('/select/:id', ensureAuthenticated, idSelectTipoPortaController.handle)
tiposPortaRoutes.get('/select', ensureAuthenticated, selectTipoPortaController.handle)
tiposPortaRoutes.get('/:id', ensureAuthenticated, getTipoPortaController.handle)
tiposPortaRoutes.put('/:id', ensureAuthenticated, updateTipoPortaController.handle)
tiposPortaRoutes.delete('/:id', ensureAuthenticated, deleteTipoPortaController.handle)
tiposPortaRoutes.delete('/', ensureAuthenticated, multiDeleteTipoPortaController.handle)

export { tiposPortaRoutes }
