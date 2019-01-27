import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ImagesService } from '../images/images.service'
import { Company } from './company.entity'
import { UpdateCompanyDto } from './UpdateCompanyDto'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    @Inject(ImagesService)
    private readonly imagesService: ImagesService
  ) {}

  /* *
   * async retrieveAll
   * */
  public async retrieveAll(limit?: number) {
    try {
      const companies = await this.companiesRepository
        .createQueryBuilder('company')
        .limit(limit)
        .getMany()
      return { companies, meta: { total: companies.length } }
    } catch {
      return
    }
  }

  /**
   * async retrieveById
   */
  public async retrieveById(id: number) {
    try {
      const company = await this.companiesRepository
        .createQueryBuilder('company')
        .where({ id })
        .leftJoinAndSelect('company.industry', 'industry')
        .leftJoinAndSelect('company.sector', 'sector')
        .leftJoinAndSelect('company.images', 'images')
        .getOne()
      return { ...company }
    } catch {
      return
    }
  }

  /**
   * async updateOneById
   */
  public async updateOneById(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const { images } = updateCompanyDto
      const imageIds =
        images && images.length
          ? await this.imagesService.createMany(images)
          : []
      await this.companiesRepository
        .createQueryBuilder('companies')
        .relation(Company, 'images')
        .of(id)
        .add(imageIds)
      return await this.retrieveById(id)
    } catch {
      return
    }
  }
}
