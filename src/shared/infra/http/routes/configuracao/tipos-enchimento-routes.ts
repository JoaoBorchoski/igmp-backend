import { Router } from 'express'
import { CreateTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/create-tipo-enchimento/create-tipo-enchimento-controller'
import { ListTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/list-tipo-enchimento/list-tipo-enchimento-controller'
import { CountTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/count-tipo-enchimento/count-tipo-enchimento-controller'
import { SelectTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/select-tipo-enchimento/select-tipo-enchimento-controller'
import { IdSelectTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/id-select-tipo-enchimento/id-select-tipo-enchimento-controller'
import { GetTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/get-tipo-enchimento/get-tipo-enchimento-controller'
import { UpdateTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/update-tipo-enchimento/update-tipo-enchimento-controller'
import { DeleteTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/delete-tipo-enchimento/delete-tipo-enchimento-controller'
import { MultiDeleteTipoEnchimentoController } from '@modules/configuracao/use-cases/tipo-enchimento/multi-delete-tipo-enchimento/multi-delete-tipo-enchimento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const tiposEnchimentoRoutes = Router()

const createTipoEnchimentoController = new CreateTipoEnchimentoController()
const listTipoEnchimentoController = new ListTipoEnchimentoController()
const countTipoEnchimentoController = new CountTipoEnchimentoController()
const selectTipoEnchimentoController = new SelectTipoEnchimentoController()
const idSelectTipoEnchimentoController = new IdSelectTipoEnchimentoController()
const getTipoEnchimentoController = new GetTipoEnchimentoController()
const updateTipoEnchimentoController = new UpdateTipoEnchimentoController()
const deleteTipoEnchimentoController = new DeleteTipoEnchimentoController()
const multiDeleteTipoEnchimentoController = new MultiDeleteTipoEnchimentoController()

tiposEnchimentoRoutes.post('/', ensureAuthenticated, createTipoEnchimentoController.handle)
tiposEnchimentoRoutes.post('/list', ensureAuthenticated, listTipoEnchimentoController.handle)
tiposEnchimentoRoutes.post('/count', ensureAuthenticated, countTipoEnchimentoController.handle)
tiposEnchimentoRoutes.get('/select/:id', ensureAuthenticated, idSelectTipoEnchimentoController.handle)
tiposEnchimentoRoutes.get('/select', ensureAuthenticated, selectTipoEnchimentoController.handle)
tiposEnchimentoRoutes.get('/:id', ensureAuthenticated, getTipoEnchimentoController.handle)
tiposEnchimentoRoutes.put('/:id', ensureAuthenticated, updateTipoEnchimentoController.handle)
tiposEnchimentoRoutes.delete('/:id', ensureAuthenticated, deleteTipoEnchimentoController.handle)
tiposEnchimentoRoutes.delete('/', ensureAuthenticated, multiDeleteTipoEnchimentoController.handle)

export { tiposEnchimentoRoutes }
