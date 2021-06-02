import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../../firebase'
import EventEmitter from 'reactjs-eventemitter'

var refreshCount = 0;
var innerCount = 0;
var staticBusinessItems

const BusinessAccounts = () => {
  const [businessItem, setBusinessItem] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const history = useHistory();

  const refreshBusiness = () => {
    database.ref('business/').get().then((snapshot) => {
      if (snapshot.exists()) {
        database.ref('users/').get().then((snapshot2) => {
          if (snapshot2.exists()) {
            var items = [];
            const business = snapshot.val();
            const users = snapshot2.val();
            Object.keys(business).map(key => {
              const buss = business[key];
              const user_id = buss.userId;
              const user_name = users[user_id].name
              const avatar = buss.image
              const active = buss.active
              const item = {
                user_id,
                user_name,
                avatar,
                active
              }
              items.push(item)
            })
            setBusinessItem(items)
            staticBusinessItems = [...items]
          }
        }).catch((error) => {
          debugger
        });
      }
    }).catch((error) => {
      debugger
    });
  }

  useEffect(() => {
    refreshBusiness();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/login/")
      }
    })
    EventEmitter.subscribe('add-bussiness-user', () => {
      history.push('/admin/business/add')
    })

    EventEmitter.subscribe('admin-header-search', (key) => {
      const items = [];
      staticBusinessItems.forEach(item => {
        if (item.user_name.toLowerCase().includes(key.toLowerCase())) {
          items.push(item)
        }
      })
      setBusinessItem(items)
      if (key = "") {
        const iitems = [...staticBusinessItems]
        setBusinessItem(iitems)
      }
    })
  }, [])

  
  
  
  var viewBusiness = (key) => {
    history.push('/admin/business/preview/' + key)
  }

  var deactiveBusiness = (key, index) => {
    debugger
    var updates = {};
    updates[`business/${key}/active`] = !businessItem[index].active;
    database.ref().update(updates);
    refreshBusiness();
  }

  return (
    <div className="deals">
      <CCard>
        <CCardBody>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
            {
              businessItem.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content">
                      <div className="c-avatar">
                        <img src={data.avatar ? data.avatar : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td className="name-content">
                      <div className="name-field">{data.user_name}</div>
                    </td>
                    <td className="view-btn-content">
                      <CButton onClick= {() => viewBusiness(data.user_id)} className = "view-btn">View</CButton>
                    </td>
                    <td className="remove-btn-content">
                      <CButton onClick= {() => deactiveBusiness(data.user_id, index)} className = "deactive-btn">{data.active ? 'Deactive' : 'Active'}</CButton>
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

export default BusinessAccounts
