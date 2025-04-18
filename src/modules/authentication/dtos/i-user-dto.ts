interface IUserDTO {
  id?: string
  userGroupId?: string
  name?: string
  login?: string
  password?: string
  isAdmin?: boolean
  isSuperUser?: boolean
  isBlocked?: boolean
  blockReasonId?: string
  mustChangePasswordNextLogon?: boolean
  mustActiveTwoFactorAuthentication?: boolean
  isDisabled?: boolean
  avatar?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IUserDTO }
