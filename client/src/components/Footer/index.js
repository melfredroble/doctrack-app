import React from 'react'
import {FooterContainer} from './styles'
import { Outlet } from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <FooterContainer>
            Copyright &#169; DocTrack. All rights reserved.
        </FooterContainer>
        {/* <Outlet/> */}
    </>
  )
}

export default Footer