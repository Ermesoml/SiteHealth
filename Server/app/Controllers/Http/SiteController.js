'use strict'

const Site = use('App/Models/Site')
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| Run Scheduler
|--------------------------------------------------------------------------
|
| Run the scheduler on boot of the web sever.
|
*/
const Scheduler = use('Adonis/Addons/Scheduler')
var schedule = require('node-schedule')

class SiteController {
  async setStartScheduler({}){
    Scheduler.run();
    
    return {created: true}
  }

  async getStartedSchedulers({}){
    return {scheduler: schedule.scheduledJobs}
  }

  async setStopSchedule({}){
    let keys = Object.keys(schedule.scheduledJobs);
    for (let i = 0; i < keys.length; i++) {
      schedule.scheduledJobs[keys[i]].cancel();
    }

    return {stopped: true}
  }
  
  async getSites({}){
    try{
      const sites = await Site.query().fetch();
      return sites
    }
    catch(error) {      
      return {}
    }
  }

  async postAddSite({ request }){
    try {
      const data = request.only([
        'address',
      ])

      var site = new Site();
      site.address = data.address;
      site.interval = 1;
      site.status = 'P';
      
      var transacao = await Database.beginTransaction()
      var retorno = await site.save(transacao)
      transacao.commit()
    }
    catch(error){
      console.log('\n')
      console.log(error)
      transacao.rollback()
    }
    return retorno
  }

  async postDeleteSite({ request }){
    try {
      const data = request.only([
        'id'
      ])

      console.log(data.id);
      var site = await Site.find(data.id);
      var retorno = await site.delete();
    }
    catch(error){
      console.log('\n')
      console.log(error)
    }
    return retorno
  }
}

module.exports = SiteController
