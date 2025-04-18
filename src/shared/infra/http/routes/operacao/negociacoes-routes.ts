import { Router } from 'express'
import { CreateNegociacaoController } from '@modules/operacao/use-cases/negociacao/create-negociacao/create-negociacao-controller'
import { ListNegociacaoController } from '@modules/operacao/use-cases/negociacao/list-negociacao/list-negociacao-controller'
import { CountNegociacaoController } from '@modules/operacao/use-cases/negociacao/count-negociacao/count-negociacao-controller'
import { SelectNegociacaoController } from '@modules/operacao/use-cases/negociacao/select-negociacao/select-negociacao-controller'
import { IdSelectNegociacaoController } from '@modules/operacao/use-cases/negociacao/id-select-negociacao/id-select-negociacao-controller'
import { GetNegociacaoController } from '@modules/operacao/use-cases/negociacao/get-negociacao/get-negociacao-controller'
import { UpdateNegociacaoController } from '@modules/operacao/use-cases/negociacao/update-negociacao/update-negociacao-controller'
import { DeleteNegociacaoController } from '@modules/operacao/use-cases/negociacao/delete-negociacao/delete-negociacao-controller'
import { MultiDeleteNegociacaoController } from '@modules/operacao/use-cases/negociacao/multi-delete-negociacao/multi-delete-negociacao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const negociacoesRoutes = Router()

const createNegociacaoController = new CreateNegociacaoController()
const listNegociacaoController = new ListNegociacaoController()
const countNegociacaoController = new CountNegociacaoController()
const selectNegociacaoController = new SelectNegociacaoController()
const idSelectNegociacaoController = new IdSelectNegociacaoController()
const getNegociacaoController = new GetNegociacaoController()
const updateNegociacaoController = new UpdateNegociacaoController()
const deleteNegociacaoController = new DeleteNegociacaoController()
const multiDeleteNegociacaoController = new MultiDeleteNegociacaoController()

negociacoesRoutes.post('/', ensureAuthenticated, createNegociacaoController.handle)
negociacoesRoutes.post('/list', ensureAuthenticated, listNegociacaoController.handle)
negociacoesRoutes.post('/count', ensureAuthenticated, countNegociacaoController.handle)
negociacoesRoutes.get('/select/:id', ensureAuthenticated, idSelectNegociacaoController.handle)
negociacoesRoutes.get('/select', ensureAuthenticated, selectNegociacaoController.handle)
negociacoesRoutes.get('/:id', ensureAuthenticated, getNegociacaoController.handle)
negociacoesRoutes.put('/:id', ensureAuthenticated, updateNegociacaoController.handle)
negociacoesRoutes.delete('/:id', ensureAuthenticated, deleteNegociacaoController.handle)
negociacoesRoutes.delete('/', ensureAuthenticated, multiDeleteNegociacaoController.handle)

export { negociacoesRoutes }
