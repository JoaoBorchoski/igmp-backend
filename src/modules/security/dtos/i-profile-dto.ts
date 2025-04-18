interface ISubMenuOptionResponseDTO {
  menuOptionName?: string
  menuOptionKey?: string
  permitAll?: boolean
  permitCreate?: boolean
  permitDelete?: boolean
  permitRestore?: boolean
  permitUpdate?: boolean
  disabled?: boolean
}

interface IMenuOptionResponseDTO {
  menuOptionName?: string
  menuOptionKey?: string
  data?: ISubMenuOptionResponseDTO[]
  permitAll?: boolean
  permitCreate?: boolean
  permitDelete?: boolean
  permitRestore?: boolean
  permitUpdate?: boolean
  disabled?: boolean
}

interface IProfileDTO {
  id?: string
  userGroupId?: string
  name?: string
  menuOptions?: IMenuOptionResponseDTO[]
  disabled?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IProfileDTO }
