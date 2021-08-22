import React, { useState ,useEffect}  from 'react';
import '../components/styles/history.css'
import Transaction from '../components/transaction';
import firebase from '../firebase';
import TransactionDetails from '../components/transactionDetails';
import avatar from '../components/media/avatar.png'
const History=()=>{
    const [transactions,settransactions]=useState();
    const reference=firebase.firestore().collection("transactions");

    const [tdetailSender,setTDetailSender]=useState();
    const [tdetailReceiver,setTDetailReceiver]=useState();
    const [tdetailAmount,setTDetailAmount]=useState();
    const [tdetailDate,setTDetailDate]=useState();
    const [tdetailID,setTDetailID]=useState();
    const [showDetails,setshowDetails]=useState(false);



    useEffect(() => {
        getTransactions()
    }, [])
    
    
    const getTransactions=()=>{
      reference.onSnapshot((querySnapshot)=>{
        const items=[];
        querySnapshot.forEach((doc)=>{
          items.push(doc.data())
        })
        settransactions(items)
      })
    }
    return(
        <>
        <div class="profileTab">
            <div class="detailsWrap">
                <img src={avatar} alt="" class="dp"/>
                <div class="details">
                    <div class="name">
                        {localStorage.getItem('userEmail').slice(0,localStorage.getItem('userEmail').indexOf('@'))}
                    </div>
                    <div class="email">
                        {localStorage.getItem('userEmail')}
                    </div>
                </div>
            </div>
            <svg class="settings" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.57 15.72L29.22 14.72C28.9884 13.9113 28.6698 13.1301 28.27 12.39L29.91 9.32C29.9715 9.20412 29.994 9.07148 29.9742 8.94178C29.9544 8.81208 29.8933 8.69222 29.8 8.6L27.41 6.2C27.3177 6.10667 27.1979 6.04556 27.0682 6.02575C26.9385 6.00593 26.8059 6.02846 26.69 6.09L23.64 7.72C22.8926 7.30066 22.1011 6.96529 21.28 6.72L20.28 3.41C20.2377 3.28802 20.1578 3.1826 20.0517 3.10892C19.9457 3.03525 19.819 2.99711 19.69 3H16.31C16.1801 3.00061 16.0538 3.04264 15.9495 3.11997C15.8452 3.19731 15.7683 3.30592 15.73 3.43L14.73 6.73C13.902 6.97398 13.1037 7.30938 12.35 7.73L9.34997 6.11C9.23409 6.04846 9.10145 6.02593 8.97175 6.04575C8.84205 6.06556 8.72219 6.12667 8.62997 6.22L6.19997 8.59C6.10664 8.68222 6.04553 8.80208 6.02572 8.93178C6.0059 9.06148 6.02843 9.19412 6.08997 9.31L7.70997 12.31C7.29003 13.0606 6.95464 13.8555 6.70997 14.68L3.39997 15.68C3.27589 15.7183 3.16728 15.7952 3.08994 15.8996C3.01261 16.0039 2.97058 16.1301 2.96997 16.26V19.64C2.97058 19.7699 3.01261 19.8961 3.08994 20.0005C3.16728 20.1048 3.27589 20.1817 3.39997 20.22L6.72997 21.22C6.97732 22.0308 7.31265 22.8121 7.72997 23.55L6.08997 26.69C6.02843 26.8059 6.0059 26.9385 6.02572 27.0682C6.04553 27.1979 6.10664 27.3178 6.19997 27.41L8.58997 29.8C8.68219 29.8933 8.80205 29.9544 8.93175 29.9743C9.06145 29.9941 9.19409 29.9715 9.30997 29.91L12.4 28.26C13.1309 28.6544 13.902 28.9696 14.7 29.2L15.7 32.57C15.7383 32.6941 15.8152 32.8027 15.9195 32.88C16.0238 32.9574 16.1501 32.9994 16.28 33H19.66C19.7898 32.9994 19.9161 32.9574 20.0204 32.88C20.1247 32.8027 20.2017 32.6941 20.24 32.57L21.24 29.19C22.0311 28.9584 22.7954 28.6433 23.52 28.25L26.63 29.91C26.7459 29.9715 26.8785 29.9941 27.0082 29.9743C27.1379 29.9544 27.2578 29.8933 27.35 29.8L29.74 27.41C29.8333 27.3178 29.8944 27.1979 29.9142 27.0682C29.934 26.9385 29.9115 26.8059 29.85 26.69L28.19 23.59C28.5873 22.8627 28.9058 22.095 29.14 21.3L32.51 20.3C32.634 20.2617 32.7427 20.1848 32.82 20.0805C32.8973 19.9761 32.9394 19.8499 32.94 19.72V16.31C32.9459 16.1857 32.9136 16.0625 32.8474 15.957C32.7813 15.8515 32.6845 15.7688 32.57 15.72V15.72ZM18 23.5C16.9122 23.5 15.8488 23.1774 14.9443 22.5731C14.0399 21.9687 13.3349 21.1098 12.9186 20.1048C12.5024 19.0998 12.3934 17.9939 12.6057 16.927C12.8179 15.8601 13.3417 14.8801 14.1109 14.1109C14.8801 13.3417 15.8601 12.8179 16.927 12.6057C17.9939 12.3935 19.0997 12.5024 20.1047 12.9187C21.1097 13.3349 21.9687 14.0399 22.5731 14.9444C23.1774 15.8488 23.5 16.9122 23.5 18C23.5 19.4587 22.9205 20.8576 21.8891 21.8891C20.8576 22.9205 19.4587 23.5 18 23.5V23.5Z" fill="white"/>
            </svg>
                
        </div>
        <h1>History</h1>
        <a href="./home" class="gobackLink">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 5L4 12L11 19" stroke="#1F89C5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 12H20" stroke="#1F89C5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            go back
                
        </a>
        <div class="transactionsList">
            {
                !transactions && <div className="loading">loading...</div>
            }
            {transactions&&transactions.map((transaction,key)=>{
                return(
                    <Transaction 
                    sender={transaction.sender} 
                    receiver={transaction.receiver} 
                    tID={transaction.transactionID} 
                    etherAmount={transaction.etherAmount} 
                    setTDetailSender={setTDetailSender}
                    setTDetailDate={setTDetailDate}
                    setTDetailReceiver={setTDetailReceiver}
                    setTDetailID={setTDetailID}
                    setTDetailAmount={setTDetailAmount}
                    date={transaction.timestamp}
                    setshowDetails={setshowDetails}
                    /> 
                )
            })}
        </div>
        {showDetails&&<TransactionDetails 
        
        setshowDetails={setshowDetails}
        tID={tdetailID}
        sender={tdetailSender}
        receiver={tdetailReceiver}
        amount={tdetailAmount}
        date={tdetailDate}
        
        
        />}
        {/* <div class="pages">
            <span class="pageNumber">
                1
            </span>
            <span class="pageNumber active">
                2
            </span>
            <span class="pageNumber">
                3
            </span>
            <span class="pageNumber">
                4
            </span>
            <span class="pageNumber">
                5
            </span>
        </div> */}
        
        </>

    )
}

export default History;

