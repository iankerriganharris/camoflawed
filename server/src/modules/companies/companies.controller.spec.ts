import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from '../companies/company.entity'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

describe('CompaniesController', () => {
  let companiesController: CompaniesController
  let companiesService: CompaniesService

  const findResult = {
    companies: [{ id: 1, name: 'fake' }],
    meta: { total: 1 }
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            find: () => findResult
          }
        }
      ]
    }).compile()

    companiesController = module.get<CompaniesController>(CompaniesController)
    companiesService = module.get<CompaniesService>(CompaniesService)
  })

  describe('index', () => {
    it('should return an object containing an array of companies', async () => {
      jest
        .spyOn(companiesService, 'retrieveAll')
        .mockImplementation(() => findResult)
      expect(await companiesController.index()).toBe(findResult)
    })
  })
})
