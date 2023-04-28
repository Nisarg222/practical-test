<template>
  <div class="home">
    <template v-if="apiFlag">
        <user-list :users='userList'/>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import  axios from 'axios'
import List from '@/components/List.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    'user-list':List
  },
  data(){
    return{
        userList:[],
        apiFlag:false    
    }
  },
  created(){
    let self=this;
    var id=1;
    axios.get('https://randomuser.me/api/?results=100').then((response)=>{
        if(response.status==200 || response.status==201){
            self.userList=response.data.results;
            self.userList.map((data,index)=>{
                data.Id=id++;
            });
            self.apiFlag=true
        } else {
            console.log("User load error")
        }
    })
  }

}
</script>
