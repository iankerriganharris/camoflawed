import { Controller, Get, Param } from '@nestjs/common'
import { IndustriesService } from './industries.service'

@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  public index() {
    return this.industriesService.retrieveAll()
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.industriesService.retrieveById(id)
  }

  @Get(':id/companies')
  public getCompaniesForOne(@Param('id') id: number) {
    return this.industriesService.retrieveCompaniesForId(id)
  }
}
