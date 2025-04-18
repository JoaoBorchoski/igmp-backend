import { NextFunction, Request, Response } from "express"

export default async function setPageSize(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.query.pageSize = request?.query?.pageSize ?? '50'
  request.query.page = request?.query?.page ?? '1'

  return next()
}
