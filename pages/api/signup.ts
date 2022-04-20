import bcrypt from 'bcrypt' // hash passwords
import jwt from 'jsonwebtoken' // authentication and rules
import cookie from 'cookie' // log activity
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync()
  const { email, password } = req.body

  // attempt to create a user
  let user

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (e) {
    res.status(401)
    res.json({ error: 'User already exists' })
    return
  }

  // create JWT
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now()
    },
    'Hello: JSON Web Token created',
    { expiresIn: '8hr' }
  )

  // Set cookie so it's stored in browser – no local storage for security (can only be accessed by HTTP)
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('HOBBS_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60, // 8 hrs
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
  )

  res.json(user)
}
