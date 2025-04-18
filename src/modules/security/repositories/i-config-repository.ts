import { IConfigDTO } from '@modules/security/dtos/i-config-dto'
import { HttpResponse } from '@shared/helpers'

interface IConfigRepository {
  // create
  create (data: IConfigDTO): Promise<HttpResponse>


  // get
  get (title: string): Promise<HttpResponse>


  // update
  update (data: IConfigDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>
}

export { IConfigRepository }
