import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react'

import {database, auth} from '../../../firebase'


const DealsPromotions = () => {
  const [dealItems, setDealItems] = useState([])

  const history = useHistory();

  const refreshDeals = () => {
    database.ref('promotions/').get().then((snapshot) => {
      if (snapshot.exists) {
        var dealsData = [];
        const newArray = snapshot.val();
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value = newArray[key];
            dealsData.push({
              id: index,
              avatar: value.imageLink ?? 'avatars/1.jpg',
              key,
              name: value.name,
            })
          })
          setDealItems(dealsData);
        }
      }
    }).catch((error) => {
      debugger
    });
  }

  useEffect(() => {
    refreshDeals();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/login/")
      }
    })
  }, [])

  
  
  var viewPromotions = (key) => {
    history.push('/deals/preview/' + key)
  }

  var removeDeals = (key) => {
    database.ref('promotions/' + key).remove();
    refreshDeals();
  }

  return (
    <div className="deals">
      <CCard>
        <CCardBody>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
          <tbody>
            {
              dealItems.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="avatar-content">
                      <div className="c-avatar">
                        <img src={data.avatar ? data.avatar : "./images/jpg/company_logo.png"} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td className="name-content">
                      <div className="name-field">{data.name}</div>
                    </td>
                    <td className="view-btn-content">
                      <CButton onClick= {() => viewPromotions(data.key)} className = "view-btn">View</CButton>
                    </td>
                    <td className="remove-btn-content">
                      <CButton onClick= {() => removeDeals(data.key)} className = "remove-btn">Remove</CButton>
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

export default DealsPromotions
