<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ListBlogs from './views/ListBlogs.vue'
import Loading from './components/Loading.vue'
import { ref, computed, watch, onMounted } from 'vue';
import debounce from 'lodash/debounce';
import { LoadingStore } from './stores/loading';


const globalDataStore = LoadingStore();

const loading = computed(() => globalDataStore.$state.isLoading);


</script>

<template>
<header class="header-outer">
	<div class="header-inner responsive-wrapper">
		<nav class="header-navigation">
			<p style="color:#fff;">Demo List Blogs</p>
		</nav>
	</div>
  </header>
  	<Loading v-if="loading" />
    <RouterView />
</template>

