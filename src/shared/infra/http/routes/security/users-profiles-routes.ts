import { Router } from 'express'
import { CreateUserProfileController } from '@modules/security/use-cases/user-profile/create-user-profile/create-user-profile-controller'
import { ListUserProfileController } from '@modules/security/use-cases/user-profile/list-user-profile/list-user-profile-controller'
import { CountUserProfileController } from '@modules/security/use-cases/user-profile/count-user-profile/count-user-profile-controller'
import { SelectUserProfileController } from '@modules/security/use-cases/user-profile/select-user-profile/select-user-profile-controller'
import { IdSelectUserProfileController } from '@modules/security/use-cases/user-profile/id-select-user-profile/id-select-user-profile-controller'
import { GetUserProfileController } from '@modules/security/use-cases/user-profile/get-user-profile/get-user-profile-controller'
import { UpdateUserProfileController } from '@modules/security/use-cases/user-profile/update-user-profile/update-user-profile-controller'
import { DeleteUserProfileController } from '@modules/security/use-cases/user-profile/delete-user-profile/delete-user-profile-controller'
import { MultiDeleteUserProfileController } from '@modules/security/use-cases/user-profile/multi-delete-user-profile/multi-delete-user-profile-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const usersProfilesRoutes = Router()

const createUserProfileController = new CreateUserProfileController()
const listUserProfileController = new ListUserProfileController()
const countUserProfileController = new CountUserProfileController()
const selectUserProfileController = new SelectUserProfileController()
const idSelectUserProfileController = new IdSelectUserProfileController()
const getUserProfileController = new GetUserProfileController()
const updateUserProfileController = new UpdateUserProfileController()
const deleteUserProfileController = new DeleteUserProfileController()
const multiDeleteUserProfileController = new MultiDeleteUserProfileController()

usersProfilesRoutes.post('/', ensureAuthenticated, createUserProfileController.handle)
usersProfilesRoutes.post('/list', ensureAuthenticated, listUserProfileController.handle)
usersProfilesRoutes.post('/count', ensureAuthenticated, countUserProfileController.handle)
usersProfilesRoutes.get('/select/:id', ensureAuthenticated, idSelectUserProfileController.handle)
usersProfilesRoutes.get('/select', ensureAuthenticated, selectUserProfileController.handle)
usersProfilesRoutes.get('/:id', ensureAuthenticated, getUserProfileController.handle)
usersProfilesRoutes.put('/:id', ensureAuthenticated, updateUserProfileController.handle)
usersProfilesRoutes.delete('/:id', ensureAuthenticated, deleteUserProfileController.handle)
usersProfilesRoutes.delete('/', ensureAuthenticated, multiDeleteUserProfileController.handle)

export { usersProfilesRoutes }
