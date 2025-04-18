import { Router } from 'express'
import { CreateFilterController } from '@modules/security/use-cases/filter/create-filter/create-filter-controller'
import { ListFilterController } from '@modules/security/use-cases/filter/list-filter/list-filter-controller'
import { CountFilterController } from '@modules/security/use-cases/filter/count-filter/count-filter-controller'
import { SelectFilterController } from '@modules/security/use-cases/filter/select-filter/select-filter-controller'
import { IdSelectFilterController } from '@modules/security/use-cases/filter/id-select-filter/id-select-filter-controller'
import { GetFilterController } from '@modules/security/use-cases/filter/get-filter/get-filter-controller'
import { UpdateFilterController } from '@modules/security/use-cases/filter/update-filter/update-filter-controller'
import { DeleteFilterController } from '@modules/security/use-cases/filter/delete-filter/delete-filter-controller'
import { MultiDeleteFilterController } from '@modules/security/use-cases/filter/multi-delete-filter/multi-delete-filter-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const filtersRoutes = Router()

const createFilterController = new CreateFilterController()
const listFilterController = new ListFilterController()
const countFilterController = new CountFilterController()
const selectFilterController = new SelectFilterController()
const idSelectFilterController = new IdSelectFilterController()
const getFilterController = new GetFilterController()
const updateFilterController = new UpdateFilterController()
const deleteFilterController = new DeleteFilterController()
const multiDeleteFilterController = new MultiDeleteFilterController()

filtersRoutes.post('/', ensureAuthenticated, createFilterController.handle)
filtersRoutes.get('/', ensureAuthenticated, listFilterController.handle)
filtersRoutes.post('/count', ensureAuthenticated, countFilterController.handle)
filtersRoutes.get('/select/:id', ensureAuthenticated, idSelectFilterController.handle)
filtersRoutes.get('/select', ensureAuthenticated, selectFilterController.handle)
filtersRoutes.get('/:id', ensureAuthenticated, getFilterController.handle)
filtersRoutes.put('/:id', ensureAuthenticated, updateFilterController.handle)
filtersRoutes.delete('/:id', ensureAuthenticated, deleteFilterController.handle)
filtersRoutes.delete('/', ensureAuthenticated, multiDeleteFilterController.handle)

export { filtersRoutes }
