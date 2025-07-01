import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'cypress'],
      extension: ['.js', '.ts', '.vue', '.svelte'],
      cypress: true,
    }),
  ],
})
