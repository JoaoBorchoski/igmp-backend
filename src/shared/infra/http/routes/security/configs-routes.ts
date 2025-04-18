import { Router } from 'express'
import { CreateConfigController } from '@modules/security/use-cases/config/create-config/create-config-controller'
import { GetConfigController } from '@modules/security/use-cases/config/get-config/get-config-controller'
import { UpdateConfigController } from '@modules/security/use-cases/config/update-config/update-config-controller'
import { DeleteConfigController } from '@modules/security/use-cases/config/delete-config/delete-config-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const configsRoutes = Router()

const createConfigController = new CreateConfigController()
const getConfigController = new GetConfigController()
const updateConfigController = new UpdateConfigController()
const deleteConfigController = new DeleteConfigController()

configsRoutes.post('/', ensureAuthenticated, createConfigController.handle)
configsRoutes.post('/get', ensureAuthenticated, getConfigController.handle)
configsRoutes.put('/', ensureAuthenticated, updateConfigController.handle)
configsRoutes.delete('/:id', ensureAuthenticated, deleteConfigController.handle)

export { configsRoutes }
