import React, { useState } from 'react';
import axios from 'axios';
import instamojo from '../../image/instamojo.webp';
import '../paypal/paypal.css';

const InstaMojo = () => {
    const [token, setToken] = useState('');
    const [form, setForm] = useState({amount:'', name:'', email:'', phone:''})
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleChange = (e)=>{
      setForm({...form, [e.target.name]: e.target.value})
    }

    const getToken = (e)=>{
        e.preventDefault();
        setLoading(true);
        axios.post('api/get-token').then(res => {  
            setToken(res.data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
        });   
    }
    

    const handlePayment= ()=>{
        setLoading2(true);
        axios.post('api/create-order', {...form, token})
        .then(res => {  
          setLoading2(false);
          window.open(res.data, '_blank');
        })
        .catch(error => {
            setLoading2(false);
            console.error(error);
        });   
    }
  return (
    <>
    <div className='main'>
      <img width={300} src={instamojo} alt="" />
      <p>Payment Gateway integration</p>
      <p>{token}</p>
      <div className='card px-5 py-4 mt-5'>
        <form className='' onSubmit={getToken}>
          <label htmlFor="#" className='mt-2'>Name:</label>
          <div className='col-12 center'>
            <input required type="text" name='name' onChange={handleChange}/>
          </div>
          <label htmlFor="#" className='mt-2'>Email:</label>
          <div className='col-12 center'>
            <input required type="email" name='email' onChange={handleChange}/>
          </div>
          <label htmlFor="#" className='mt-2'>Phone:</label>
          <div className='col-12 center'>
            <input required type="text" name='phone' onChange={handleChange}/>
          </div>
          <label htmlFor="#" className='mt-2'>Amount:</label>
          <div className='col-12 center'>
            <input required type="text" name='amount'  onChange={handleChange}/>
          </div>
          {!loading? <div className='col-12 center'>
            <button className='w-100' type="submit">Get Token</button>
          </div>
          :
          <div className='col-12 center'>
            <button className='w-100 text-center' type="submit">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
          }
        </form>
        {!loading2? <div className='col-12 center'>
            <button className='w-100' onClick={handlePayment}>Pay Now</button>
          </div>
          :
          <div className='col-12 center'>
            <button className='w-100 text-center' type="submit">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
          }
      </div>
    </div>
    <p>@codesense24</p>
    </>
  )
}

export default InstaMojo
