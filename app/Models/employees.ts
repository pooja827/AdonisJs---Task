import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class employees extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public emp_id :string
  @column()
  public emp_name:string
  @column()
  public age: number
  @column()
  public salary:number
  @column()
  public dep_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
