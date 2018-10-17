'use strict'

const Task = use('Task')
const Site = use('App/Models/Site')
var check = require('../Controllers/Http/check.js')
var moment = require('moment');

class CheckSite extends Task {
  static get schedule () {
    return '0 */5 * * * *'
  }

  async handle () {
    console.log('Handle' + new Date())
    const sites = await Site.query().fetch();
    for (let i = 0; i < sites.rows.length; i++) {
      let info = await check.fetchSite(sites.rows[i].address)

      var site = await Site.find(sites.rows[i].id);
      site.status = info.ok ? 'U': 'D';
      site.last_check = new Date(); 
      // site.last_check = moment().format('YYYY-MM-DD HH:MM:SS');
      // new Date();
      site.save();
    }
  }
}

module.exports = CheckSite