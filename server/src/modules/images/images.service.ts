import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
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
}
