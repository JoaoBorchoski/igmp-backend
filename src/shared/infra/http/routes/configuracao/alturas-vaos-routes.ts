import { Router } from 'express'
import { CreateAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/create-altura-vaos/create-altura-vaos-controller'
import { ListAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/list-altura-vaos/list-altura-vaos-controller'
import { CountAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/count-altura-vaos/count-altura-vaos-controller'
import { SelectAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/select-altura-vaos/select-altura-vaos-controller'
import { IdSelectAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/id-select-altura-vaos/id-select-altura-vaos-controller'
import { GetAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/get-altura-vaos/get-altura-vaos-controller'
import { UpdateAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/update-altura-vaos/update-altura-vaos-controller'
import { DeleteAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/delete-altura-vaos/delete-altura-vaos-controller'
import { MultiDeleteAlturaVaosController } from '@modules/configuracao/use-cases/altura-vaos/multi-delete-altura-vaos/multi-delete-altura-vaos-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const alturasVaosRoutes = Router()

const createAlturaVaosController = new CreateAlturaVaosController()
const listAlturaVaosController = new ListAlturaVaosController()
const countAlturaVaosController = new CountAlturaVaosController()
const selectAlturaVaosController = new SelectAlturaVaosController()
const idSelectAlturaVaosController = new IdSelectAlturaVaosController()
const getAlturaVaosController = new GetAlturaVaosController()
const updateAlturaVaosController = new UpdateAlturaVaosController()
const deleteAlturaVaosController = new DeleteAlturaVaosController()
const multiDeleteAlturaVaosController = new MultiDeleteAlturaVaosController()

alturasVaosRoutes.post('/', ensureAuthenticated, createAlturaVaosController.handle)
alturasVaosRoutes.post('/list', ensureAuthenticated, listAlturaVaosController.handle)
alturasVaosRoutes.post('/count', ensureAuthenticated, countAlturaVaosController.handle)
alturasVaosRoutes.get('/select/:id', ensureAuthenticated, idSelectAlturaVaosController.handle)
alturasVaosRoutes.get('/select', ensureAuthenticated, selectAlturaVaosController.handle)
alturasVaosRoutes.get('/:id', ensureAuthenticated, getAlturaVaosController.handle)
alturasVaosRoutes.put('/:id', ensureAuthenticated, updateAlturaVaosController.handle)
alturasVaosRoutes.delete('/:id', ensureAuthenticated, deleteAlturaVaosController.handle)
alturasVaosRoutes.delete('/', ensureAuthenticated, multiDeleteAlturaVaosController.handle)

export { alturasVaosRoutes }
