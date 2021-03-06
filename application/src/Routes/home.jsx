
import React, { useState ,useEffect}  from 'react';
import '../components/styles/style.css'
import Web3 from 'web3';
import transactionABI from '../abis/Transactions.json';
import firebase from '../firebase';
import avatar from '../components/media/avatar.png'
const Home=()=>{
    const [showpopup,setshowpopup]=useState(false);
    const [etherAmount,setetherAmount]=useState(0);
    const [receiver,setReceiver]=useState();
    const [isloading,setisLoading]=useState(false);
    const [account,setAccount]=useState();
    const [transactionsContractRef,setTransactionsContractRef]=useState();
    const [transactions,settransactions]=useState();
    const reference=firebase.firestore().collection("transactions");


    

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, [])
    async function loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }
    
    async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts=await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const balanceInstance=await web3.eth.getBalance(accounts[0]);
        const networkId=await web3.eth.net.getId();
        const networkData =transactionABI.networks[networkId];
        if(networkData){
        const transactionInstance=new web3.eth.Contract(transactionABI.abi,networkData.address);
        setTransactionsContractRef(transactionInstance);
        
       
        
      }
        else{
          window.alert('the contract has not been deployed yet');
        }
    }
    
    const addnewTransaction=(data)=>{
        reference.add(data)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    

    const sendEther=async ()=>{
        setisLoading(true);
        if(receiver){
        if(etherAmount!=0)
        {
          let transactionStatus=await transactionsContractRef.methods.sendEther(receiver).send({from:account,value:Web3.utils.toWei(etherAmount,'ether')}).on('transactionHash',(hash)=>{
                let data={
                    'transactionID':hash,
                    'receiver':receiver,
                    'sender':account,
                    'timestamp':new Date().toISOString(),
                    'etherAmount':etherAmount
                }
                addnewTransaction(data);
                setshowpopup(false);
                setisLoading(false);
          });
        }
        else{
            alert("ether amount cannot be 0");
        }
        }
        else{
            alert("invalid receiver address");
            }
        
    }
    


return(
    <>
     <div class="mainContainer">
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
        {!isloading&&<div class="workspace">
            <div class="buttons">
                <div class="btn sendbtn" onClick={()=>{
                        setshowpopup(true)
                    }}>
                    <div class="text" 
                    >
                        Send ether
                    </div>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.139 16.6425L6.63901 4.6425C6.38224 4.52167 6.09645 4.47617 5.81485 4.51127C5.53325 4.54636 5.26738 4.66062 5.04811 4.84078C4.82885 5.02093 4.66519 5.25959 4.57613 5.52903C4.48708 5.79848 4.47629 6.08766 4.54501 6.363L6.36301 13.6365L18 18L6.36301 22.3635L4.54501 29.637C4.47499 29.9125 4.48489 30.2023 4.57353 30.4724C4.66217 30.7426 4.8259 30.9819 5.04556 31.1623C5.26521 31.3428 5.53172 31.457 5.81391 31.4916C6.09609 31.5261 6.38229 31.4796 6.63901 31.3575L32.139 19.3575C32.3967 19.2364 32.6146 19.0444 32.7672 18.804C32.9198 18.5636 33.0009 18.2847 33.0009 18C33.0009 17.7153 32.9198 17.4364 32.7672 17.196C32.6146 16.9556 32.3967 16.7636 32.139 16.6425Z" fill="white"/>
                    </svg>
                        
                </div>
                <a class="btn historybtn" href="/history">
                    <div class="text">
                        History
                    </div>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.8473 9.59766H17.1563C17.0016 9.59766 16.875 9.72422 16.875 9.87891V19.5574C16.875 19.6488 16.9172 19.7332 16.991 19.7859L22.8023 24.0293C22.9289 24.1207 23.1047 24.0961 23.1961 23.9695L24.2016 22.5984C24.2965 22.4684 24.2684 22.2926 24.1418 22.2047L19.1285 18.5801V9.87891C19.1285 9.72422 19.002 9.59766 18.8473 9.59766ZM26.5746 12.2414L32.0871 13.5879C32.2629 13.6301 32.4352 13.4965 32.4352 13.3172L32.4633 7.63946C32.4633 7.40391 32.1926 7.27032 32.0098 7.41797L26.4691 11.7457C26.4273 11.7781 26.3954 11.8217 26.3772 11.8714C26.3589 11.9211 26.3551 11.9749 26.3661 12.0267C26.3772 12.0785 26.4026 12.1261 26.4394 12.1641C26.4763 12.2021 26.5232 12.2289 26.5746 12.2414ZM32.4703 22.827L30.477 22.1414C30.4075 22.1176 30.3314 22.1219 30.265 22.1534C30.1987 22.185 30.1473 22.2412 30.1219 22.3102C30.0551 22.4895 29.9848 22.6652 29.9109 22.841C29.2852 24.3211 28.3887 25.6535 27.2426 26.7961C26.1092 27.933 24.766 28.8392 23.2875 29.4645C21.7558 30.112 20.1094 30.4444 18.4465 30.4418C16.766 30.4418 15.1383 30.1148 13.6055 29.4645C12.1269 28.8392 10.7838 27.933 9.65039 26.7961C8.50782 25.6535 7.61133 24.3211 6.98203 22.841C6.33803 21.3085 6.00808 19.6623 6.01172 18C6.01172 16.3195 6.33867 14.6883 6.98907 13.1555C7.61485 11.6754 8.51133 10.343 9.65743 9.2004C10.7908 8.06351 12.134 7.15731 13.6125 6.53204C15.1383 5.88164 16.7695 5.55469 18.45 5.55469C20.1305 5.55469 21.7582 5.88164 23.291 6.53204C24.7696 7.15731 26.1127 8.06351 27.2461 9.2004C27.6047 9.5625 27.9422 9.93868 28.2516 10.3359L30.3539 8.69063C27.5871 5.15391 23.2805 2.8793 18.443 2.88282C10.0195 2.88633 3.25547 9.72774 3.33985 18.1547C3.42422 26.434 10.1566 33.1172 18.45 33.1172C24.9715 33.1172 30.5262 28.9828 32.6426 23.1926C32.6953 23.0449 32.618 22.8797 32.4703 22.827Z" fill="white"/>
                    </svg>
                </a>
                
                    
            </div>
        </div>}
        {
            isloading&&<h2>Loading...</h2>
        }
        
        {
            showpopup&&
            <div class="popupScreen">
            <div class="container">
                <h3>Enter transfer details</h3>
                <input type="text" id="publicAddress" placeholder="public address (0x)"
                onChange={(e)=>{
                    setReceiver(e.target.value)
                }}
                />
                <input type="text" id="amountEther" placeholder="enter amount in ether (20)"
                onChange={(e)=>{
                    setetherAmount(e.target.value)
                }}/>

                <div class="buttons">
                    <button id="sendEther"
                    onClick={()=>{
                        sendEther()
                    }}
                    >Send</button>
                    <button class="cancel"
                    onClick={
                        ()=>{
                            setshowpopup(false)
                        }
                    }>cancel</button>
                </div>
            </div>
        </div>
        }
        </div>
        
    </>
)
}


export default Home;