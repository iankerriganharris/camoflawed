import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { IndustriesService } from './industries.service'
import { UpdateIndustryDto } from './UpdateIndustryDto'

@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  public index(@Query('cursor') cursor?: number) {
    return this.industriesService.retrieveSome(cursor)
  }

  @Get(':id')
  public getOne(@Param('id') id: number) {
    return this.industriesService.retrieveById(id)
  }

  @Get(':id/companies')
  public getCompaniesForOne(@Param('id') id: number) {
    return this.industriesService.retrieveCompaniesForId(id)
  }

  @Patch(':id')
  public patchOne(
    @Param('id') id: number,
    @Body() updateIndustryDto: UpdateIndustryDto
  ) {
    return this.industriesService.updateOneById(id, updateIndustryDto)
  }
}
