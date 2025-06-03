import { IUserRepository } from "@modules/authentication/repositories/i-user-repository"
import { IPedidoRepository } from "@modules/operacao/repositories/i-pedido-repository"
import { IProfileRepository } from "@modules/security/repositories/i-profile-repository"
import { IUserGroupRepository } from "@modules/security/repositories/i-user-group-repository"
import { IUserProfileRepository } from "@modules/security/repositories/i-user-profile-repository"
import { AppError } from "@shared/errors/app-error"
import { HttpResponse, noContent, ok } from "@shared/helpers"
import { hash } from "bcrypt"
import fs from "fs"
import moment from "moment"
import { inject, injectable } from "tsyringe"
import { getConnection } from "typeorm"
import xlsx from "xlsx"
interface IRequest {
  file: Express.Multer.File
}

@injectable()
class ImportPedidosUseCase {
  constructor(
    @inject("PedidoRepository")
    private pedidoRepository: IPedidoRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserGroupRepository")
    private userGroupRepository: IUserGroupRepository,
    @inject("UserProfileRepository")
    private userProfileRepository: IUserProfileRepository,
    @inject("ProfileRepository")
    private profileRepository: IProfileRepository
  ) {}

  async parseExcelData(row: any): Promise<any> {}

  private async parseExcelFile(file: Express.Multer.File): Promise<any[]> {
    return new Promise((resolve) => {
      const fileContent = fs.readFileSync(file.path)
      const workbook = xlsx.read(fileContent, { type: "buffer" })
      const sheetNames = workbook.SheetNames
      const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

      resolve(excelData)
    })
  }

  async execute(request: IRequest): Promise<HttpResponse> {
    const { file } = request
    const queryRunner = getConnection().createQueryRunner()
    await queryRunner.startTransaction()

    try {
      const rows = await this.parseExcelFile(file)
      for await (const row of rows) {
        console.log(row)
      }

      fs.unlinkSync(file.path)
      await queryRunner.commitTransaction()
      return noContent()
    } catch (error) {
      fs.unlinkSync(file.path)
      await queryRunner.rollbackTransaction()
      return error
    } finally {
      await queryRunner.release()
    }
  }
}

export { ImportPedidosUseCase }
