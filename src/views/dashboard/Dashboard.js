
import React, { lazy, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useLocation, useHistory } from 'react-router-dom'
import {auth, database} from '../../firebase';
import EventEmitter from 'reactjs-eventemitter'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CLabel,
} from '@coreui/react'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

var staticTransactions = [];

const Dashboard = () => {
  var currentUser = null;
  const [info, setInfo] = useState(false)
  const [selected, setSelected] = useState([])
  const [refKey, setRefKey] = useState(false)
  const [transItems, setTransItems] = useState([])
  const history = useHistory();
  // {
  //   transaction_id: "",
  //   promotio_id: "",
  //   deal_status: 0,
  //   promotio_name: "",
  //   amount: "",
  //   user_id: "",
  //   name: "",
  //   date_of_purchase: "",
  //   date_used: "",
  //   reference_code: "",
  //   user_admin:""
  // }

  const refreshTransaction = () => {
    database.ref('transactions/').get().then((snapshot) => {
      if (snapshot.exists) {
        const transData = snapshot.val();
        if (transData == null) {
          setTransItems([])
        } else {
          database.ref('users/').get().then((snapshot2) => {
            if (snapshot2.exists) {
              const userData = snapshot2.val();
              if (userData) {
                database.ref('promotions/').get().then((snapshot3) => {
                  if (snapshot3.exists) {
                    const promoData = snapshot3.val();
                    if (promoData) {
                      const items = [];
                      Object.keys(transData).map(key => {
                        var item = transData[key];
                        if (item.deal_status == 0) {
                          item.deal_status = "Available";
                        } else if (item.deal_status == 1) {
                          item.deal_status = "Active";
                        } else if (item.deal_status == 2) {
                          item.deal_status = "Claimed";
                        }
                        item.transaction_key = key;
                        if (promoData[item.promotio_id]) {
                          item.promotio_name = promoData[item.promotio_id].name
                        }
                        if (userData[item.user_id]) {
                          item.name = userData[item.user_id].name
                          item.user_admin = userData[item.user_id].admin
                        }
                        items.push(item)
                      })
                      staticTransactions = [...items]
                      setTransItems(items)
                    }
                  }
                })
              }
            }
          })
        }
      }
    });
  }
  
  useEffect(() => {
    refreshTransaction();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        currentUser = user;
      } else {
        history.replace('/login')
      }
    })

    EventEmitter.subscribe('header-date-search', (json) => {
      const value = JSON.parse(json)
      const key = value.key;
      const dateInput = value.dateInput;
      const dateInput1 = value.dateInput1;
      var items = [];
      staticTransactions.forEach(transaction => {
        if (transaction.name.toLowerCase().includes(key.toLowerCase())) {
         if (transaction.date_of_purchase >= dateInput && transaction.date_of_purchase <= dateInput1) {
          items.push(transaction)
         }
        }
      })
      setTransItems(items)
    })
  }, [])

  const columns = [
    {
      name: 'Transaction ID',
      selector: 'transaction_id',
      sortable: true,
    },
    {
      name: 'Promotio ID',
      selector: 'promotio_id',
      sortable: true,
    },
    {
      name: 'Deal Status',
      selector: 'deal_status',
      sortable: true,
    },
    {
      name: 'Promotio Name',
      selector: 'promotio_name',
      sortable: true,
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
    },
    {
      name: 'User ID',
      selector: 'user_id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Date Of Purchase',
      selector: 'date_of_purchase',
      sortable: true,
    },
    {
      name: 'Date Used',
      selector: 'date_used',
      sortable: true,
    },
    {
      name: 'Reference Code',
      selector: 'reference_code',
      sortable: true,
    },
    {
      name: 'User Admin',
      selector: 'user_admin',
      sortable: true,
    },
  ];
  const columns2 = [
    {
      name: 'Promotion ID',
      selector: 'promotio_id',
      sortable: true,
    },
    {
      name: 'Promotion Name',
      selector: 'promotio_name',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Deal Status',
      selector: 'deal_status',
      sortable: true,
    }
  ];

  const getRandomString = (length) => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  const confrimTransaction = () => {
    selected.forEach((item) => {
      if (item.transaction_key) {
        var updates = {}
        updates['transactions/'+ item.transaction_key + "/deal_status"] = 2;
        database.ref().update(updates);
      }
    })
    refreshTransaction();
    setInfo(false)
  }

  const handleChange = (state) => {
    var tselected = [];
    tselected = state.selectedRows;
    if (tselected[0]) {
      const reference_code = tselected[0].reference_code;
      setRefKey(reference_code);
    }
    setSelected(state.selectedRows);
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };

  const openClaim = () => {
    // const random = getRandomString(9)
    setRefKey('');
    setInfo(true)
  }

  const customStyles = {
    headCells: {
      style: {
        fontSize: '12px',
        fontWeight: 700,
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    headRow: {
      style: {
        minHeight: '40px',
      }
    },
    cells: {
      style: {
        fontSize: '12px',
      },
    },
    rows: {
      style: {
        fontSize: '8px',
        minHeight: '25px',
        '&:not(:last-of-type)': {
          borderBottomWidth: '0px',
        },
      }
    }
  };

  return (
    <div className="dashboard">
      <DataTable
        noHeader
        columns={columns}
        data={transItems}
        customStyles = {customStyles}
      />
      <div className="text-right btn-content pt-4">
        <CButton color="primary" onClick={() => openClaim()} className = "claim-btn">CLAIM</CButton>
      </div>

      <CModal
        show={info} 
        onClose={() => setInfo(!info)}
        color="info"
        centered
      >
        <CModalBody>
          <div className="modal-reference-title-content">
            <CLabel className="modal-reference-title">REFERENCE CODE</CLabel>
          </div>
          <div className="modal-reference-code-content">
            <CLabel className="modal-reference-code">{refKey}</CLabel>
          </div>
          <DataTable
            noHeader
            clearSelectedRows = {true}
            columns={columns2}
            data={transItems}
            selectableRows
            onSelectedRowsChange= {(row) => {
              handleChange(row)
            }}
            Selected={handleChange}
            selectableRowDisabled={(row) =>{
              return row.deal_status == "Claimed";
            }}
            customStyles = {customStyles}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => confrimTransaction()}>CONFIRM TRANSACTION</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Dashboard
