import { Router } from 'express'
import { CreateUserController } from '@modules/security/use-cases/user/create-user/create-user-controller'
import { ListUserController } from '@modules/security/use-cases/user/list-user/list-user-controller'
import { CountUserController } from '@modules/security/use-cases/user/count-user/count-user-controller'
import { SelectUserController } from '@modules/security/use-cases/user/select-user/select-user-controller'
import { IdSelectUserController } from '@modules/security/use-cases/user/id-select-user/id-select-user-controller'
import { GetUserController } from '@modules/security/use-cases/user/get-user/get-user-controller'
import { UpdateUserController } from '@modules/security/use-cases/user/update-user/update-user-controller'
import { DeleteUserController } from '@modules/security/use-cases/user/delete-user/delete-user-controller'
import { MultiDeleteUserController } from '@modules/security/use-cases/user/multi-delete-user/multi-delete-user-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const listUserController = new ListUserController()
const countUserController = new CountUserController()
const selectUserController = new SelectUserController()
const idSelectUserController = new IdSelectUserController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()
const multiDeleteUserController = new MultiDeleteUserController()

usersRoutes.post('/', ensureAuthenticated, createUserController.handle)
usersRoutes.post('/list', ensureAuthenticated, listUserController.handle)
usersRoutes.post('/count', ensureAuthenticated, countUserController.handle)
usersRoutes.get('/select/:id', ensureAuthenticated, idSelectUserController.handle)
usersRoutes.get('/select', ensureAuthenticated, selectUserController.handle)
usersRoutes.get('/:id', ensureAuthenticated, getUserController.handle)
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle)
usersRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle)
usersRoutes.delete('/', ensureAuthenticated, multiDeleteUserController.handle)

export { usersRoutes }
