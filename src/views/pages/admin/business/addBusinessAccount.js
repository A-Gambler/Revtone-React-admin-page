import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CButton,
  CInput,
  CLabel,

} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import ImageUpload from 'image-upload-react'
import EventEmitter from 'reactjs-eventemitter'
import {auth ,database, storage} from '../../../../firebase'

var refreshCount = 0;
var innerCount = 0;

const AddBusinessAccounts = () => {

  var admin_id = "";
  const [businessName, setBusinessName] = useState()
  const [businessAddress, setBusinessAddress] = useState()
  const [businessContact, setBusinessContact] = useState()
  const [businessEmail, setBusinessEmail] = useState()
  const [businessWebSite, setBusinessWebSite] = useState()
  const [userName, setUserName] = useState()
  const [tempPassword, setTempPassword] = useState()

  const [imageSrc, setImageSrc] = useState()
  const [imageFile, setImageFile] = useState()

  const history = useHistory();

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0]);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/login/")
        admin_id = user.id;
      }
    })
  }, [])

  refreshCount++; 
  EventEmitter.subscribe('add-bussiness-account-user', () => {
    innerCount++
    if (innerCount == refreshCount) {
      saveBusiness();
    }
  })

  const saveBusiness = () => {
    
    auth.createUserWithEmailAndPassword(businessEmail, tempPassword).then( async (credential) => {
      console.log(credential)
      
      if(!credential.user) {
        alert("no user")
        return
      }
      const user_id = credential.user.uid;
      
      var imageLink = "";
      if (imageFile) {
          imageLink = await new Promise((resolve, reject) => {
              let extension = imageFile.name.split('.').pop()
              const url = "business/logo." + extension;
              storage.ref(url).put(imageFile).then(function(snapshot) {
                  storage.ref(url).getDownloadURL().then((link) => {
                      resolve(link)
                  }).catch((error) => {
                      reject('')
                  })
              }).catch((error) => {
                  reject('')
              })
          })
      }
      var updates = {}
      updates[`business/${user_id}/name`] = businessName;
      updates[`business/${user_id}/address`] = businessAddress;
      updates[`business/${user_id}/contact`] = businessContact;
      updates[`business/${user_id}/email`] = businessEmail;
      updates[`business/${user_id}/website`] = businessWebSite;
      updates[`business/${user_id}/active`] = true;
      updates[`business/${user_id}/locked`] = false;
      if (imageLink) {
        updates[`business/${user_id}/image`] = imageLink;
        setImageSrc(imageLink)
      }
      
      updates[`business/${user_id}/userId`] = user_id;
      
      updates[`users/${user_id}/admin`] = admin_id;
      updates[`users/${user_id}/avatar`] = "";
      updates[`users/${user_id}/email`] = businessEmail;
      updates[`users/${user_id}/password`] = tempPassword;
      updates[`users/${user_id}/name`] = userName;
      updates[`users/${user_id}/permitChangePwd`] = false;
      updates[`users/${user_id}/permitDash`] = false;
      updates[`users/${user_id}/permitDeals`] = false;
      updates[`users/${user_id}/permitManager`] = false;
      updates[`users/${user_id}/position`] = "";
      updates[`users/${user_id}/role`] = 2;

      database.ref().update(updates);

      history.replace('/admin/business/')
    }).catch(error => {
      alert(error)
    })
    
  }
  

  return (
    <div className="add-business-account">
      <CCard>
        <CCardBody>
          <div className="title-input">
            <CLabel className="business-image-label" htmlFor="business-image">Business Logo</CLabel>
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                  width: 100,
                  height: 100,
                  background: '#f2f2f2'
              }}
            />
          </div>
          <div className="title-input">
            <CLabel htmlFor="business-name">Business Name</CLabel>
            <CInput id="business-name" value = {businessName} onChange={e => { setBusinessName(e.target.value) }}  name="business-name" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="business-address">Address</CLabel>
            <CInput id="business-address" value = {businessAddress} onChange={e => { setBusinessAddress(e.target.value) }} name="business-address" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="contact-number">Contact Number</CLabel>
            <CInput id="contact-number" value = {businessContact} onChange={e => { setBusinessContact(e.target.value) }}  name="contact-number" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="email-address">Email Address</CLabel>
            <CInput id="email-address" value = {businessEmail} onChange={e => { setBusinessEmail(e.target.value) }} name="email-address" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="website">Website</CLabel>
            <CInput id="website" value = {businessWebSite} onChange={e => { setBusinessWebSite(e.target.value)}} name="website" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="user-name">User Name</CLabel>
            <CInput id="user-name" value = {userName} onChange={e => { setUserName(e.target.value)}}   name="user-name" placeholder="" />
          </div>
          <div className="title-input">
            <CLabel htmlFor="temporary-password">Temporary Password</CLabel>
            <CInput id="temporary-password" value = {tempPassword} onChange={e => { setTempPassword(e.target.value)}} name="temporary-password" placeholder="" />
          </div>
          <CLabel  className="info-title mb-4">*Credentials will be sent to the business email address</CLabel>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AddBusinessAccounts
