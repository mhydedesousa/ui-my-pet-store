import React, { useState } from 'react';
import './App.css';

const initialFormData = Object.freeze({
  address_line_one: "",
  address_line_two: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
});

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState("")

  // reset the form data whenever there is a change from the user
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value.trim()})
  };

  // when the user presses submit, call API with the current formData
  const handleSubmit = (event) => {
    event.preventDefault();
    setResult("Loading");
    fetch("http://localhost:3000/rates/best",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(data => { setResult(JSON.stringify(data)); })
    .catch(error => {
      alert(error.message)
      setResult(error.message);
  })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>My Pet Store</h1>
        <label>Address Line 1</label>
        <input name ="address_line_one" value={formData.address_line_one} type="text" onChange={handleChange}/>

        <label>Address Line 2</label>
        <input ame ="address_line_two" value={formData.address_line_two} type="text" onChange={handleChange}/>

        <label>City</label>
        <input name="city" type="text" value={formData.city} onChange={handleChange}/>

        <label>Province</label>
        <input name="province" type="text" value={formData.province} onChange={handleChange}/>

        <label>Postal Code</label>
        <input name="postalCode" type="text" value={formData.postalCode} onChange={handleChange}/>

        <label>Country</label>
        <input name="country" type="text" value={formData.country} onChange={handleChange}/>

        <label>&nbsp;</label>
        <input style={{marginTop: '10px'}} value='Get Best Shipping Rate' type="button" bsSize="large" onClick={handleSubmit}/>
        
        <div>{result}</div>
      </form>
    </div>
  );
}

export default App;
