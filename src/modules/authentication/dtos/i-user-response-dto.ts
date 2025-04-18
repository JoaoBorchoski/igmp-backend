interface IUserResponseDTO {
  login: string
  name: string
  id: string
  avatar: string
  isBlocked: boolean
  isDisabled: boolean
  avatarUrl(): string
}

export { IUserResponseDTO }
