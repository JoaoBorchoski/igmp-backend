import { IUserProfileDTO } from '@modules/security/dtos/i-user-profile-dto'
import { HttpResponse } from '@shared/helpers'

interface IUserProfileRepository {
  // create
  create (data: IUserProfileDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter?: string
  ): Promise<HttpResponse>


  // select
  select (filter: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string, filter?: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IUserProfileDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>


  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IUserProfileRepository }
