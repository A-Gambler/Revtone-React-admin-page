import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CToggler,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import {auth, database} from '../firebase'

// sidebar nav config
import navigation from './_nav'
import admin_nav from './_admin_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const sidebarShow = useSelector(state => state.sidebarShow)

  const [navState, setNavState] = useState(0);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const handleLogOut = () => {
    debugger
    auth.signOut();
  }

  const location = useLocation()
  console.log(location)


    // to = "/"
    // 
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >

      <CSidebarBrand className="d-md-down-none " >
        <CToggler
          inHeader
          className="ml-3 d-md-down-none b-done"
          onClick={toggleSidebar}
        />
        <div className="c-avatar">
          <CImg
            src={'avatars/1.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
        <div className="ml-3 pr-4">
          <div className="welcome">
            Hi, Evelon Rivera
          </div>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        {
          !location.pathname.includes("admin") && <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        }
        {
          location.pathname.includes("admin") && <CCreateElement
            items={admin_nav}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        }

      </CSidebarNav>
      <div className="c-d-md-down-none side-footer">
       <div className="c-sidebar-nav-item">
         <a onClick={() => handleLogOut()} className="c-sidebar-nav-link" tabIndex="0" href="#/login">
         <CIcon content={freeSet.cilAccountLogout} style={{ margin: '10px' }} />
           Log out
          </a>
        </div>
      </div>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
