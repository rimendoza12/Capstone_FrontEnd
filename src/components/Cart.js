import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Time from './Time';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Cart = () => {

  // const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBackendUrl = process.env.REACT_APP_BACK_END_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`${apiBackendUrl}/services`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('login_token'),
          }
        })
        let services = response.data.services;
        setData(services);
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
   
    fetchData();


  }, [])
  
 
  const handleAddToCart = (itemName, price) => {
    if (selectedDate && selectedTime) {
      const newItem = {
        name: itemName,
        date: selectedDate,
        time: selectedTime,
        price: price,
        
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleTimeSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  // const handleCheckout = () => {
  //   navigate('./checkout');
  // };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      selectedDate,
      selectedTime,
    };
    axios({
      method: "POST",
      url: "http://localhost:3002/send",
      data: dataToSend,
    })
      .then((response) => {
        if (response.data.status === 'success') {
          alert("Message Sent.");
          setSelectedDate(null);
          setSelectedTime(null);
        } else if (response.data.status === 'fail') {
          alert("Message failed to send.");
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        alert("An error occurred while processing your request.");
      });
  };

  return (
    <>
    <div id="packagemenu">
      <h2>Rates</h2>
        <ul>
                {data && data.map(d => {
                  return <li key={d.id}>
                       <span className="Rate">{d.service_name}</span>
                <span className="Price">₱{d.service_price} per hour</span>
                <span className="Description">{d.details}</span>
                <div>
                  <div className='add2Cart'>
                    <Time  onSelect={handleTimeSelect}/>
                    <Button  onClick={() => handleAddToCart(d.service_name, d.service_price)} >Add to Cart</Button>
                  </div>
                </div>
                  </li>
                })}
          {/* <li>
            <span className="Rate">Band rehearsal</span>
            <span className="Price">₱300 per hour</span>
            <span className="Description">Inclusion of 2 guitars, 1 bass guitar, 1 drumset.</span>
            <div>
              <div className='add2Cart'>
                <Time  onSelect={handleTimeSelect}/>
                <Button  onClick={() => handleAddToCart("Band Rehearsal", 300)} >Add to Cart</Button>
              </div>
            </div>
          </li>
          <li>
            <span className="Rate">Recording</span>
            <span className="Price">₱600 per hour</span>
            <span className="Description">This is live recording. All instruments recorded together.</span>
            <div className='add2Cart'>
                <Time  onSelect={handleTimeSelect}/>
                <Button   onClick={() => handleAddToCart("Recording", 600)} >Add to Cart</Button>
              </div> 
          </li>
          <li>
            <span className="Rate">Track recording</span>
            <span className="Price">₱1200 per hour</span>
            <span className="Description">Instruments and vocals are recorded individually.</span>
            <div className='add2Cart'>
                <Time  onSelect={handleTimeSelect}/>
                <Button  onClick={() => handleAddToCart("Track recording", 1200)} >Add to Cart</Button>
              </div>  
          </li>
          <li>
            <span className="Rate">Lessons</span>
            <span className="Price">₱500 per hour</span>
            <span className="Description">1-on-1 session for voice, guitar, bass, drums and piano lessons</span>
            <div className='add2Cart'>
                <Time  onSelect={handleTimeSelect}/>
                <Button onClick={() => handleAddToCart("Lessons", 500)} >Add to Cart</Button>
              </div> 
          </li> */}
        </ul>
        
      <div>
        <h2>Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Date: {item.date}, Time: {item.time}, Price: ₱{item.price}
                <button onClick={() => handleDeleteItem(index)}>Close</button>
              </li>      
            ))}
          </ul>
        )}
        <h3>Total: ₱{calculateTotal()}</h3>
      </div>
      <h5>Please wait for the confirmation of date and time via email. Thank you.</h5>
      <Button onClick={handleSubmit}>Confirm!</Button>
    </div>
    </>
  );
};

export default Cart;