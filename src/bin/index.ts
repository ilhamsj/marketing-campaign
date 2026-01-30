import { BinScriptConfig } from 'payload'

export const bin: BinScriptConfig[] = [
  {
    key: 'generate:seed',
    scriptPath: './src/bin/seed.ts',
  },
  {
    key: 'generate:seed:tags',
    scriptPath: './src/collections/Tags.seed.ts',
  },
  {
    key: 'generate:seed:users',
    scriptPath: './src/collections/Users.seed.ts',
  },
]
