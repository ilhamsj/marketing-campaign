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
        password: 'admin@example.com',
      },
    })
    payload.logger.info('Created admin user: admin@example.com / password')
  } else {
    await payload.update({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin@example.com',
      },
      where: {
        email: {
          equals: 'admin@example.com',
        },
      },
    })
    payload.logger.info('Updated admin user: admin@example.com / password')
  }
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await userSeed(payload)
  process.exit(0)
}
