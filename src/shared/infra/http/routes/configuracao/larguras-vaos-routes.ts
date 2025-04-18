import { Router } from 'express'
import { CreateLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/create-largura-vaos/create-largura-vaos-controller'
import { ListLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/list-largura-vaos/list-largura-vaos-controller'
import { CountLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/count-largura-vaos/count-largura-vaos-controller'
import { SelectLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/select-largura-vaos/select-largura-vaos-controller'
import { IdSelectLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/id-select-largura-vaos/id-select-largura-vaos-controller'
import { GetLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/get-largura-vaos/get-largura-vaos-controller'
import { UpdateLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/update-largura-vaos/update-largura-vaos-controller'
import { DeleteLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/delete-largura-vaos/delete-largura-vaos-controller'
import { MultiDeleteLarguraVaosController } from '@modules/configuracao/use-cases/largura-vaos/multi-delete-largura-vaos/multi-delete-largura-vaos-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const largurasVaosRoutes = Router()

const createLarguraVaosController = new CreateLarguraVaosController()
const listLarguraVaosController = new ListLarguraVaosController()
const countLarguraVaosController = new CountLarguraVaosController()
const selectLarguraVaosController = new SelectLarguraVaosController()
const idSelectLarguraVaosController = new IdSelectLarguraVaosController()
const getLarguraVaosController = new GetLarguraVaosController()
const updateLarguraVaosController = new UpdateLarguraVaosController()
const deleteLarguraVaosController = new DeleteLarguraVaosController()
const multiDeleteLarguraVaosController = new MultiDeleteLarguraVaosController()

largurasVaosRoutes.post('/', ensureAuthenticated, createLarguraVaosController.handle)
largurasVaosRoutes.post('/list', ensureAuthenticated, listLarguraVaosController.handle)
largurasVaosRoutes.post('/count', ensureAuthenticated, countLarguraVaosController.handle)
largurasVaosRoutes.get('/select/:id', ensureAuthenticated, idSelectLarguraVaosController.handle)
largurasVaosRoutes.get('/select', ensureAuthenticated, selectLarguraVaosController.handle)
largurasVaosRoutes.get('/:id', ensureAuthenticated, getLarguraVaosController.handle)
largurasVaosRoutes.put('/:id', ensureAuthenticated, updateLarguraVaosController.handle)
largurasVaosRoutes.delete('/:id', ensureAuthenticated, deleteLarguraVaosController.handle)
largurasVaosRoutes.delete('/', ensureAuthenticated, multiDeleteLarguraVaosController.handle)

export { largurasVaosRoutes }
