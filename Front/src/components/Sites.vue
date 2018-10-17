<template>
  <div class="sites">
    <div class="container">
      <h1>Site Test</h1>
      <p>Test the site health</p>
      <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="http://google.com.br" v-model="newSite">
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary btn-block" @click="addSite">Add</button>
        </div>
      </div>
      <div class="row">
        <div v-if="loading"><i class="fa fa-spinner fa-spin"></i></div>
        <div class="table-responsive" v-else>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Site</th>
                <th>Last check</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr :class="site.status == 'U' ? 'up': site.status == 'D' ? 'down' : ''" v-for="site in sites">
                <td>{{site.address}}</td>
                <td>{{site.last_check | intToDate}}</td>
                <td>{{site.status | convertStatus}}</td>
                <td><button class="btn btn-danger btn-sm" @click="deleteSite(site)"><i class="fa fa-trash-alt"></i></button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-100"><span class="float-right">{{interval}}\s to <a href="#" @click="getSites">refresh</a></span></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HelloWorld',
  data () {
    return {
      loading: false,
      sites: [],
      newSite: '',
      interval: 1,
      api: 'https://site-health.herokuapp.com'
    }
  },
  filters: {
     intToDate(date){
      
      return date ? moment(date).locale('pt-br').format('MMMM Do YYYY, h:mm:ss a') : '';
    },
    convertStatus(status){
      switch (status) {
        case 'U':
          return 'Up';
        case 'D':
          return 'Down'
        case 'P':
          return 'Pending'
      }
    }
  },
  mounted(){
    this.getSites();
    setInterval(this.checkIntervalGetSites, 1000);
  },
  methods:{
    clearFields(){
      this.newSite = '';
    },
    checkIntervalGetSites(){
      if (this.interval > 1){
        this.interval--;
        return;
      }

      this.getSites();
    },
    getSites(){
      this.loading = true;
      this.interval = 60;
      this.$http.get(`${this.api}/sites/`).then(res => {
        this.sites = res.data;
        this.loading = false;
      }).catch((error) => console.log(JSON.stringify(error)));
    },
    addSite(){
      this.$http.post(`${this.api}/sites/add`, {address: this.newSite}).then(res => {
        this.clearFields();
        this.getSites();
      }).catch((error) => console.log(JSON.stringify(error)));
    },
    deleteSite(site){
      console.log(site.id)
      this.$http.post(`${this.api}/sites/del`, {id: site.id}).then(res => {
        this.getSites();
      }).catch((error) => console.log(JSON.stringify(error)));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .up{
    color: green;
  }
  .down{
    color: red;
  }
</style>
