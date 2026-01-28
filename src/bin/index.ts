import { BinScriptConfig } from "payload";

export const bin: BinScriptConfig[] = [
    {
        key: 'generate:seed',
        scriptPath: './src/collections/Subscribers.seed.ts',
    },
    {
        key: 'generate:seed:tags',
        scriptPath: './src/collections/Tags.seed.ts',
    },
]