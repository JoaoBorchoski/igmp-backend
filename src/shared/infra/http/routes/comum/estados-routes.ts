import { Router } from 'express'
import { CreateEstadoController } from '@modules/comum/use-cases/estado/create-estado/create-estado-controller'
import { ListEstadoController } from '@modules/comum/use-cases/estado/list-estado/list-estado-controller'
import { CountEstadoController } from '@modules/comum/use-cases/estado/count-estado/count-estado-controller'
import { SelectEstadoController } from '@modules/comum/use-cases/estado/select-estado/select-estado-controller'
import { IdSelectEstadoController } from '@modules/comum/use-cases/estado/id-select-estado/id-select-estado-controller'
import { GetEstadoController } from '@modules/comum/use-cases/estado/get-estado/get-estado-controller'
import { UpdateEstadoController } from '@modules/comum/use-cases/estado/update-estado/update-estado-controller'
import { DeleteEstadoController } from '@modules/comum/use-cases/estado/delete-estado/delete-estado-controller'
import { MultiDeleteEstadoController } from '@modules/comum/use-cases/estado/multi-delete-estado/multi-delete-estado-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const estadosRoutes = Router()

const createEstadoController = new CreateEstadoController()
const listEstadoController = new ListEstadoController()
const countEstadoController = new CountEstadoController()
const selectEstadoController = new SelectEstadoController()
const idSelectEstadoController = new IdSelectEstadoController()
const getEstadoController = new GetEstadoController()
const updateEstadoController = new UpdateEstadoController()
const deleteEstadoController = new DeleteEstadoController()
const multiDeleteEstadoController = new MultiDeleteEstadoController()

estadosRoutes.post('/', ensureAuthenticated, createEstadoController.handle)
estadosRoutes.post('/list', ensureAuthenticated, listEstadoController.handle)
estadosRoutes.post('/count', ensureAuthenticated, countEstadoController.handle)
estadosRoutes.get('/select/:id', ensureAuthenticated, idSelectEstadoController.handle)
estadosRoutes.get('/select', ensureAuthenticated, selectEstadoController.handle)
estadosRoutes.get('/:id', ensureAuthenticated, getEstadoController.handle)
estadosRoutes.put('/:id', ensureAuthenticated, updateEstadoController.handle)
estadosRoutes.delete('/:id', ensureAuthenticated, deleteEstadoController.handle)
estadosRoutes.delete('/', ensureAuthenticated, multiDeleteEstadoController.handle)

export { estadosRoutes }
