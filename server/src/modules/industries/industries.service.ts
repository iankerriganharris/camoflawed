import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Industry } from './industry.entity'

@Injectable()
export class IndustriesService {
  constructor(
    @InjectRepository(Industry)
    private readonly industriesRepository: Repository<Industry>
  ) {}

  /* *
   * async retrieveAll
   * */
  public async retrieveAll() {
    try {
      const industries = await this.industriesRepository.find()
      return { industries, meta: { total: industries.length } }
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
}
