import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Company } from '../companies/company.entity'
@Entity()
export class Sector {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100, unique: true })
  public name: string

  @OneToMany(type => Company, company => company.sector)
  public companies: Company[]
}
