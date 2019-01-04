import { Controller, Get, Param } from '@nestjs/common'
import { ImagesService } from './images.service'

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  public index() {
    return this.imagesService.retrieveAll()
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.imagesService.retrieveById(id)
  }
}
