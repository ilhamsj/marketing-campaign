import type { Payload, SanitizedConfig } from 'payload'
import payload from 'payload'

export const autoLoginUserForDevelopment = {
  email: 'admin@example.com',
  password: 'admin@example.com',
}

export const usersSeed = async (payload: Payload) => {
  const users = [
    autoLoginUserForDevelopment,
    {
      email: 'marketing@example.com',
      password: 'marketing@example.com',
    },
    {
      email: 'product@example.com',
      password: 'product@example.com',
    },
  ]

  await Promise.all(
    users.map(async (user) => {
      const { docs, totalDocs } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: user.email,
          },
        },
        limit: 1,
        depth: 0,
      })

      if (totalDocs === 0) {
        await payload.create({
          collection: 'users',
          data: user,
        })
        payload.logger.info(`Created user: ${user.email}`)
      } else {
        await payload.update({
          collection: 'users',
          data: user,
          id: docs[0].id,
        })
        payload.logger.info(`Updated user: ${user.email}`)
      }
    }),
  )
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })
  await usersSeed(payload)
  process.exit(0)
}
