const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'r6hzn559vs7z7fqt',
    publicKey:    '8n3fz43tb47qyzb6',
    privateKey:   'f5aefcadc7b937d5c0ee6a4714c82532'
});

exports.getToken= (req,res) =>{
    gateway.clientToken.generate({
        
      }, (err, response) => {
        if(err){
            res.status(500).json(error)
        }else{
            res.json(response);
        }
      });
}

exports.processPayment =(req, res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(error)
        }else{
            res.json(result);
        }
      });
}