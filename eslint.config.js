// eslint.config.js
import { defineConfig } from 'eslint/config'
import { config } from './packages/config-eslint/base.js'

export default defineConfig([...config])
