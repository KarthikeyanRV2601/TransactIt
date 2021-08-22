import React, { useState ,useEffect}  from 'react';


const Transaction=({sender,receiver,tID,etherAmount,setTDetailSender,setTDetailDate,setTDetailReceiver,setTDetailID,setTDetailAmount,date,setshowDetails})=>{

    return(
        <div class="transaction">
            <div class="tID">{tID}</div>
            <div class="amount">{etherAmount} ether</div>
            <div class="view" 
            onClick={()=>{
                setTDetailAmount(etherAmount)
                setTDetailDate(date.slice(0,10))
                setTDetailID(tID)
                setTDetailReceiver(receiver)
                setTDetailSender(sender)
                setshowDetails(true);
            }}
            >view</div>
        </div>
    )
}

export default Transaction;