import { Router } from 'express'
import { CreateModuleController } from '@modules/security/use-cases/module/create-module/create-module-controller'
import { ListModuleController } from '@modules/security/use-cases/module/list-module/list-module-controller'
import { CountModuleController } from '@modules/security/use-cases/module/count-module/count-module-controller'
import { SelectModuleController } from '@modules/security/use-cases/module/select-module/select-module-controller'
import { IdSelectModuleController } from '@modules/security/use-cases/module/id-select-module/id-select-module-controller'
import { GetModuleController } from '@modules/security/use-cases/module/get-module/get-module-controller'
import { UpdateModuleController } from '@modules/security/use-cases/module/update-module/update-module-controller'
import { DeleteModuleController } from '@modules/security/use-cases/module/delete-module/delete-module-controller'
import { MultiDeleteModuleController } from '@modules/security/use-cases/module/multi-delete-module/multi-delete-module-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const modulesRoutes = Router()

const createModuleController = new CreateModuleController()
const listModuleController = new ListModuleController()
const countModuleController = new CountModuleController()
const selectModuleController = new SelectModuleController()
const idSelectModuleController = new IdSelectModuleController()
const getModuleController = new GetModuleController()
const updateModuleController = new UpdateModuleController()
const deleteModuleController = new DeleteModuleController()
const multiDeleteModuleController = new MultiDeleteModuleController()

modulesRoutes.post('/', ensureAuthenticated, createModuleController.handle)
modulesRoutes.post('/list', ensureAuthenticated, listModuleController.handle)
modulesRoutes.post('/count', ensureAuthenticated, countModuleController.handle)
modulesRoutes.get('/select/:id', ensureAuthenticated, idSelectModuleController.handle)
modulesRoutes.get('/select', ensureAuthenticated, selectModuleController.handle)
modulesRoutes.get('/:id', ensureAuthenticated, getModuleController.handle)
modulesRoutes.put('/:id', ensureAuthenticated, updateModuleController.handle)
modulesRoutes.delete('/:id', ensureAuthenticated, deleteModuleController.handle)
modulesRoutes.delete('/', ensureAuthenticated, multiDeleteModuleController.handle)

export { modulesRoutes }
