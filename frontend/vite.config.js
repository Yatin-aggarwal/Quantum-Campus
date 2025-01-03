import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/query_chat':'http://127.0.0.1:8000',
        '/uploadfile/':'http://127.0.0.1:8000'
    }
  },
  plugins: [react()],
 esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  }

})
