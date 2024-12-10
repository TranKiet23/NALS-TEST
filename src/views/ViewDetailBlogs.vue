<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ isEditing ? 'Edit Blog' : 'Blog Detail' }}</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Title Field -->
      <div class="mb-3">
        <label for="title" class="form-label">Title<span class="text-danger">(*)</span></label>
        <input
          type="text"
          id="title"
          class="form-control"
          :class="{ 'is-invalid': errors.title }"
          v-model="form.title"
          @input="validateFieldTitle('title')"
          placeholder="Enter the title"
          :disabled="!isEditing"
        />
        <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
      </div>

      <!-- Content Field -->
      <div class="mb-3">
        <label for="content" class="form-label">Content <span class="text-danger">(*)</span></label>
        <textarea
          id="content"
          class="form-control"
          :class="{ 'is-invalid': errors.content }"
          v-model="form.content"
          @input="validateFieldContent('content')"
          placeholder="Enter the content"
          rows="4"
          :disabled="!isEditing"
        ></textarea>
        <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
      </div>

      <!-- Image Field -->
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          v-if="isEditing"
          type="file"
          id="image"
          class="form-control"
          @change="handleImageUpload"
          accept="image/*"
        />
        <img 
          v-if="form.image.url" 
          :src="form.image.url" 
          class="mt-2" 
          style="max-width: 200px;" 
        />
      </div>

      <div class="pt-5">
        <button 
          v-if="!isEditing" 
          type="button" 
          class="btn btn-primary"
          @click="isEditing = true"
        >
          Edit
        </button>
        <template v-else>
          <button type="submit" class="btn btn-success">Save</button>
          <button 
            type="button" 
            class="btn btn-secondary mx-2" 
            @click="cancelEdit"
          >
            Cancel
          </button>
        </template>
        <button type="button" class="btn btn-warning mx-2" @click="router.back()">Back</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import APIBlogs from '../services/api'
import axios from 'axios';
import { LoadingStore } from '../stores/loading'


const globalDataStore = LoadingStore()
const isEditing = ref(false);
const originalForm = ref(null);
const router = useRouter();
const route = useRoute(); 
const form = reactive({
  title: '',
  content: '',
  id: '',
  image: {
    url: ''
  },
});

const errors = reactive({
  title: null,
  content: null,
});

// Validation logic
const validateFieldTitle = (field) => {
  if (field === 'title' && !form.title) {
    errors.title = 'Title is required.';
  } else {
    errors.title = null;
  }
};

const validateFieldContent = (field) => {
  if (field === 'content' && !form.content) {
    errors.content = 'Content is required.';
  } else {
    errors.content = null;
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.image = {
      file: file,
      url: URL.createObjectURL(file)
    };
  }
};

const cancelEdit = () => {
  // Reset form to original values
  Object.assign(form, originalForm.value);
  isEditing.value = false;
};

const handleSubmit = () => {
  if (!isEditing.value) return;

  validateFieldTitle('title');
  validateFieldContent('content');

  if (!errors.title && !errors.content) {
      globalDataStore.load('update');

      const formData = new FormData();
      formData.append('blog[title]', form.title);
      formData.append('blog[content]', form.content);
      formData.append('blog[image]', form.image);
      formData.append('blog[image]', form.id);

       axios.put(APIBlogs.updateBlog(route.params.id, ),formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        alert('Blog updated successfully!');
        isEditing.value = false;
        originalForm.value = { ...form };
        globalDataStore.unload('update');

      }).catch((error) => {
      alert('Failed to update blog. Please try again.');
        globalDataStore.unload('update');

    })
  }
};

// Fetch blog details on component mount
onMounted(async () => {
    form.id = route.params.id;
    globalDataStore.load('getDetailBlog') // Start loading
     axios.get(APIBlogs.getDetail(route.params.id)).then((response) => {
      let dataClone =  response['data'].data;
      Object.assign(form, dataClone);
      originalForm.value = { ...dataClone };
      globalDataStore.unload('getDetailBlog') // end loading

      
      }).catch((error) => {
        console.log(error)
        globalDataStore.unload('getDetailBlog') // end loading

      })
});
</script>

