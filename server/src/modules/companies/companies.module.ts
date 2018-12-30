import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { Company } from './company.entity'

@Module({
  controllers: [CompaniesController],
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService]
})
export class CompaniesModule {}
