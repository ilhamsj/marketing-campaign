import type { Payload, SanitizedConfig } from 'payload'
import payload from 'payload'

export const autoLoginUserForDevelopment = {
  email: 'admin@example.com',
  password: 'password',
}

export const userSeed = async (payload: Payload) => {
  const users = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: autoLoginUserForDevelopment,
    })
    payload.logger.info('Created admin user: admin@example.com / password')
  } else {
    await payload.update({
      collection: 'users',
      data: autoLoginUserForDevelopment,
      where: {
        email: {
          equals: autoLoginUserForDevelopment.email,
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
