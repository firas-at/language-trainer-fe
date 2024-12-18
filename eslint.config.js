import nextjs from '@next/eslint-plugin-next'

export default [
  {
    extends: [
      nextjs.configs['core-web-vitals'],
      nextjs.configs.recommended
    ]
  }
] 