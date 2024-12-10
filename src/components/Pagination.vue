<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <!-- Previous Button -->
      <li 
        class="page-item" 
        :class="{ disabled: currentPage === 1 }" 
        @click="changePage(currentPage - 1)"
      >
        <button class="page-link">Previous</button>
      </li>

      <!-- Page Numbers -->
      <li 
        class="page-item" 
        v-for="page in pages" 
        :key="page" 
        :class="{ active: page === currentPage }"
      >
        <button 
          class="page-link" 
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- Next Button -->
      <li 
        class="page-item" 
        :class="{ disabled: currentPage === totalPages }" 
        @click="changePage(currentPage + 1)"
      >
        <button class="page-link">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
       type: Object,
      required: true,
    },
   
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pagination.count / this.pagination.offset);
    },
    pages() {
      return this.pagination.total
    },
  },
  mounted(){
    console.log(this.pagination, "items")
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("update:currentPage", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>
