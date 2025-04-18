import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { UserSecurityRepository } from '@modules/security/infra/typeorm/repositories/user-security-repository'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import { UserTokenRepository } from '@modules/authentication/infra/typeorm/repositories/user-token-repository'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReasonRepository } from '@modules/security/infra/typeorm/repositories/block-reason-repository'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroupRepository } from '@modules/security/infra/typeorm/repositories/user-group-repository'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { ModuleRepository } from '@modules/security/infra/typeorm/repositories/module-repository'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { ProfileRepository } from '@modules/security/infra/typeorm/repositories/profile-repository'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { MenuOptionRepository } from '@modules/security/infra/typeorm/repositories/menu-option-repository'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { NavigationRepository } from '@modules/security/infra/typeorm/repositories/navigation-repository'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfileRepository } from '@modules/security/infra/typeorm/repositories/user-profile-repository'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOptionRepository } from '@modules/security/infra/typeorm/repositories/profile-option-repository'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { ConfigRepository } from '@modules/security/infra/typeorm/repositories/config-repository'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { FilterRepository } from '@modules/security/infra/typeorm/repositories/filter-repository'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { PaisRepository } from '@modules/comum/infra/typeorm/repositories/pais-repository'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { EstadoRepository } from '@modules/comum/infra/typeorm/repositories/estado-repository'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { CidadeRepository } from '@modules/comum/infra/typeorm/repositories/cidade-repository'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { CepRepository } from '@modules/comum/infra/typeorm/repositories/cep-repository'
import { IFuncionarioRepository } from '@modules/configuracao/repositories/i-funcionario-repository'
import { FuncionarioRepository } from '@modules/configuracao/infra/typeorm/repositories/funcionario-repository'
import { IClienteRepository } from '@modules/configuracao/repositories/i-cliente-repository'
import { ClienteRepository } from '@modules/configuracao/infra/typeorm/repositories/cliente-repository'
import { IPadraoCorRepository } from '@modules/configuracao/repositories/i-padrao-cor-repository'
import { PadraoCorRepository } from '@modules/configuracao/infra/typeorm/repositories/padrao-cor-repository'
import { ITipoEnchimentoRepository } from '@modules/configuracao/repositories/i-tipo-enchimento-repository'
import { TipoEnchimentoRepository } from '@modules/configuracao/infra/typeorm/repositories/tipo-enchimento-repository'
import { ISentidoAberturaRepository } from '@modules/configuracao/repositories/i-sentido-abertura-repository'
import { SentidoAberturaRepository } from '@modules/configuracao/infra/typeorm/repositories/sentido-abertura-repository'
import { ITipoPortaRepository } from '@modules/configuracao/repositories/i-tipo-porta-repository'
import { TipoPortaRepository } from '@modules/configuracao/infra/typeorm/repositories/tipo-porta-repository'
import { IFechaduraRepository } from '@modules/configuracao/repositories/i-fechadura-repository'
import { FechaduraRepository } from '@modules/configuracao/infra/typeorm/repositories/fechadura-repository'
import { IAlizarRepository } from '@modules/configuracao/repositories/i-alizar-repository'
import { AlizarRepository } from '@modules/configuracao/infra/typeorm/repositories/alizar-repository'
import { ILarguraVaosRepository } from '@modules/configuracao/repositories/i-largura-vaos-repository'
import { LarguraVaosRepository } from '@modules/configuracao/infra/typeorm/repositories/largura-vaos-repository'
import { IAlturaVaosRepository } from '@modules/configuracao/repositories/i-altura-vaos-repository'
import { AlturaVaosRepository } from '@modules/configuracao/infra/typeorm/repositories/altura-vaos-repository'
import { IStatusNegociacaoRepository } from '@modules/configuracao/repositories/i-status-negociacao-repository'
import { StatusNegociacaoRepository } from '@modules/configuracao/infra/typeorm/repositories/status-negociacao-repository'
import { IPedidoRepository } from '@modules/operacao/repositories/i-pedido-repository'
import { PedidoRepository } from '@modules/operacao/infra/typeorm/repositories/pedido-repository'
import { IPedidoItemRepository } from '@modules/operacao/repositories/i-pedido-item-repository'
import { PedidoItemRepository } from '@modules/operacao/infra/typeorm/repositories/pedido-item-repository'
import { IPacoteRepository } from '@modules/operacao/repositories/i-pacote-repository'
import { PacoteRepository } from '@modules/operacao/infra/typeorm/repositories/pacote-repository'
import { IPacoteItemRepository } from '@modules/operacao/repositories/i-pacote-item-repository'
import { PacoteItemRepository } from '@modules/operacao/infra/typeorm/repositories/pacote-item-repository'
import { ICadastroObraRepository } from '@modules/operacao/repositories/i-cadastro-obra-repository'
import { CadastroObraRepository } from '@modules/operacao/infra/typeorm/repositories/cadastro-obra-repository'
import { IMedicaoRepository } from '@modules/operacao/repositories/i-medicao-repository'
import { MedicaoRepository } from '@modules/operacao/infra/typeorm/repositories/medicao-repository'
import { INegociacaoRepository } from '@modules/operacao/repositories/i-negociacao-repository'
import { NegociacaoRepository } from '@modules/operacao/infra/typeorm/repositories/negociacao-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserSecurityRepository>('UserSecurityRepository', UserSecurityRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IBlockReasonRepository>('BlockReasonRepository', BlockReasonRepository)
container.registerSingleton<IUserGroupRepository>('UserGroupRepository', UserGroupRepository)
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository)
container.registerSingleton<IProfileRepository>('ProfileRepository', ProfileRepository)
container.registerSingleton<IMenuOptionRepository>('MenuOptionRepository', MenuOptionRepository)
container.registerSingleton<INavigationRepository>('NavigationRepository', NavigationRepository)
container.registerSingleton<IUserProfileRepository>('UserProfileRepository', UserProfileRepository)
container.registerSingleton<IProfileOptionRepository>('ProfileOptionRepository', ProfileOptionRepository)
container.registerSingleton<IConfigRepository>('ConfigRepository', ConfigRepository)
container.registerSingleton<IFilterRepository>('FilterRepository', FilterRepository)
container.registerSingleton<IPaisRepository>('PaisRepository', PaisRepository)
container.registerSingleton<IEstadoRepository>('EstadoRepository', EstadoRepository)
container.registerSingleton<ICidadeRepository>('CidadeRepository', CidadeRepository)
container.registerSingleton<ICepRepository>('CepRepository', CepRepository)
container.registerSingleton<IFuncionarioRepository>('FuncionarioRepository', FuncionarioRepository)
container.registerSingleton<IClienteRepository>('ClienteRepository', ClienteRepository)
container.registerSingleton<IPadraoCorRepository>('PadraoCorRepository', PadraoCorRepository)
container.registerSingleton<ITipoEnchimentoRepository>('TipoEnchimentoRepository', TipoEnchimentoRepository)
container.registerSingleton<ISentidoAberturaRepository>('SentidoAberturaRepository', SentidoAberturaRepository)
container.registerSingleton<ITipoPortaRepository>('TipoPortaRepository', TipoPortaRepository)
container.registerSingleton<IFechaduraRepository>('FechaduraRepository', FechaduraRepository)
container.registerSingleton<IAlizarRepository>('AlizarRepository', AlizarRepository)
container.registerSingleton<ILarguraVaosRepository>('LarguraVaosRepository', LarguraVaosRepository)
container.registerSingleton<IAlturaVaosRepository>('AlturaVaosRepository', AlturaVaosRepository)
container.registerSingleton<IStatusNegociacaoRepository>('StatusNegociacaoRepository', StatusNegociacaoRepository)
container.registerSingleton<IPedidoRepository>('PedidoRepository', PedidoRepository)
container.registerSingleton<IPedidoItemRepository>('PedidoItemRepository', PedidoItemRepository)
container.registerSingleton<IPacoteRepository>('PacoteRepository', PacoteRepository)
container.registerSingleton<IPacoteItemRepository>('PacoteItemRepository', PacoteItemRepository)
container.registerSingleton<ICadastroObraRepository>('CadastroObraRepository', CadastroObraRepository)
container.registerSingleton<IMedicaoRepository>('MedicaoRepository', MedicaoRepository)
container.registerSingleton<INegociacaoRepository>('NegociacaoRepository', NegociacaoRepository)
