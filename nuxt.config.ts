import { defineNuxtConfig } from 'nuxt';
import unocss from './unocss';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  unocss,
});
