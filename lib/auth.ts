import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.HOBBS_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'Hello: JSON Web Token created')
        user = await prisma.user.findUnique({
          where: { id }
        })
        if (!user) {
          throw new Error('Not a real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizeddd' })
      }
      return handler(req, res, user)
    }
    res.status(401)
    res.json({ error: 'Not Authorized' })
  }
}