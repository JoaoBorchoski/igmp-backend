import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import handlebars from 'handlebars'
import fs from 'fs'
import { IMailProvider } from '../i-mail-provider'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((err) => console.error(err))
  }
  
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path, 'utf-8').toString().replace(/(\r)/gm, "\n")
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'igmp <noreplay@igmp.com>',
      subject,
      html: templateHTML
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { EtherealMailProvider }
