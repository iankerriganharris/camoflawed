import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImagesModule } from '../images/images.module'
import { IndustriesController } from './industries.controller'
import { IndustriesService } from './industries.service'
import { Industry } from './industry.entity'

@Module({
  controllers: [IndustriesController],
  imports: [TypeOrmModule.forFeature([Industry]), ImagesModule],
  providers: [IndustriesService]
})
export class IndustriesModule {}
