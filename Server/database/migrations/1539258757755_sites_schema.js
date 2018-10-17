'use strict'

const Schema = use('Schema')

class SitesSchema extends Schema {
  up () {
    this.create('sites', (table) => {
      table.increments()
      table.string('address', 255).notNullable()
      table.integer('interval').unsigned().notNullable()
      table.datetime('last_check')
      table.string('status', 1).default('U')
      table.timestamps()
    })
  }

  down () {
    this.drop('sites')
  }
}

module.exports = SitesSchema
