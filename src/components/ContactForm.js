import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const [postedData, setPostedData] = useState()
  const onSubmit = (data) => {
    setData(data);
  };
  useEffect(()=>{
    //don't do anything of the 1 render, and on the next changes to data then post the data
    if(data === (undefined)){
      
    } else{
      axios.post( 'https://reqres.in/api/users', data)
      .then(success => {
        setPostedData(success.data)
        debugger
      })
    }
  }, [data])
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 50 })}
            id='firstName'
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            placeholder="Burke"
            id='lastName'
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input name="email" ref={register({ required: true })} id='email'/>
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" ref={register({ required: false })} id='message'/>
        </div>
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
