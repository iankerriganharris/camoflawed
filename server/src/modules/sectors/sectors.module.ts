import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Sector } from './sector.entity'
import { SectorsController } from './sectors.controller'
import { SectorsService } from './sectors.service'

@Module({
  controllers: [SectorsController],
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorsService]
})
export class SectorsModule {}
