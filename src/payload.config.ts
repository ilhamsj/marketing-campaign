import { bin } from './bin'
import { buildConfig } from 'payload'
import { collections } from './collections'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Users } from './collections/Users'
import path from 'path'
import sharp from 'sharp'
import { autoLoginUserForDevelopment } from './bin/seed/Users'

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
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    transportOptions: {
      host: 'mailhog',
      port: 1025,
    },
  }),
  jobs: {
    access: {
      cancel: () => true,
      queue: () => true,
      run: () => true,
    },
    addParentToTaskLog: true,
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
    deleteJobOnComplete: false,
    enableConcurrencyControl: true,
    jobsCollectionOverrides: ({ defaultJobsCollection }) => {
      defaultJobsCollection.admin = {
        ...defaultJobsCollection.admin,
        hidden: false,
      }
      return defaultJobsCollection
    },
  },
})
