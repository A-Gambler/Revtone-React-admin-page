import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoKeyOutline } from "react-icons/io5";
import {IoMusicalNotes} from "react-icons/io5"
import {IoPeopleOutline} from "react-icons/io5"
import {IoDocumentTextOutline} from "react-icons/io5"
import {IoHammerOutline} from "react-icons/io5"


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Reports',
    to: '/admin/reports',
    icon: <IoDocumentTextOutline className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All users',
    to: '/admin/users',
    icon: <IoPeopleOutline className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Banned Users',
    to: '/admin/banUsers',
    icon: <IoHammerOutline className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Change Password',
    to: '/admin/password',
    icon: <IoMusicalNotes className="mr-2"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'RevTones',
    to: '/admin/revtones',
    icon: <IoKeyOutline className="mr-2"/>,
  },
]

export default _nav
