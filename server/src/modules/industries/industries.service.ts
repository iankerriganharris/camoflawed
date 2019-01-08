import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { ImagesService } from '../images/images.service'
import { Industry } from './industry.entity'
import { UpdateIndustryDto } from './UpdateIndustryDto'

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private readonly industriesRepository: Repository<Industry>,
    @Inject(ImagesService)
    private readonly imagesService: ImagesService
  ) {}

  /* *
   * async retrieveAll
   * */
  public async retrieveAll() {
    try {
      const industries = await this.industriesRepository
        .createQueryBuilder('industry')
        .leftJoinAndMapOne('industry.primaryImage', 'industry.images', 'image')
        .getMany()

      const counts = await this.industriesRepository
        .createQueryBuilder('industry')
        .leftJoin('industry.companies', 'companies')
        .leftJoin('industry.images', 'images')
        .select('industry.id', 'id')
        .addSelect('COUNT(DISTINCT(companies.id))::integer as companies') // ::integer ensures the count will be returned as an integer rather than a string.
        .addSelect('COUNT(DISTINCT(images.id))::integer as images')
        .groupBy('industry.id')
        .getRawMany()

      return {
        industries: [
          ...industries.map((industry, i) => ({ ...industry, ...counts[i] }))
        ],
        meta: { total: industries.length }
      }
    } catch {
      return
    }
  }

  /**
   * async retrieveSome
   */
  public async retrieveSome(cursor?: number) {
    try {
      const takeNumber = 20

      const industriesWithTotalCount = await this.industriesRepository
        .createQueryBuilder('industry')
        .leftJoinAndMapOne('industry.primaryImage', 'industry.images', 'image')
        .skip(cursor ? cursor : 0)
        .take(takeNumber)
        .orderBy('industry.id')
        .getManyAndCount()

      const industries = industriesWithTotalCount[0]
      const totalCount = industriesWithTotalCount[1]
      const totalReturned = industries.length

      const counts =
        totalReturned > 0
          ? await this.industriesRepository
              .createQueryBuilder('industry')
              .leftJoin('industry.companies', 'companies')
              .leftJoin('industry.images', 'images')
              .select('industry.id', 'id')
              .addSelect('COUNT(DISTINCT(companies.id))::integer as companies') // ::integer ensures the count will be returned as an integer rather than a string.
              .addSelect('COUNT(DISTINCT(images.id))::integer as images')
              .groupBy('industry.id')
              .whereInIds(industries)
              .getRawMany()
          : []

      return {
        industries: [
          ...industries.map((industry, i) => ({ ...industry, ...counts[i] }))
        ],
        meta: { total: totalCount },
        nextCursor:
          totalReturned === takeNumber ? industries[totalReturned - 1].id : 0
      }
    } catch {
      return
    }
  }

  /**
   * async retrieveById
   */
  public async retrieveById(id: number) {
    try {
      const industry = await this.industriesRepository.findOne(id)
      return { industry }
    } catch {
      return
    }
  }

  /**
   * async retrieveCompaniesForId
   */
  public async retrieveCompaniesForId(id: number) {
    try {
      const industry = await this.industriesRepository
        .createQueryBuilder('industry')
        .where({ id })
        .leftJoinAndSelect('industry.companies', 'companies')
        .orderBy('companies', 'ASC')
        .getOne()
      return { industry }
    } catch {
      return
    }
  }

  /**
   * async updateOneById
   */
  public async updateOneById(id: number, updateIndustryDto: UpdateIndustryDto) {
    try {
      const { images } = updateIndustryDto
      const imageIds =
        images && images.length
          ? await this.imagesService.createMany(images)
          : []
      await this.industriesRepository
        .createQueryBuilder('industries')
        .relation(Industry, 'images')
        .of(id)
        .add(imageIds)
      return await this.retrieveById(id)
    } catch {
      return
    }
  }
}
