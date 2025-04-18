import { Router } from 'express'
import { CreateNavigationController } from '@modules/security/use-cases/navigation/create-navigation/create-navigation-controller'
import { ListNavigationController } from '@modules/security/use-cases/navigation/list-navigation/list-navigation-controller'
import { CountNavigationController } from '@modules/security/use-cases/navigation/count-navigation/count-navigation-controller'
import { SelectNavigationController } from '@modules/security/use-cases/navigation/select-navigation/select-navigation-controller'
import { IdSelectNavigationController } from '@modules/security/use-cases/navigation/id-select-navigation/id-select-navigation-controller'
import { GetNavigationController } from '@modules/security/use-cases/navigation/get-navigation/get-navigation-controller'
import { UpdateNavigationController } from '@modules/security/use-cases/navigation/update-navigation/update-navigation-controller'
import { DeleteNavigationController } from '@modules/security/use-cases/navigation/delete-navigation/delete-navigation-controller'
import { MultiDeleteNavigationController } from '@modules/security/use-cases/navigation/multi-delete-navigation/multi-delete-navigation-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const navigationsRoutes = Router()

const createNavigationController = new CreateNavigationController()
const listNavigationController = new ListNavigationController()
const countNavigationController = new CountNavigationController()
const selectNavigationController = new SelectNavigationController()
const idSelectNavigationController = new IdSelectNavigationController()
const getNavigationController = new GetNavigationController()
const updateNavigationController = new UpdateNavigationController()
const deleteNavigationController = new DeleteNavigationController()
const multiDeleteNavigationController = new MultiDeleteNavigationController()

navigationsRoutes.post('/', ensureAuthenticated, createNavigationController.handle)
navigationsRoutes.post('/list', ensureAuthenticated, listNavigationController.handle)
navigationsRoutes.post('/count', ensureAuthenticated, countNavigationController.handle)
navigationsRoutes.get('/select/:id', ensureAuthenticated, idSelectNavigationController.handle)
navigationsRoutes.get('/select', ensureAuthenticated, selectNavigationController.handle)
navigationsRoutes.get('/:id', ensureAuthenticated, getNavigationController.handle)
navigationsRoutes.put('/:id', ensureAuthenticated, updateNavigationController.handle)
navigationsRoutes.delete('/:id', ensureAuthenticated, deleteNavigationController.handle)
navigationsRoutes.delete('/', ensureAuthenticated, multiDeleteNavigationController.handle)

export { navigationsRoutes }
