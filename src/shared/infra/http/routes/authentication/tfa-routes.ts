import { Router } from 'express'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'
import { SetupTFAController } from '@modules/security/use-cases/tfa/setup-tfa/setup-tfa-controller'
import { ValidateTFAController } from '@modules/security/use-cases/tfa/validate-tfa/validate-tfa-controller'
import { DisableTFAController } from '@modules/security/use-cases/tfa/disable-tfa/disable-tfa-controller'


const tfaRoutes = Router()

const setupTFAController = new SetupTFAController()
const validateTFAController = new ValidateTFAController()
const disableTFAController = new DisableTFAController()

tfaRoutes.post('/setup', ensureAuthenticated, setupTFAController.handle)
tfaRoutes.post('/verify', validateTFAController.handle)
tfaRoutes.post('/disable', ensureAuthenticated, disableTFAController.handle)


export { tfaRoutes }
