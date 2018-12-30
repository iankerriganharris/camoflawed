import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Company } from '../companies/company.entity'
@Entity()
export class Industry {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 100, unique: true })
  public name: string

  @OneToMany(type => Company, company => company.industry)
  public companies: Company[]
}
