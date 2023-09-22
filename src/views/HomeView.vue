<template>
  <div class="bg-gray-800 min-h-screen flex flex-col">
    <!-- Header with Search Bar -->
    <header class="bg-blue-800 text-white p-4">
      <div class="container mx-auto">
        <h1 class="text-3xl font-semibold">Search the List</h1>
        <div class="mt-4">
          <input
            type="text"
            v-model="searchQuery"
            @input="search"
            placeholder="Search..."
            class="w-full px-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </header>

    <!-- List Section -->
    <main class="container mx-auto mt-6 p-4">
      <form @submit="onSubmit($event,editDataFlag)">
        <input v-model="models.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required>
        <input v-model="models.description" type="textbox" id="description" class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter description" required>
        <button type="submit" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ editDataFlag?'Update':'Save' }}</button>
        <button type="button" class="mt-5 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800 ml-5" @click="resetForm()">Reset</button>
      </form>

      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-md p-4"
        >
          <!-- Display your list item content here -->
          <div v-if="items.length>0">
            <div class="font-semibold">{{ item.name }}</div>
            <div class="text-gray-600">{{ item.description }}</div>
          </div>
          <button @click="editData(item)" class="text-white bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit </button>
          <button @click="deleteData(item.id)" class="text-white bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-5">Delete </button>

        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import {db} from '../firebase.js'
import {getDocs , collection, addDoc,updateDoc,deleteDoc,doc} from 'firebase/firestore'
export default {
  data() {
    return {
      searchQuery: "",
      items: [ // Replace with your list of items
        // Add more items as needed
      ],
      models:{
        name:'',
        description:''
      },
      editDataFlag:false,
      editDataId:'',
      deleteDataId:''
    };
  },
  computed: {
    filteredItems() {
      // Filter items based on the search query
      let self=this;
      return self.items.filter((item) =>
        item.name.toLowerCase().includes(self.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    search() {
      // Handle search logic here if needed
    },
    async initializeData(){
      let self=this;
      self.items=[];
      let taskCollection=await getDocs(collection(db,'tasks'))
      taskCollection.forEach((task)=>{
        self.items.push({...task.data(),id:task.id})
      })
    },
    async onSubmit(event,editFlag){
      console.log(editFlag)
      let self=this;
      event.preventDefault()
      let data={
        name:self.models.name,
        description:self.models.description
      }
      if(!editFlag){
        await addDoc(collection(db,'tasks'),data).then((res)=>{
            self.models.name='';
            self.models.description='';
            self.initializeData()
        })
      } else{
        // alert()
        await updateDoc(doc(db,'tasks',self.editDataId),data).then((res)=>{
            self.models.name='';
            self.models.description='';
            self.initializeData()
        })
      }
    },
    editData(item){
      let self=this;
      console.log(item)
      self.editDataFlag=true;
      self.editDataId=item.id;
      self.models.name=item.name;
      self.models.description=item.description;
    },
    resetForm(){
      let self=this;
      self.editDataFlag=false;
      self.editDataId='';
      self.models.name='';
      self.models.description='';
    },
    async deleteData(id){
      let self=this;
      await deleteDoc(doc(db,'tasks',id)).then((res)=>{
            self.models.name='';
            self.models.description='';
            self.initializeData()
        })
      }
  },
   mounted(){
    this.initializeData();
  }
};
</script>
