import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Company } from './company.entity'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>
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
        .getOne()
      return { company }
    } catch {
      return
    }
  }
}
