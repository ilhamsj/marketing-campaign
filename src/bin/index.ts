import { BinScriptConfig } from 'payload'

export const bin: BinScriptConfig[] = [
  {
    key: 'generate:seed',
    scriptPath: './src/bin/seed/index.ts',
  },
  {
    key: 'generate:seed:users',
    scriptPath: './src/bin/seed/Users.ts',
  },
]
