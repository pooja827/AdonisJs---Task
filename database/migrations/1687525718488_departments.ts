import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class departments extends BaseSchema {
  protected tableName = 'departments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('deptid').primary()
      table.string("dept_name")
      table.integer("employee_count")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
