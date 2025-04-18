interface IBlockReasonDTO {
  id?: string
  code?: string
  description?: string
  instructionsToSolve?: string
  isSolvedByPasswordReset?: boolean
  disabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IBlockReasonDTO }
