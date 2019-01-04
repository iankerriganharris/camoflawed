import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './image.entity'
import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'

@Module({
  controllers: [ImagesController],
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService]
})
export class ImagesModule {}
