import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useEffect, useRef, useState } from 'react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatter'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true)

  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  ) // which song in array to play
  const [seek, setSeek] = useState(0.0) // value is because timeline increaments by 0.1
  const [isSeeking, setIsSeeking] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const repeatRef = useRef(repeat) // fixes closure bug
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  useEffect(() => {
    let timerId

    if (playing && !isSeeking) {
      // recursive function for tracking UI in relation to state
      const tick = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(tick)
      }
      timerId = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  const setPlayState = (value) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  const prevSong = () => {
    // if index is > 0 then go down else loop to end of playlist
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        // shuffle logic
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          // recursion the case where new random === current song
          return nextSong()
        }
      } else {
        return state === songs.length - 1 ? 0 : state + 1
      }
    })
  }

  // when playlist is finished playing
  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration() // referencing howler to match song durations
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            onClick={onShuffle}
            color={shuffle ? 'white' : 'gray.600'}
            outline="none"
            variant="link-variant"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
          />
          <IconButton
            onClick={prevSong}
            outline="none"
            variant="link-variant"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />

          {playing ? (
            <IconButton
              onClick={() => setPlayState(false)}
              outline="none"
              variant="link-variant"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              onClick={() => setPlayState(true)}
              outline="none"
              variant="link-variant"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}
          <IconButton
            onClick={nextSong}
            outline="none"
            variant="link-variant"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
          <IconButton
            onClick={onRepeat}
            color={repeat ? 'white' : 'gray.600'}
            outline="none"
            variant="link-variant"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>

          <Box width="80%">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={[`min`, `max`]}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              id="player-ranger"
              onChange={onSeek}
              value={[seek]} // needs to be an array for this range slider
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
