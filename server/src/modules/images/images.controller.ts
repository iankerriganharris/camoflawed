import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateImageDto } from './CreateImageDto'
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

  @Post()
  public postOne(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.createOne(createImageDto)
  }
}
