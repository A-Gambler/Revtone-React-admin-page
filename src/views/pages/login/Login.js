import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CLabel,
  CInputCheckbox,
  CFormGroup,
  CRow
} from '@coreui/react'

import  { useHistory } from 'react-router-dom'

import {auth, database} from '../../../firebase'

const styles = {
    paperContainer: {
        backgroundImage: `url(${"static/imgages/jpg/Img_logo.png"})`
    }
};


const Login = () => {
  var item = localStorage.getItem('remember');
  var emailLocal = localStorage.getItem('email');
  var passwordLocal = localStorage.getItem('password');
  const history = useHistory();
  var rememberInit = false;
  var emailInit = "";
  var passwordInit = "";

  if (item == "true") {
    rememberInit = true;
    emailInit = emailLocal;
    passwordInit = passwordLocal;
  }


  const [email, setEmail] = useState(emailInit)
  const [password, setPassword] = useState(passwordInit)
  const [remeber, setRemeber] = useState(rememberInit)

  const loginWithEmailPassword = () => {
    auth.signInWithEmailAndPassword(email, password).then((value) => {
      const uid = value.user.uid;
      console.log(uid);
      database.ref('users/' + uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.role == 1) {
            history.replace('/admin/')
          } else if (userData.role == 2) {
            history.replace('/dashboard/')
          } else {
            debugger
            alert("no permission");
            auth.signOut()
          }
        } else {
          alert("no user");
        }
      });
    }).catch((error) => {
      console.log(error);
      alert(error.message);
    })
    if (remeber) {
      localStorage.setItem('remember', remeber)
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
    } else {
      localStorage.setItem('remember', false)
      localStorage.setItem('email', '')
      localStorage.setItem('password', '')
    }

    // user.sendEmailVerification().then(function() {
    //   // Email sent.
    // }).catch(function(error) {
    //   // An error happened.
    // });
  }

  const forgetPassword = () => {
    auth.sendPasswordResetEmail(email).then(function() {
      alert("reset password link to " + email);
      // Email sent.
    }).catch(function(error) {
      alert(error.message);
      // An error happened.
    });
  }

  const handleChechbox = (value) => {
    localStorage.setItem('remember', {})
    setRemeber(value);
  }

  return (
    <div className="login c-app c-default-layout flex-row align-items-center" style={styles.paperContainer}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8" sm="10" lg="6" xl="4">
            <CCardGroup>
              <CCard>
                <CCardBody className="login-content mb-5">
                  <CForm>
                    <div className="content-center">
                      <img src="./images/jpg/logo_app.png" className="p-5 app-logo" />

                    </div>
                    <h1 className="mb-4">Login to Admin Panel</h1>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="email"
                        value = {email} onChange={e => { setEmail(e.target.value) }}
                        className = "rounded-5"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="password"
                        placeholder="Enter Password"
                        value = {password}
                        onChange={e => { setPassword(e.target.value) }}
                        autoComplete="current-password"
                      />
                    <div className="content-center">
                      <CButton onClick={() => forgetPassword()} color="link" className="forget-btn btn btn-primary btn-pill">Forgot?</CButton>
                    </div>
                    </CInputGroup>

                    <div className="content-left mb-3">
                      <CFormGroup variant="custom-checkbox" className="mr-0" inline>
                        <CInputCheckbox
                          custom
                          id="inline-checkbox1"
                          name="inline-checkbox1"
                          checked={remeber}
                          onChange={() => {handleChechbox(!remeber)}}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Remember Me</CLabel>
                      </CFormGroup>
                    </div>

                    <CButton onClick={() => loginWithEmailPassword()} color="primary" className = "login-btn">Log In</CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
