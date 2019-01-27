import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { UpdateCompanyDto } from './UpdateCompanyDto'

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

  @Patch(':id')
  public patchOne(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companiesService.updateOneById(id, updateCompanyDto)
  }
}
