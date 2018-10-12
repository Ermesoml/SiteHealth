const fetch = require('node-fetch')

module.exports = {
  async fetchSite(siteName){
    return await fetch(`${siteName}`)
    .then(res => {
      return res
    })
    .catch(e => {
      return {ok: false}
    });
  }
}