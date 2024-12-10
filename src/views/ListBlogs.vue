<template>
  <div class="container wrapper-page">
    <!-- form search -->
    <div class="row align-items-center py-2 px-1">
      <div class="col-md-3">
        <input
          type="text"
          class="form-control my-1"
          placeholder="Search blogs"
          v-model="searchQuery"
          @keyup.enter="onSearch"
        />
      </div>
      <div class="col-md-3">
        <select class="form-control my-1" v-model="sortOrder">
          <option value="desc">Sort Descending</option>
          <option value="asc">Sort Ascending</option>
        </select>
      </div>
       <div class="col-md-3">
        <select class="form-control my-1" v-model="sortBy">
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>

        </select>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-primary" @click="onSearch">Search</button>
        <button type="button" class="btn btn-outline-success mx-1" @click="clearData">Reset</button>
      </div>
    </div>
     <!-- BLOGS -->
    <div class="container">
      <div class="dropdown py-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Action
      </button>
      <ul class="dropdown-menu">
        <li>
          <router-link class="dropdown-item" to="/new">Create</router-link>
        </li>
      </ul>
    </div>
    <ul class="list-unstyled">
         <BlogItem
            v-for="(item, index) in dataList"
            :key="index"
            :item="item"
            :index="index"
            :loading="loading"
            @chose-item="choseItem"
          />
      </ul>
    <Pagination 
      :pagination="pagina"
      v-model:currentPage="currentPage" 
      class="py-2"
     />
     </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch} from 'vue'
import Pagination from '../components/Pagination.vue'
import APIBlogs from '../services/api'
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { LoadingStore } from '../stores/loading'
import BlogItem from '../components/BlogItem.vue' 

const globalDataStore = LoadingStore()
const searchQuery = ref('')
const sortOrder = ref('desc')
const sortBy = ref('created_at')
const currentPage = ref(1)
const dataList = ref([])
const pagina = ref({})
const perPage = ref(10)
const paramsSort = ref('')
const dataDetail = ref({})
const router = useRouter();

  onMounted(() => {
      getListBlogs(1);
  });

   watch(currentPage, (newVal, oldVal) => {
      getListBlogs(currentPage.value)

  });

  const loading = computed(() => globalDataStore.$state.isLoading);

  const onSearch = () => {
    getListBlogs()
  };
  const clearData = () => {
    sortBy.value = "created_at";
    sortOrder.value = "desc";
    searchQuery.value = "";

    getListBlogs()
  };
 
  const getListBlogs = (page = 1) => {
    currentPage.value = page
    globalDataStore.load('getListBlogs') // Start loading

    let params = `?page=${currentPage.value}&offset=${perPage.value}&search=${searchQuery.value}&sort_direction=${sortOrder.value}&sort_by=${sortBy.value}`;
      axios.get(APIBlogs.getList(params)).then((response) => {
        dataList.value = response['data'].data.items;
        dataList.value.forEach((item, i) => {
          item.active = false
        })
        pagina.value = response['data'].pagination
        })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
      globalDataStore.unload('getListBlogs') // Stop loading
    })
  };

  const choseItem = (item, index) => {
    item.active = true
     router.push(`/${item.id}`);
  }

</script>

<style scoped>

.wrapper-page {
  	width: 100%;
    max-width: 768px;
    border-radius: 8px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0, 0.1);
    background-color: #f5f5f5;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    font-size: 1.125rem;
}


</style>