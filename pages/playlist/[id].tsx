import GradientLayout from '../../components/gradientLayout'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getBgColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow'
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id)
  return <GradientLayout color={color} />
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.HOBBS_ACCESS_TOKEN)

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true
            }
          }
        }
      }
    }
  })
  return {
    props: { playlist }
  }
}

export default Playlist
