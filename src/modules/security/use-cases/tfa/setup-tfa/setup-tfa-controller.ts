import { Request, Response } from 'express'
import { toDataURL } from 'qrcode'
import { generateSecret, otpauthURL } from 'speakeasy'
import { container } from 'tsyringe'
import { SetupTFAUseCase } from './setup-tfa-use-case'

class SetupTFAController {
  async handle(request: Request, response: Response): Promise<void> {
    const user = request.user

    const secret = generateSecret({
      length: 10,
      name: user.name,
      issuer: 'igmp'
    })

    const url = otpauthURL({
      secret: secret.base32,
      label: user.name,
      issuer: 'igmp',
      encoding: 'base32'
    })

    const setupTFAUseCase = container.resolve(SetupTFAUseCase)
    
    toDataURL(url, async (err, dataURL) => {
      await setupTFAUseCase.execute(user, {
        secret: '',
        tempSecret: secret.base32,
        dataURL,
        tfaURL: url
      })

      return response.json({
        message: 'Autenticação de dois fatores deve ser verificado',
        tempSecret: secret.base32,
        dataURL,
        tfaURL: secret.otpauth_url
      })
    })
  }
}

export { SetupTFAController }
