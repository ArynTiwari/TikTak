import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import useAuthStore from '../../store/authStore'
import axios from 'axios'
import { Video } from '../../types'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

interface IProps {
    postDetails: Video,
}
export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const { data } = await axios.get(`http://localhost:3000/api/post/${id}`)
    return {
        props: { postDetails: data }
    }
}
const Detail = ({ postDetails }: IProps) => {
    const [post, setpost] = useState(postDetails)
    const [playing, setplaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoMuted, setvideoMuted] = useState(false)
    const router = useRouter();
    const { userProfile }: any = useAuthStore();
    const onVideoClick = () => {
        if (playing) {
            videoRef.current?.pause();
            setplaying(false);
        } else {
            videoRef.current?.play();
            setplaying(true);
        }

    }
    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = videoMuted;
        }
    }, [post, videoMuted])
    const handelLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`http://localhost:3000/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })
            setpost({ ...post, likes: data.likes });
        }
    }
    if (!post) return null;
    return (
        <div className='flex w-full absolute left-0 top-0 bg-white
        flex-wrap lg:flex-nowrap'>
            <div className='relative flex-2 w-[1000px] lg:w-9/12
            flex items-center justify-center bg-blurred-img bg-no-repeat bg-center bg-cover'>
                <div className='absolute top-6 left-2 
                lg:left-6 gap-6 z-50'>
                    <p className='cursor-pointer' onClick={() => { router.back() }}>
                        <MdOutlineCancel
                            className='text-white text-[35px]'
                        />
                    </p>
                </div>
                <div className='relative'>
                    <div className='lg:h-[100vh] h-[60vh]'>
                        <video
                            ref={videoRef}
                            onClick={onVideoClick}
                            src={post.video.asset.url}
                            className='h-full cursor-pointer'
                        >
                        </video>
                    </div>
                    <div className='absolute top-[45%] left-[45%] cursor-pointer'>
                        {!playing && (
                            <button onClick={onVideoClick}>
                                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                            </button>
                        )}
                    </div>
                </div>
                <div className='absolute bottom-5 lg:bottom-10 right-6 lg:right-10 cursor-pointer'>
                    {videoMuted ? (
                        <button onClick={() => {
                            setvideoMuted(false);
                        }}>
                            <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                        </button>) : (
                        <button onClick={() => {
                            setvideoMuted(true);
                        }}>
                            <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                        </button>
                    )}
                </div>
            </div>
            <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
                <div className='lg:mt-20 mt-10'>
                    <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                        <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
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
                                <div className='flex flex-col mt-3 gap-2'>
                                    <p className='flex gap-2 md:text-md text-primary font-bold'>{post.postedBy.userName}{" "}
                                        <GoVerified className='text-blue-400' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gry-500 hidden md:block'>{post.postedBy.userName}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <p className='px-10 text-lg text-gray-600'>{post.caption}</p>
                    <div className='mt-10 px-10'>
                        {userProfile && (
                            <LikeButton
                                likes={post.likes}
                                handelLike={() => handelLike(true)}
                                handelDislike={() => handelLike(false)}
                            />
                        )}
                    </div>
                    <Comments />
                </div>
            </div>
        </div>

    )
}

export default Detail