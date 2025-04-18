import { IFilterDTO } from '@modules/security/dtos/i-filter-dto'
import { HttpResponse } from '@shared/helpers'
import { User } from '@modules/security/infra/typeorm/entities/user'

interface IFilterRepository {
  // create
  create (data: IFilterDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse>


  // select
  select (table: string, user: User): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IFilterDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>


  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IFilterRepository }
