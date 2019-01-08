import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, InsertResult, Repository } from 'typeorm'
import { CreateImageDto } from './CreateImageDto'
import { Image } from './image.entity'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>
  ) {}

  /* *
   * async retrieveAll
   * */
  public async retrieveAll() {
    try {
      const images = await this.imagesRepository.find()
      return { images, meta: { total: images.length } }
    } catch {
      return
    }
  }

  /**
   * async retrieveById
   */
  public async retrieveById(id: number) {
    try {
      const image = await this.imagesRepository.findOne(id)
      return { image }
    } catch {
      return
    }
  }

  /**
   * async createOne
   */
  public async createOne(createImageDto: CreateImageDto): Promise<Image> {
    try {
      const image = await this.imagesRepository.create(createImageDto)
      return this.imagesRepository.save(image)
    } catch {
      return
    }
  }

  /**
   * async createMany
   */
  public async createMany(
    createManyImagesDto: CreateImageDto[]
  ): Promise<any[]> {
    try {
      const insertResult = await this.imagesRepository
        .createQueryBuilder()
        .insert()
        .into(Image)
        .values(createManyImagesDto)
        .returning('id')
        .execute()
      return insertResult.identifiers.map(identifier => identifier.id)
    } catch {
      return
    }
  }
}
