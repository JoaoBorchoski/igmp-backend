declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id?: string,
      userGroupId?: string,
      name?: string,
      login?: string,
      isAdmin?: boolean
      isSuperUser?: boolean
      isBlocked?: boolean
      blockReasonId?: string
      mustChangePasswordNextLogon?: boolean
      isDisabled?: boolean
    }
  }
}
