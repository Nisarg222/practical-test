<template>
  <div>
    <b-container>
        <div id="search-bar">
            <b-form-group
                label=""
                label-for="search-user"
                class="mb-0"
            >
                <b-form-input
                    id="search-user"
                    v-model="searchUser"
                    placeholder="Search User"
                    class="rounded"    
                ></b-form-input>
            </b-form-group>
        </div>

        <div id='grid-search-view'>
            
        </div>

        <b-table striped hover :items="users" :fields="fields" class="mt-5" :per-page="perPage" :current-page="currentPage" :filter="searchUser">
            <template slot="cell(avatar)" slot-scope="{item}">
                <b-img :src='item.picture.medium' style="width:50px;height:50px"></b-img>
            </template>

            <template slot="cell(name)" slot-scope="{item}">
                <p> {{item.name.first+' '+item.name.last}} </p>
            </template>

            <template slot="cell(city)" slot-scope="{item}">
                <p> {{item.location.city}} </p>
            </template>

            <template slot="cell(state)" slot-scope="{item}">
                <p> {{item.location.state}} </p>
            </template>
            
        </b-table>

        <div>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" :current-page="currentPage" class="justify-content-center align-items-center">

            </b-pagination>
        </div>
    </b-container>

  </div>
</template>

<script>
export default {
  name: 'user-list',
  data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['Id','avatar', 'name', 'email','phone','city','state'],
        items: [],
        searchUser:"",
        currentPage: 1,
        perPage:10
      }
  }, 
  computed:{
    rows(){
        return this.users.length
    }
  },
  props:{
    users:{
        type:[Array,Object],
        default:''
    }
  },
  mounted(){
    let self=this;
    console.log(self.users)
  }
}
</script>
<style scoped>
#search-bar{
    width:20%;
    margin-left: auto; 
    margin-right: 0
}

#grid-search-view{
    width:20%;
    margin-left: auto; 
    margin-right: 0
}
</style>