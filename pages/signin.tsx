import { Box } from '@chakra-ui/react'

import AuthForm from '../components/authForm'

const Signin = () => {
  return (
    <Box>
      <AuthForm mode="signin" />
    </Box>
  )
}

Signin.authPage = true

export default Signin
