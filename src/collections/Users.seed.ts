import type { Payload, SanitizedConfig } from 'payload'
import payload from 'payload'

export const userSeed = async (payload: Payload) => {
  const users = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password',
      },
    })
    payload.logger.info('Created admin user: admin@example.com / password')
  } else {
    payload.logger.info('Admin user already exists')
  }
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await userSeed(payload)
  process.exit(0)
}
