import { getRepository, Repository } from 'typeorm'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { IConfigDTO } from '@modules/security/dtos/i-config-dto'
import { Config } from '../entities/config'

class ConfigRepository implements IConfigRepository {
  private repository: Repository<Config>

  constructor() {
    this.repository = getRepository(Config)
  }


  // create
  async create ({
    title,
    description,
  }: IConfigDTO): Promise<HttpResponse> {
    const config = this.repository.create({
      title,
      description
    })

    const result = await this.repository.save(config)
      .then(configResult => {
        return ok(configResult)
      })
      .catch(error => {
        return serverError(error.message)
      })

    return result
  }


  // get
  async get (title: string): Promise<HttpResponse> {
    try {
      const config = await this.repository.findOne({ title })

      if (typeof config === 'undefined') {
        return noContent()
      }

      return ok(config)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    title,
    description
  }: IConfigDTO): Promise<HttpResponse> {
    const config = await this.repository.findOne({ title })

    if (!config) {
      return notFound()
    }

    const newConfig = this.repository.create({
      id: config.id,
      title,
      description
    })

    try {
      await this.repository.save(newConfig)

      return ok(newConfig)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 16) === 'update or delete') {
        throw new AppError('not null constraint', 404)
      }
      
      return serverError(err)
    }
  }
}

export { ConfigRepository }
