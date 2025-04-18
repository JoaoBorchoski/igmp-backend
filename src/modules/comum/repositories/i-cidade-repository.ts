import { ICidadeDTO } from '@modules/comum/dtos/i-cidade-dto'
import { HttpResponse } from '@shared/helpers'

interface ICidadeRepository {
  // create
  create (data: ICidadeDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse>


  // select
  select (filter: string, estadoId: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string, filter: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: ICidadeDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { ICidadeRepository }
