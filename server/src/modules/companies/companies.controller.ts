import { Controller, Get, Param, Query } from '@nestjs/common'
import { CompaniesService } from './companies.service'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  public index(@Query('limit') limit?: number) {
    return this.companiesService.retrieveAll(limit)
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.companiesService.retrieveById(id)
  }
}
