import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './common'
import { CompaniesModule } from './companies/companies.module'
import { ImagesModule } from './images/images.module'
import { IndustriesModule } from './industries/industries.module'
import { SectorsModule } from './sectors/sectors.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: ['./**/*.entity{.ts,.js}'],
      synchronize: true,
      type: 'postgres'
    }),
    CompaniesModule,
    IndustriesModule,
    SectorsModule,
    ImagesModule
  ]
})
export class AppModule {}
