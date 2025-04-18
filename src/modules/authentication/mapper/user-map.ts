import { classToClass } from 'class-transformer'
import { IUserResponseDTO } from '../dtos/i-user-response-dto'
import { User } from '../infra/typeorm/entities/user'

class UserMap {
  static toDTO({
    id,
    login,
    name,
    avatar,
    avatarUrl,
    isBlocked,
    isDisabled
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      login,
      name,
      avatar,
      avatarUrl,
      isBlocked,
      isDisabled
    })
    
    return user
  }
}

export { UserMap }
