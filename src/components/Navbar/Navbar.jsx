import React, { useRef, useState } from 'react'
import './Navbar.scss'
 
import { IoIosLogOut } from "react-icons/io";

import { useNavigate } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import LoadingBar from 'react-top-loading-bar'


const Navbar = () => {
    const ref = useRef(null)

    const [loader ,setLoader] = useState(false);

    function handleLoader(){
        if(loader){
            setLoader(false)
            ref.current.complete()
        }
        else{
            ref.current.continuousStart()
        }
    }
    const navigate = useNavigate()
  return (
    <>
    <div className="nav-bar">
    <LoadingBar waitingTime={1} color='#5f9fff' ref={ref} />

        <div className="nav-container">
            <div className="left-side hover-links" onClick={()=> navigate('/')}>
                <h1>Social Media</h1>
            </div>
            <div className="right-part">
            <div className="right-side hover-links" onClick={()=> navigate('/profile/dsfsf')}>
                <Avatar/>
            </div>
            <div  onClick={handleLoader}>

            <IoIosLogOut className='logout-icon hover-links' />
            </div>

            </div>

        </div>
    </div>
    </>
  )
}

export default Navbar