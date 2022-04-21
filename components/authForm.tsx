import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr' // handle data fetching, validating, caching – made by next.js team & very cool
import NextImage from 'next/image'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const user = await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/hobbsify.svg" width={170} height={55} />
      </Flex>

      <Flex
        justify="center"
        align="center"
        height="calc(100vh - 100px)"
        color="white"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              marginTop="20px"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              marginTop="20px"
              sx={{
                '&:hover': {
                  bg: 'green.300'
                }
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
