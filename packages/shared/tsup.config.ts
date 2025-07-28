import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		'constants/index': 'src/constants/index.ts',
		'types/index': 'src/types/index.ts',
		'utils/index': 'src/utils/index.ts'
	},
	format: ['esm', 'cjs'],
	dts: {
		compilerOptions: {
			composite: false
		}
	},
	clean: true,
	sourcemap: true,
	splitting: false,
	minify: false,
	external: ['country-data-list', 'zod'],
	treeshake: true
})
