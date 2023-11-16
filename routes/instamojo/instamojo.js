const axios = require('axios');
const express = require('express');
const router = express();

// Generate Access Token
router.post('/get-token', async (req, res) => {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('grant_type', 'client_credentials');
        encodedParams.set('client_id', 'test_mWmc8uUyMORaI0bEw6mzmo3MCo4fuoZhd8m');
        encodedParams.set('client_secret', 'test_tfbYdh9tKb0WOFYhbpeo5cApzaMLxzMhms9PDPyymXxqysWKIm9RBrpWJRBzxoGDMVXWCIRRqADKSO14jZvK6bfUlAVzWf6r7noTBNLiZo3PXVcrBNTyaTIhfZw');

        const options = {
        method: 'POST',
        url: 'https://test.instamojo.com/oauth2/token/',
        headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
        };

        axios
        .request(options)
        .then(function (response) {
            return res.status(200).send(response.data.access_token);
        })
        .catch(function (error) {
            console.error(error);
        });
    } catch (error) {
        
    }
});

// Create Payment Request
router.post('/create-order', async (req, res) => {
    const {name, email, phone, amount, token} = req.body
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('allow_repeated_payments', 'false');
        encodedParams.set('send_email', 'true');
        encodedParams.set('amount', `${amount}`);
        encodedParams.set('purpose', 'testing');
        encodedParams.set('buyer_name', `${name}`);
        encodedParams.set('email', `${email}`);
        encodedParams.set('phone', `${phone}`);
        encodedParams.set('redirect_url', `http://localhost:5000/api/check-payment-status?token=${token}`);

        const options = {
        method: 'POST',
        url: 'https://test.instamojo.com/v2/payment_requests/',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: encodedParams,
        };

        axios
        .request(options)
        .then(function (response) {
            res.send(response.data.longurl)
        })
        .catch(function (error) {
            console.error(error);
        });
    } catch (error) {
        
    }
});

router.get('/check-payment-status', async (req, res) => {
    console.log(req.query)
    try {
        const options = {
        method: 'GET',
        url: `https://test.instamojo.com/v2/payment_requests/${req.query.payment_request_id}/`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${req.query.token}`
        }
        };
        
        axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            if(response.data.status === 'Completed'){
                return res.redirect(`http://localhost:3000/success?name=${response.data.buyer_name}&phone=${response.data.phone}&status=${response.data.status}`)
            } else {
                return res.redirect(`http://localhost:3000/failure`)
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    } catch (error) {
        
    }
});



module.exports = router
