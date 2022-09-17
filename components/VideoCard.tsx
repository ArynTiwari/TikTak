import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types';
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setplaying] = useState(false)
  const [videoMuted, setvideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setplaying(false);
    } else {
      videoRef.current?.play();
      setplaying(true);
    }
  }
  return (
    <div className='flex flex-col bodrder-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href="/">
              <>
                <Image
                  alt="profile photo"
                  src={post.postedBy.image}
                  width={62}
                  height={62}
                  layout='responsive'
                  className='rounded-full'
                />
              </>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md text-primary font-bold'>{post.postedBy.userName}{" "}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize font-medium text-xs text-gry-500 hidden md:block'>{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl'>
          <Link href='/'>
            <video
              ref={videoRef}
              loop
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px]'
              src={post.video.asset.url}
            >
            </video>
          </Link>
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px]'>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {videoMuted ? (
                <button onClick={() => {
                  setvideoMuted(false);
                }}>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>) : (
                <button onClick={() => {
                  setvideoMuted(true);
                }}>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard