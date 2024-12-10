// store/globalData.js
import { defineStore } from 'pinia';

export const LoadingStore = defineStore('globalData', {
  state: () => ({
    isLoading: false,
    arrLoading: [],
    disableRedirectPage: false,
  }),

  getters: {
    loading: (state) => state.isLoading,
    redirectPageDisabled: (state) => state.disableRedirectPage,
  },

  actions: {
    load(data) {
      this.isLoading = true;
      this.arrLoading.push(data);
    },
    unload(data) {
      this.arrLoading = this.arrLoading.filter((x) => x !== data);
      if (this.arrLoading.length === 0) {
        this.isLoading = false;
      }
    },
    setRedirectPageDisabled(value) {
      this.disableRedirectPage = value;
    },
  },
});
