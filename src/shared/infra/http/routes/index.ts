import { Router } from "express"
import { authenticateRoutes } from "./authentication/authenticate-routes"
import { userGroupsRoutes } from "./security/user-groups-routes"
import { blockReasonsRoutes } from "./security/block-reasons-routes"
import { usersRoutes } from "./authentication/users-routes"
import { tfaRoutes } from "./authentication/tfa-routes"
import { usersSecurityRoutes } from "./security/users-security-routes"
import { passwordsRoutes } from "./authentication/passwords-routes"
import { modulesRoutes } from "./security/modules-routes"
import { menuOptionsRoutes } from "./security/menu-options-routes"
import { profilesRoutes } from "./security/profiles-routes"
import { profileOptionsRoutes } from "./security/profile-options-routes"
import { usersProfilesRoutes } from "./security/users-profiles-routes"
import { navigationsRoutes } from "./security/navigations-routes"
import { configsRoutes } from "./security/configs-routes"
import { filtersRoutes } from "./security/filters-routes"
import { paisesRoutes } from "./comum/paises-routes"
import { estadosRoutes } from "./comum/estados-routes"
import { cidadesRoutes } from "./comum/cidades-routes"
import { cepsRoutes } from "./comum/ceps-routes"
import { funcionariosRoutes } from "./configuracao/funcionarios-routes"
import { clientesRoutes } from "./configuracao/clientes-routes"
import { padroesCoresRoutes } from "./configuracao/padroes-cores-routes"
import { tiposEnchimentoRoutes } from "./configuracao/tipos-enchimento-routes"
import { sentidosAberturaRoutes } from "./configuracao/sentidos-abertura-routes"
import { tiposPortaRoutes } from "./configuracao/tipos-porta-routes"
import { fechadurasRoutes } from "./configuracao/fechaduras-routes"
import { alizaresRoutes } from "./configuracao/alizares-routes"
import { largurasVaosRoutes } from "./configuracao/larguras-vaos-routes"
import { alturasVaosRoutes } from "./configuracao/alturas-vaos-routes"
import { statusNegociacoesRoutes } from "./configuracao/status-negociacoes-routes"
import { pedidosRoutes } from "./operacao/pedidos-routes"
import { pedidosItemsRoutes } from "./operacao/pedidos-items-routes"
import { pacotesRoutes } from "./operacao/pacotes-routes"
import { pacotesItemsRoutes } from "./operacao/pacotes-items-routes"
import { cadastroObrasRoutes } from "./operacao/cadastro-obras-routes"
import { medicoesRoutes } from "./operacao/medicoes-routes"
import { negociacoesRoutes } from "./operacao/negociacoes-routes"
import { produtoRoutes } from "./configuracao/produtos-routes"

const router = Router()

router.use(authenticateRoutes)
router.use("/block-reasons", blockReasonsRoutes)
router.use("/user-groups", userGroupsRoutes)
router.use("/users", usersRoutes)
router.use("/tfa", tfaRoutes)
router.use("/users-security", usersSecurityRoutes)
router.use("/passwords", passwordsRoutes)
router.use("/modules", modulesRoutes)
router.use("/menu-options", menuOptionsRoutes)
router.use("/profiles", profilesRoutes)
router.use("/profile-options", profileOptionsRoutes)
router.use("/users-profiles", usersProfilesRoutes)
router.use("/navigations", navigationsRoutes)
router.use("/configs", configsRoutes)
router.use("/filters", filtersRoutes)
router.use("/paises", paisesRoutes)
router.use("/estados", estadosRoutes)
router.use("/cidades", cidadesRoutes)
router.use("/ceps", cepsRoutes)
router.use("/funcionarios", funcionariosRoutes)
router.use("/clientes", clientesRoutes)
router.use("/padroes-cores", padroesCoresRoutes)
router.use("/tipos-enchimento", tiposEnchimentoRoutes)
router.use("/sentidos-abertura", sentidosAberturaRoutes)
router.use("/tipos-porta", tiposPortaRoutes)
router.use("/fechaduras", fechadurasRoutes)
router.use("/alizares", alizaresRoutes)
router.use("/larguras-vaos", largurasVaosRoutes)
router.use("/alturas-vaos", alturasVaosRoutes)
router.use("/status-negociacoes", statusNegociacoesRoutes)
router.use("/pedidos", pedidosRoutes)
router.use("/pedidos-items", pedidosItemsRoutes)
router.use("/pacotes", pacotesRoutes)
router.use("/pacotes-items", pacotesItemsRoutes)
router.use("/cadastro-obras", cadastroObrasRoutes)
router.use("/medicoes", medicoesRoutes)
router.use("/negociacoes", negociacoesRoutes)
router.use("/produtos", produtoRoutes)

export { router }
