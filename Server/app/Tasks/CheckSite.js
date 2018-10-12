'use strict'

const Task = use('Task')
const Site = use('App/Models/Site')
var check = require('../Controllers/Http/check.js')

class CheckSite extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    const sites = await Site.query().fetch();
    for (let i = 0; i < sites.rows.length; i++) {
      let info = await check.fetchSite(sites.rows[i].address)

      var site = await Site.find(sites.rows[i].id);
      site.status = info.ok ? 'U': 'D'; 
      site.last_check = Date.now();
      site.save();
    }
  }
}

module.exports = CheckSite
