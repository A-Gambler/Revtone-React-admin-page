import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CForm, CFormGroup, CCol, CLabel, CInput, CButton } from '@coreui/react'
import {auth} from '../../../../firebase'
import EventEmitter from "reactjs-eventemitter";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const history = useHistory();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      history.replace("/login/")
    }
  })

  const savePassword = () => {
    var user = auth.currentUser;
    auth.signInWithEmailAndPassword(user.email, currentPassword).then((value) => {
      if (confirmPassword == newPassword) {
        user.updatePassword(newPassword).then(function() {
          alert("password updated");
          // Update successful.
        }).catch(function(error) {
          alert(error.message);
          // An error happened.
        });
      }
    }).catch((error) => {
      alert(error.message);
    })
  }

  return (
    <CCard className="password">
        <CCardBody>
        <div className="today-show-content"> 
          <div className="today-show"><div className="line"></div><div className="today">Change Password</div><div className="line"></div></div>
        </div>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <CFormGroup className="mt-3" row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
             
                <CInput type="password" id="current-password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value) }} name="current-password" placeholder="Current Password" autoComplete="password"/>

              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                
                <CInput type="password" id="new-password" value={newPassword} onChange={e => { setNewPassword(e.target.value) }} name="new-password" placeholder="New Password" autoComplete="password"/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="password-input">
                <CInput type="password" id="confirm-password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }}  name="confirm-password" placeholder="Confirm Password" autoComplete="password"/>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3"></CCol>
              <CCol md="6" className="text-center">
                <CButton className="save-password-btn"  onClick={() => savePassword()}>SAVE</CButton>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
      </CCard>
  )
}

export default ChangePassword
