import { Router } from 'express'
import { CreateStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/create-status-negociacao/create-status-negociacao-controller'
import { ListStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/list-status-negociacao/list-status-negociacao-controller'
import { CountStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/count-status-negociacao/count-status-negociacao-controller'
import { SelectStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/select-status-negociacao/select-status-negociacao-controller'
import { IdSelectStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/id-select-status-negociacao/id-select-status-negociacao-controller'
import { GetStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/get-status-negociacao/get-status-negociacao-controller'
import { UpdateStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/update-status-negociacao/update-status-negociacao-controller'
import { DeleteStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/delete-status-negociacao/delete-status-negociacao-controller'
import { MultiDeleteStatusNegociacaoController } from '@modules/configuracao/use-cases/status-negociacao/multi-delete-status-negociacao/multi-delete-status-negociacao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const statusNegociacoesRoutes = Router()

const createStatusNegociacaoController = new CreateStatusNegociacaoController()
const listStatusNegociacaoController = new ListStatusNegociacaoController()
const countStatusNegociacaoController = new CountStatusNegociacaoController()
const selectStatusNegociacaoController = new SelectStatusNegociacaoController()
const idSelectStatusNegociacaoController = new IdSelectStatusNegociacaoController()
const getStatusNegociacaoController = new GetStatusNegociacaoController()
const updateStatusNegociacaoController = new UpdateStatusNegociacaoController()
const deleteStatusNegociacaoController = new DeleteStatusNegociacaoController()
const multiDeleteStatusNegociacaoController = new MultiDeleteStatusNegociacaoController()

statusNegociacoesRoutes.post('/', ensureAuthenticated, createStatusNegociacaoController.handle)
statusNegociacoesRoutes.post('/list', ensureAuthenticated, listStatusNegociacaoController.handle)
statusNegociacoesRoutes.post('/count', ensureAuthenticated, countStatusNegociacaoController.handle)
statusNegociacoesRoutes.get('/select/:id', ensureAuthenticated, idSelectStatusNegociacaoController.handle)
statusNegociacoesRoutes.get('/select', ensureAuthenticated, selectStatusNegociacaoController.handle)
statusNegociacoesRoutes.get('/:id', ensureAuthenticated, getStatusNegociacaoController.handle)
statusNegociacoesRoutes.put('/:id', ensureAuthenticated, updateStatusNegociacaoController.handle)
statusNegociacoesRoutes.delete('/:id', ensureAuthenticated, deleteStatusNegociacaoController.handle)
statusNegociacoesRoutes.delete('/', ensureAuthenticated, multiDeleteStatusNegociacaoController.handle)

export { statusNegociacoesRoutes }
