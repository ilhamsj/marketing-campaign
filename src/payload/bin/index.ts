import { BinScriptConfig } from 'payload'

export const bin: BinScriptConfig[] = [
  {
    key: 'generate:seed',
    scriptPath: './src/payload/bin/seed/index.ts',
  },
  {
    key: 'generate:seed:users',
    scriptPath: './src/payload/bin/seed/Users.ts',
  },
]
