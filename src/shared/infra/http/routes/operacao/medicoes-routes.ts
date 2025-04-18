import { Router } from 'express'
import { CreateMedicaoController } from '@modules/operacao/use-cases/medicao/create-medicao/create-medicao-controller'
import { ListMedicaoController } from '@modules/operacao/use-cases/medicao/list-medicao/list-medicao-controller'
import { CountMedicaoController } from '@modules/operacao/use-cases/medicao/count-medicao/count-medicao-controller'
import { SelectMedicaoController } from '@modules/operacao/use-cases/medicao/select-medicao/select-medicao-controller'
import { IdSelectMedicaoController } from '@modules/operacao/use-cases/medicao/id-select-medicao/id-select-medicao-controller'
import { GetMedicaoController } from '@modules/operacao/use-cases/medicao/get-medicao/get-medicao-controller'
import { UpdateMedicaoController } from '@modules/operacao/use-cases/medicao/update-medicao/update-medicao-controller'
import { DeleteMedicaoController } from '@modules/operacao/use-cases/medicao/delete-medicao/delete-medicao-controller'
import { MultiDeleteMedicaoController } from '@modules/operacao/use-cases/medicao/multi-delete-medicao/multi-delete-medicao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const medicoesRoutes = Router()

const createMedicaoController = new CreateMedicaoController()
const listMedicaoController = new ListMedicaoController()
const countMedicaoController = new CountMedicaoController()
const selectMedicaoController = new SelectMedicaoController()
const idSelectMedicaoController = new IdSelectMedicaoController()
const getMedicaoController = new GetMedicaoController()
const updateMedicaoController = new UpdateMedicaoController()
const deleteMedicaoController = new DeleteMedicaoController()
const multiDeleteMedicaoController = new MultiDeleteMedicaoController()

medicoesRoutes.post('/', ensureAuthenticated, createMedicaoController.handle)
medicoesRoutes.post('/list', ensureAuthenticated, listMedicaoController.handle)
medicoesRoutes.post('/count', ensureAuthenticated, countMedicaoController.handle)
medicoesRoutes.get('/select/:id', ensureAuthenticated, idSelectMedicaoController.handle)
medicoesRoutes.get('/select', ensureAuthenticated, selectMedicaoController.handle)
medicoesRoutes.get('/:id', ensureAuthenticated, getMedicaoController.handle)
medicoesRoutes.put('/:id', ensureAuthenticated, updateMedicaoController.handle)
medicoesRoutes.delete('/:id', ensureAuthenticated, deleteMedicaoController.handle)
medicoesRoutes.delete('/', ensureAuthenticated, multiDeleteMedicaoController.handle)

export { medicoesRoutes }
