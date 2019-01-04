import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Image } from '../images/image.entity'
import { Industry } from '../industries/industry.entity'
import { Sector } from '../sectors/sector.entity'
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100 })
  public name: string

  @Column({ length: 10, nullable: true })
  public ticker: string

  @Column({ length: 2083, nullable: true })
  public website: string

  @ManyToOne(type => Industry, industry => industry.companies)
  public industry: Industry

  @ManyToOne(type => Sector, sector => sector.companies)
  public sector: Sector

  @OneToMany(type => Image, image => image.company)
  public images: Image[]
}
