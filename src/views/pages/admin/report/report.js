import React, { useState, useEffect } from 'react'
import { useHistory , Link} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../../firebase'


const Reports = () => {
  const [reportItems, setReportItems] = useState([])

  const history = useHistory();

  const refreshReports = () => {
    database.ref('reports/').get().then((snapshot) => {
      if (snapshot.exists) {
        database.ref('users/').get().then((snapshot2) => {
          if (snapshot2.exists) {

            const items = [];
            const reportArray = snapshot.val();
            const userArray = snapshot2.val();
            
            if (reportArray && userArray) {
              Object.keys(reportArray).map((key, index) => {
                const report = reportArray[key];
                const user = userArray[report.user_id]
                const reporter = userArray[report.reporter_id]
                const data = {
                  user_id : report.user_id,
                  user_name: user.name, 
                  reporter_id: report.reporter_id,
                  reporter_name: reporter.name,
                  avatar: user.avatar,
                  id: index,
                  key
                };
                items.push(data)
              })


              // items.push(items[0]);

              setReportItems(items)
            }
          }
        })
        .catch(error => {
          alert(error)
        })
      }
    }).catch(error => {
      alert(error)
    })
  }

  useEffect(() => {
    refreshReports();
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
        <div className="today-show-content"> 
          <div className="today-show"><div className="line"></div><div className="today">Today</div><div className="line"></div></div>
        </div>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
            {
              reportItems.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content none-border">
                      <div className="c-avatar">
                        <img src={data.avatar ? data.avatar : "./avatars/1.jpg"} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td className="name-content">
                      <Link
                       to={"/admin/users/" + data.user_id}
                      >{data.user_name}</Link> Reported the user profile  of  
                      <Link className="ml-2"
                       // to={"/admin/users/" + data.reporter_id}
                       to={`/admin/reportDetails/${data.key}`}
                      >{data.reporter_name}</Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Reports
