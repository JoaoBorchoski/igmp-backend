import { Router } from 'express'
import { CreatePadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/create-padrao-cor/create-padrao-cor-controller'
import { ListPadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/list-padrao-cor/list-padrao-cor-controller'
import { CountPadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/count-padrao-cor/count-padrao-cor-controller'
import { SelectPadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/select-padrao-cor/select-padrao-cor-controller'
import { IdSelectPadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/id-select-padrao-cor/id-select-padrao-cor-controller'
import { GetPadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/get-padrao-cor/get-padrao-cor-controller'
import { UpdatePadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/update-padrao-cor/update-padrao-cor-controller'
import { DeletePadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/delete-padrao-cor/delete-padrao-cor-controller'
import { MultiDeletePadraoCorController } from '@modules/configuracao/use-cases/padrao-cor/multi-delete-padrao-cor/multi-delete-padrao-cor-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const padroesCoresRoutes = Router()

const createPadraoCorController = new CreatePadraoCorController()
const listPadraoCorController = new ListPadraoCorController()
const countPadraoCorController = new CountPadraoCorController()
const selectPadraoCorController = new SelectPadraoCorController()
const idSelectPadraoCorController = new IdSelectPadraoCorController()
const getPadraoCorController = new GetPadraoCorController()
const updatePadraoCorController = new UpdatePadraoCorController()
const deletePadraoCorController = new DeletePadraoCorController()
const multiDeletePadraoCorController = new MultiDeletePadraoCorController()

padroesCoresRoutes.post('/', ensureAuthenticated, createPadraoCorController.handle)
padroesCoresRoutes.post('/list', ensureAuthenticated, listPadraoCorController.handle)
padroesCoresRoutes.post('/count', ensureAuthenticated, countPadraoCorController.handle)
padroesCoresRoutes.get('/select/:id', ensureAuthenticated, idSelectPadraoCorController.handle)
padroesCoresRoutes.get('/select', ensureAuthenticated, selectPadraoCorController.handle)
padroesCoresRoutes.get('/:id', ensureAuthenticated, getPadraoCorController.handle)
padroesCoresRoutes.put('/:id', ensureAuthenticated, updatePadraoCorController.handle)
padroesCoresRoutes.delete('/:id', ensureAuthenticated, deletePadraoCorController.handle)
padroesCoresRoutes.delete('/', ensureAuthenticated, multiDeletePadraoCorController.handle)

export { padroesCoresRoutes }
