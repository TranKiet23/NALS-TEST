<template>
  <div class="container mt-5">
    <h1 class="mb-4">Create Blog</h1>
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
        ></textarea>
        <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
      </div>

       <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          type="file"
          id="image"
          class="form-control"
          @change="handleImageUpload"
          accept="image/*"
        />
        <img v-if="imagePreview" :src="imagePreview" class="mt-2" style="max-width: 200px;" />
      </div>


      <div class="pt-5">
        <button type="submit" class="btn btn-success">Save</button>
        <button type="button" class="btn btn-warning mx-2" @click="router.back()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import APIBlogs from '../services/api'
import axios from 'axios';
import { LoadingStore } from '../stores/loading'

    const globalDataStore = LoadingStore()
    const form = reactive({
      title: '',
      content: '',
      image:  { 
        url : ''
      },
    });
    const router = useRouter();

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

       if (field === 'content' && !form.content) {
        errors.content = 'Content is required.';
      } else {
        errors.content = null;
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
        // Store the file object
        form.image = {
          file: file,
          url: URL.createObjectURL(file)
        };
        imagePreview.value = form.image.url;
        validateField('image');
      }
    };

    // Handle form submission
    const handleSubmit = () => {
      validateFieldTitle('title');
      validateFieldContent('content');

      if (!errors.title && !errors.content) {
      const formData = new FormData();
      globalDataStore.load('add') // Start loading

      formData.append('blog[title]', form.title);
      formData.append('blog[content]', form.content);
      formData.append('blog[image]', form.image);

      axios.post(APIBlogs.addNewBlog(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        alert('Blog posted successfully!');
        router.push('/');
        globalDataStore.unload('add')

      }).catch((error) => {
      alert('Failed to post blog. Please try again.');
        globalDataStore.unload('add')

    })
  }      
};
</script>

