import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
const Sidebar = () => {
  const [showSidebar, setshowSidebar] = useState(true);
  const userProfile = false;
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibol text-[#F51997] rounded'
  return (
    <div>
      <div className='block xl:hidden m-2 ml-3 mt-3 text-xl'
        onClick={() => setshowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2
        border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'><AiFillHome /></p>
                <span className='text-xl hidden xl:block'>For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Login to post Your videos</p>
              <div className='pr-4'>
                <GoogleLogin
                  clientId=''
                  render={(renderProps) => (
                    <button
                      className='bg-white text-lg text-[#F51997] cursor-pointer w-full
                                 border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md mt-3 hover:text-white hover:bg-[#F51997]'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      Log In
                    </button>)}
                  onSuccess={() => { }}
                  onFailure={() => { }}
                  cookiePolicy='single_host_origin' />
              </div>
            </div>

          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>


      )}
    </div>
  )
}

export default Sidebar