import React  from 'react';


const TransactionDetails=({tID,sender,receiver,amount,date,setshowDetails})=>{

    console.log({tID,sender,receiver,amount,date,setshowDetails})
    return(
        <>
            <div className="transactionDetails">
                <div className="wrap">

                <div className="tID field">
                    <label htmlFor="">Transaction ID</label>
                    {tID}
                </div>
                <div className="sender field">
                    <label htmlFor="">sender</label>
                    {sender}
                </div>
                <div className="receiver field">
                    <label htmlFor="">receiver</label>
                    {receiver}
                </div>
                <div className="amount field">
                    <label htmlFor="">ether</label>
                    {amount}
                </div>
                <div className="date field">
                    <label htmlFor="">date</label>
                    {date}
                </div>
                <button className="hidebtn"
                onClick={e=>{
                    setshowDetails(false);
                }}>
                Ok
                </button>
                </div>
            </div>
        </>
    )
}


export default TransactionDetails;