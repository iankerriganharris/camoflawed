import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Sector } from './sector.entity'

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorsRepository: Repository<Sector>
  ) {}

  /* *
   * async retrieveAll
   * */
  public async retrieveAll() {
    try {
      const sectors = await this.sectorsRepository.find()
      return { sectors, meta: { total: sectors.length } }
    } catch {
      return
    }
  }

  /**
   * async retrieveById
   */
  public async retrieveById(id: number) {
    try {
      const sector = await this.sectorsRepository.findOne(id)
      return { sector }
    } catch {
      return
    }
  }

  /**
   * async retrieveCompaniesForId
   */
  public async retrieveCompaniesForId(id: number) {
    try {
      const sector = await this.sectorsRepository
        .createQueryBuilder('sector')
        .where({ id })
        .leftJoinAndSelect('sector.companies', 'companies')
        .orderBy('companies', 'ASC')
        .getOne()
      return { sector }
    } catch {
      return
    }
  }
}
