import { Router } from 'express'
import { CreateUserGroupController } from '@modules/security/use-cases/user-group/create-user-group/create-user-group-controller'
import { ListUserGroupController } from '@modules/security/use-cases/user-group/list-user-group/list-user-group-controller'
import { CountUserGroupController } from '@modules/security/use-cases/user-group/count-user-group/count-user-group-controller'
import { SelectUserGroupController } from '@modules/security/use-cases/user-group/select-user-group/select-user-group-controller'
import { IdSelectUserGroupController } from '@modules/security/use-cases/user-group/id-select-user-group/id-select-user-group-controller'
import { GetUserGroupController } from '@modules/security/use-cases/user-group/get-user-group/get-user-group-controller'
import { UpdateUserGroupController } from '@modules/security/use-cases/user-group/update-user-group/update-user-group-controller'
import { DeleteUserGroupController } from '@modules/security/use-cases/user-group/delete-user-group/delete-user-group-controller'
import { MultiDeleteUserGroupController } from '@modules/security/use-cases/user-group/multi-delete-user-group/multi-delete-user-group-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const userGroupsRoutes = Router()

const createUserGroupController = new CreateUserGroupController()
const listUserGroupController = new ListUserGroupController()
const countUserGroupController = new CountUserGroupController()
const selectUserGroupController = new SelectUserGroupController()
const idSelectUserGroupController = new IdSelectUserGroupController()
const getUserGroupController = new GetUserGroupController()
const updateUserGroupController = new UpdateUserGroupController()
const deleteUserGroupController = new DeleteUserGroupController()
const multiDeleteUserGroupController = new MultiDeleteUserGroupController()

userGroupsRoutes.post('/', ensureAuthenticated, createUserGroupController.handle)
userGroupsRoutes.post('/list', ensureAuthenticated, listUserGroupController.handle)
userGroupsRoutes.post('/count', ensureAuthenticated, countUserGroupController.handle)
userGroupsRoutes.get('/select/:id', ensureAuthenticated, idSelectUserGroupController.handle)
userGroupsRoutes.get('/select', ensureAuthenticated, selectUserGroupController.handle)
userGroupsRoutes.get('/:id', ensureAuthenticated, getUserGroupController.handle)
userGroupsRoutes.put('/:id', ensureAuthenticated, updateUserGroupController.handle)
userGroupsRoutes.delete('/:id', ensureAuthenticated, deleteUserGroupController.handle)
userGroupsRoutes.delete('/', ensureAuthenticated, multiDeleteUserGroupController.handle)

export { userGroupsRoutes }
