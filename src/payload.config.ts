import { autoLoginUserForDevelopment } from './payload/bin/seed/Users'
import { bin } from './payload/bin'
import { buildConfig } from 'payload'
import { collections } from './payload/collections'
import { env } from './shared/constants/env'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Users } from './payload/collections/Users'
import path from 'path'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    timezones: {
      defaultTimezone: 'Asia/Jakarta',
    },
    autoLogin: {
      ...autoLoginUserForDevelopment,
      prefillOnly: true,
    },
  },
  collections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  bin,
  sharp,
  plugins: [],
  ...(env.SMTP_HOST &&
    env.SMTP_PORT && {
      email: nodemailerAdapter({
        defaultFromAddress: 'info@payloadcms.com',
        defaultFromName: 'Payload',
        transportOptions: {
          host: env.SMTP_HOST,
          port: env.SMTP_PORT,
        },
      }),
    }),
  jobs: {
    autoRun: () => [
      {
        allQueues: true,
        cron: '*/1 * * * *',
        disableScheduling: true,
        limit: 1,
        queue: 'default',
        silent: true,
      },
    ],
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      defaultJobsCollection.admin = {
        ...defaultJobsCollection.admin,
        hidden: false,
      }
      return defaultJobsCollection
    },
  },
})
