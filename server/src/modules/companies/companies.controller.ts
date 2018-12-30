import { Controller, Get, Param } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  public index() {
    return this.companiesService.retrieveAll()
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.companiesService.retrieveById(id)
  }
}
