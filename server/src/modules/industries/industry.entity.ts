import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Company } from '../companies/company.entity'
import { Image } from '../images/image.entity'
@Entity()
export class Industry {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100, unique: true })
  public name: string

  @OneToMany(type => Company, company => company.industry)
  public companies: Company[]

  @OneToMany(type => Image, image => image.industry)
  public images: Image[]

  public primaryImage?: Image
}
