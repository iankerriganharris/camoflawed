import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImagesModule } from '../images/images.module'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { Company } from './company.entity'

@Module({
  controllers: [CompaniesController],
  imports: [TypeOrmModule.forFeature([Company]), ImagesModule],
  providers: [CompaniesService]
})
export class CompaniesModule {}
