import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CButton,
  CInput,
  CLabel,
  CModal,
  CCardHeader,
  CModalBody,
  CFormGroup,
  CInputCheckbox,
  CCard,
  CCardBody,
} from '@coreui/react'

import {database} from '../../../../firebase'

import EventEmitter from "reactjs-eventemitter";

var staticUserItems = [];

const BanUsers = () => {
  const [userItems, setUserItems] = useState([])
  const [userItems1, setUserItems1] = useState([])
  const [addUser, setAddUser] = useState(false)

  const [userAdmin, setUserAdmin] = useState("");
  const [userName, setUserName] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPermitDash, SetUserPermitDash] = useState(false);
  const [userPermitManage, SetUserPermitManage] = useState(false);
  const [userPermitDeals, SetUserPermitDeals] = useState(false);
  const [userPermitChangePwd, SetUserPermitChangePwd] = useState(false);

  const refreshUsers = () => {
    database.ref('users/').get().then((snapshot) => {
      if (snapshot.exists) {
        var usersData = [];
        const newArray = snapshot.val();
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value = newArray[key];
            if(value.role == "0"){
              usersData.push({
                id: index,
                avatar: 'avatars/1.jpg',
                key,
                name: value.name,
                dashboard: value.permitDash,
                deals: value.permitDeals,
                users: value.permitManage,
                job: value.position,
              })
            }

          })
          setUserItems(usersData);
          staticUserItems = [...usersData]
        }
      }
    });
  }
  
  useEffect(() => {
    refreshUsers();
    EventEmitter.subscribe('add-new-user', event => {
      setAddUser(true);
    })
    EventEmitter.subscribe('admin-header-search', (key) => {
      const items = [];
      staticUserItems.forEach(item => {
        if (item.name.toLowerCase().includes(key.toLowerCase())) {
          items.push(item)
        }
      })
      setUserItems(items)
      if (key = "") {
        const iitems = [...staticUserItems]
        setUserItems(iitems)
      }
    })
  }, [])
  
  var changePermission = (key, tag, value) => {
    var updates = {}
    updates['users/'+ key + "/" + tag] = value;
    database.ref().update(updates);
  }

  const addNewUser = () => {
    const load = {
      admin: userAdmin,
      name: userName,
      position: userPosition,
      password: userPassword,
      permitDash: userPermitDash,
      permitManage: userPermitManage,
      permitDeals: userPermitDeals,
      permitChangePwd: userPermitChangePwd
    }
    var userListRef = database.ref('users');
    var newUserRef = userListRef.push();
    newUserRef.set(load)
    refreshUsers();
  }

  var liftBanUser = (key) => {
    console.log(key);
    var updates = {}
    updates['users/' + key + "/role"] = 1;
    database.ref().update(updates);
    refreshUsers();
  }

  return (
    <div className="reports">
      <CCard>
        <CCardBody>
        <div className="today-show-content"> 
          <div className="today-show"><div className="line"></div><div className="today">Banned Users</div><div className="line"></div></div>
        </div>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
          {
              userItems.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content none-border">
                      <div className="c-avatar">
                      <img src={data.avatar? data.avatar : "avatars/1.jpg"} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                      </div>
                    </td>
                    <td className="name-content">
                      <div className="ban-users-field">{data.name}</div>
                    </td>
                    <td className="ban-btn-content">
                      <CButton onClick= {() => liftBanUser(data.key)} className = "ban-btn">Lift Ban</CButton>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </CCardBody>
      </CCard>

      <CModal
          show={addUser} 
          onClose={() => setAddUser(!addUser)}
          centered
        >
          <CModalBody>
            <CCard>
              <CCardHeader>
                NEW USER
              </CCardHeader>
              <CCardBody>
                <div className="title-input">
                  <CLabel htmlFor="user-admin">User Admin</CLabel>
                  <CInput value={userAdmin} onChange={e => { setUserAdmin(e.target.value) }}  id="user-admin" name="user-admin" placeholder="" />
                </div>
                <div className="title-input">
                  <CLabel htmlFor="user-name">Name</CLabel>
                  <CInput value={userName} onChange={e => { setUserName(e.target.value) }} id="user-name" name="user-name" placeholder="" />
                </div>
                <div className="title-input">
                  <CLabel htmlFor="user-position">Position</CLabel>
                  <CInput value={userPosition} onChange={e => { setUserPosition(e.target.value) }} id="user-position" name="user-position" placeholder="" />
                </div>
                <div className="title-input mt-5 mb-0">
                  <CLabel htmlFor="user-password">Password</CLabel>
                  <CInput value={userPassword} onChange={e => { setUserPassword(e.target.value) }} id="user-password" name="user-password" type="password" placeholder="" />
                </div>
                <CLabel  className="info-title">*** Provide initial admin account password</CLabel>
                <div className="permission-content">
                  <CLabel className="permission-title">Permissions</CLabel>
                  <div className="permission-line"></div>
                </div>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox 
                      custom 
                      id="checkbox-permit-dash" 
                      name="checkbox-permit-dash"
                      checked={userPermitDash}
                      onChange= {e => {SetUserPermitDash(!userPermitDash)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-dash">Dashboard</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox 
                      custom 
                      id="checkbox-permit-manage" 
                      name="checkbox-permit-manage"
                      checked={userPermitManage}
                      onChange= {e => {SetUserPermitManage(!userPermitManage)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-manage">Manage Users</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox 
                      custom 
                      id="checkbox-permit-deals" 
                      name="checkbox-permit-deals"
                      checked={userPermitDeals}
                      onChange= {e => {SetUserPermitDeals(!userPermitDeals)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-deals">Deals and Promotions</CLabel>
                </CFormGroup>

                <CFormGroup variant="custom-checkbox" className="mr-0 ml-5 mb-2" inline>
                  <CInputCheckbox 
                      custom 
                      id="checkbox-permit-change-pwd" 
                      name="checkbox-permit-change-pwd"
                      checked={userPermitChangePwd}
                      onChange= {e => {SetUserPermitChangePwd(!userPermitChangePwd)}}
                  />
                  <CLabel variant="custom-checkbox" className="permission-check-label" htmlFor="checkbox-permit-change-pwd">Change Password</CLabel>
                  <CLabel  className="ml-3 info-title">*default access for user profiles</CLabel>
                </CFormGroup>

                <div className="text-right">
                  <CButton className="add-user-btn" onClick={() =>{setAddUser(!addUser); addNewUser()} }>Add User</CButton>
                </div>
              </CCardBody>
            </CCard>
          </CModalBody>
        </CModal>
    </div>
  )
}

export default BanUsers
