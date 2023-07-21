const { default: axios } = require("axios")
module.exports = {
Add : async (req,res)=>{
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload  = {
    
        "app_token": "7431ff30-ef7e-4f6a-b2f3-b5fc04d8ecbe", 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:3001/success",
        "fail_link": "http://localhost:3001/fail",
        "developer_tracking_id": "8c11947c-9e91-4fb3-a49d-3937a4d416f0"
    }
    await axios
    .post(url,payload)
    .then(result =>{
        res.send(result.data)
    })
    .catch((err=> console.log(err)))
},
///verification
Verify : async (req,res)=>{
   const id_payment = req.params.id
await axios.get(`https://developers.flouci.com/api/verify_payment/${id_payment}`,{
    headers :{
        'Content-Type': 'application/json',
        'apppublic': '7431ff30-ef7e-4f6a-b2f3-b5fc04d8ecbe',
      'appsecret': process.env.FLOUCI_SECRET
    }
}

    )
.then(result=>{
    res.send(result.data)
})
.catch(err=>{
    console.log(err);
})
}
}
