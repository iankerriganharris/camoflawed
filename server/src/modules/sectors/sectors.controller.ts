import { Controller, Get, Param } from '@nestjs/common'
import { SectorsService } from './sectors.service'

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get()
  public index() {
    return this.sectorsService.retrieveAll()
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.sectorsService.retrieveById(id)
  }

  @Get(':id/companies')
  public getCompaniesForOne(@Param('id') id: number) {
    return this.sectorsService.retrieveCompaniesForId(id)
  }
}
