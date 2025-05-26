import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { LocalidadesModule } from "./localidades/localidades.module"
import { EmpresasModule } from "./empresas/empresas.module"
import { VendedoresModule } from "./vendedores/vendedores.module"
import { ComissionadosModule } from "./comissionados/comissionados.module"
import { CompradoresModule } from "./compradores/compradores.module"
import { ProdutosModule } from "./produtos/produtos.module"
import { OfertasModule } from "./ofertas/ofertas.module"
import { DemandasModule } from "./demandas/demandas.module"
import { FechamentosModule } from "./fechamentos/fechamentos.module"
import { FunruraisModule } from "./funrurais/funrurais.module"
import { FretesModule } from "./fretes/fretes.module"
import { CalculadoraModule } from "./calculadora/calculadora.module"
import { GruposModule } from "./grupos/grupos.module"
import { User } from "./users/entities/user.entity"
import { Cidade } from "./localidades/entities/cidade.entity"
import { Estado } from "./localidades/entities/estado.entity"
import { Pais } from "./localidades/entities/pais.entity"
import { Grupo } from "./users/entities/grupo.entity"
import { Empresa } from "./empresas/entities/empresa.entity"
import { Vendedor } from "./vendedores/entities/vendedor.entity"
import { Comprador } from "./compradores/entities/comprador.entity"
import { Demanda } from "./demandas/entities/demanda.entity"
import { Produto } from "./produtos/entities/produto.entity"
import { Fechamento } from "./fechamentos/entities/fechamento.entity"
import { Transportadora } from "./transportadoras/entities/transportadora.entity"
import { Oferta } from "./ofertas/entities/oferta.entity";
import { Frete } from "./fretes/entities/frete.entity";
import { TipoFrete } from "./produtos/entities/tipo-frete.entity";
import { Funrural } from "./funrurais/entities/funrural.entity";
import { Comissionado } from "./comissionados/entities/comissionado.entity";
import { Motorista } from "./motoristas/entities/motorista.entity";
import { Veiculo } from "./veiculos/entities/veiculo.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: null,
      database: "sorgrao",
      ssl: false,
      autoLoadEntities: false,
      synchronize: true,
      logging: true,
      entities: [User, Cidade, Estado, Pais, Grupo, Empresa, Vendedor, Comprador, Demanda, Produto, Fechamento, Transportadora, Oferta, Frete, TipoFrete, Funrural, Comissionado, Motorista, Veiculo],
    }),
    AuthModule,
    UsersModule,
    LocalidadesModule,
    EmpresasModule,
    VendedoresModule,
    ComissionadosModule,
    CompradoresModule,
    GruposModule,
    ProdutosModule,
    OfertasModule,
    DemandasModule,
    FechamentosModule,
    FunruraisModule,
    FretesModule,
    CalculadoraModule,
  ],
})
export class AppModule { }
