import React, { useState, useEffect } from 'react'
import { useHistory, Link, useParams, useLocation} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {IoHammerOutline} from "react-icons/io5"


import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import {database, auth} from '../../../../firebase'


const ReportDetails = () => {
  const [reportItem, setReportItem] = useState([]);

  const history = useHistory();

  const {id} = useParams();

  console.log(id);


  const deleteThisPoster =() => {
    database.ref('reports/' + id).remove();
    history.replace('/admin/reports');
  }

  const banThisUser = () => {
    const user_id = reportItem.user_id;
    console.log(user_id);
    var updates = {}
    updates['users/' + user_id + "/role"] = 0;
    database.ref().update(updates);
    history.replace('/admin/reports');
  }

  const refreshPreivew = () => {

    database.ref('reports/'  + id).get().then((snapshot) => {
      if (snapshot.exists) {
        const reportData = snapshot.val();
        const value = {
          user_id : reportData.reporter_id,
          content : reportData.name 
        }
        console.log(value);
        setReportItem(value);
      }
    }).catch(error => {
      alert(error)
    });
  }

  useEffect(() => {
    refreshPreivew();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/login/")
      }
    })
  }, [])

  return (
    <div className="reports">
      <CCard>
        <CCardBody>
        <div className="report-content"> 
          <div className="report-show">
          <div className="report-subtitle">chevron-left</div>
          <div className="line"></div><div className="report-title">Selling_tires_cars</div><div className="line">
          </div></div>
        </div>
        <div className="content-center">
           <div className="c-avatar-large">
              <img src={ "avatars/1.jpg"} className="c-avatar-detail" alt="admin@bootstrapmaster.com" />
            </div>
            </div>
           <div className="content-center report-content-detail">
              Lorem ipsum dolor sit amet, consecteur adlpiscing ellt. Nullam bibendum nisl et nisl malesuada maximus. Nune bibendum facilisis retrum.
              Etiam magna ipsum, condimentum id aliquamet, dapibus sed ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per Inceptos himenaeos.
           </div>
           <div className="content-center" style={{ margin: '10px' }}>
            <CButton onClick={() => deleteThisPoster()} color="primary" className = "delPost-btn">
            <CIcon content={freeSet.cilTrash} style={{ margin: '10px' }} />
            Delete this post</CButton>
         </div>
          <div className="content-center" style={{ margin: '10px' }}>
            <CButton onClick={() => banThisUser()} color="primary" className = "delPost-btn">
            <IoHammerOutline className="mr-2"/>
            Ban this User</CButton>
         </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ReportDetails
