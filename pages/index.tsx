import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user, error } = useMe()
  return (
    <GradientLayout
      roundImage
      title={`${user?.firstName} ${user?.lastName}`}
      color="green"
      subtitle="profile"
      image="/ollie.jpg"
      description="15 public playlists"
    >
      <Flex>
        {artists.map((artist) => (
          <Box paddingX="10px" width="20%">
            <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
              <Image
                src={`https://placekitten.com/300/300?image=${artist.id}`}
                borderRadius="100%"
              />
              <Box marginTop="20px">
                <Text
                  fontSize="large"
                  _hover={{ cursor: 'pointer', color: 'gray.200' }}
                >
                  {artist.name}
                </Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  // has access to JWT, cookie, and auth
  const artists = await prisma.artist.findMany({})
  console.log(artists)
  return {
    props: { artists }
  }
}

export default Home
