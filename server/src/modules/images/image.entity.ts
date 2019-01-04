import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Company } from '../companies/company.entity'

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ length: 2083, nullable: true })
  public originalUrl: string

  @Column({ type: 'timestamp', nullable: true })
  public dateStored: Date

  @Column({ length: 255, nullable: true })
  public storageBucket: string

  @Column({ length: 255, nullable: true })
  public storageKey: string

  @Column({ length: 255, nullable: true })
  public storagePrefix: string

  @Column({ length: 100, nullable: true })
  public storageProvider: string

  @Column({ length: 2083, nullable: true })
  public storageUrl: string

  @ManyToOne(type => Company, company => company.images)
  public company: Company
}
