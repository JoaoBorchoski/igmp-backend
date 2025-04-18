import { Router } from 'express'
import { CreateBlockReasonController } from '@modules/security/use-cases/block-reason/create-block-reason/create-block-reason-controller'
import { ListBlockReasonController } from '@modules/security/use-cases/block-reason/list-block-reason/list-block-reason-controller'
import { CountBlockReasonController } from '@modules/security/use-cases/block-reason/count-block-reason/count-block-reason-controller'
import { SelectBlockReasonController } from '@modules/security/use-cases/block-reason/select-block-reason/select-block-reason-controller'
import { IdSelectBlockReasonController } from '@modules/security/use-cases/block-reason/id-select-block-reason/id-select-block-reason-controller'
import { GetBlockReasonController } from '@modules/security/use-cases/block-reason/get-block-reason/get-block-reason-controller'
import { UpdateBlockReasonController } from '@modules/security/use-cases/block-reason/update-block-reason/update-block-reason-controller'
import { DeleteBlockReasonController } from '@modules/security/use-cases/block-reason/delete-block-reason/delete-block-reason-controller'
import { MultiDeleteBlockReasonController } from '@modules/security/use-cases/block-reason/multi-delete-block-reason/multi-delete-block-reason-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const blockReasonsRoutes = Router()

const createBlockReasonController = new CreateBlockReasonController()
const listBlockReasonController = new ListBlockReasonController()
const countBlockReasonController = new CountBlockReasonController()
const selectBlockReasonController = new SelectBlockReasonController()
const idSelectBlockReasonController = new IdSelectBlockReasonController()
const getBlockReasonController = new GetBlockReasonController()
const updateBlockReasonController = new UpdateBlockReasonController()
const deleteBlockReasonController = new DeleteBlockReasonController()
const multiDeleteBlockReasonController = new MultiDeleteBlockReasonController()

blockReasonsRoutes.post('/', ensureAuthenticated, createBlockReasonController.handle)
blockReasonsRoutes.post('/list', ensureAuthenticated, listBlockReasonController.handle)
blockReasonsRoutes.post('/count', ensureAuthenticated, countBlockReasonController.handle)
blockReasonsRoutes.get('/select/:id', ensureAuthenticated, idSelectBlockReasonController.handle)
blockReasonsRoutes.get('/select', ensureAuthenticated, selectBlockReasonController.handle)
blockReasonsRoutes.get('/:id', ensureAuthenticated, getBlockReasonController.handle)
blockReasonsRoutes.put('/:id', ensureAuthenticated, updateBlockReasonController.handle)
blockReasonsRoutes.delete('/:id', ensureAuthenticated, deleteBlockReasonController.handle)
blockReasonsRoutes.delete('/', ensureAuthenticated, multiDeleteBlockReasonController.handle)

export { blockReasonsRoutes }
