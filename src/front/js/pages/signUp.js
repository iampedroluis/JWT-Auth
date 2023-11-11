import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const SignUp = () => {

const { store, actions } = useContext(Context);
const navigate = useNavigate();
const [formData, setFormData] = useState({
  "email":"",
  "password":""
})
const [error, setError] = useState(null);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
        [name]: value
    });
};

const handleSubmit= async(e)=>{
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setError("fields cannot be empty. ⚠");
      return; 
    }
    try {
      const response = await actions.signUp(formData)
      if(response.success){
        navigate('/')
      }

    }catch (error) {
      console.error(error)
    }
    
}


  return (
    <form onSubmit={handleSubmit} className="glass-div">
    {error && <div className="bg-color align-items-center"><p className="text-light ">{error}</p></div>}
    <div className="mb-3 ">
      <input
        placeholder="E-MAIL"
        type="email"
        className="form-control input-edit"
        name = "email"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        onChange={handleInputChange}
      />
      <div id="emailHelp" className="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div className="mb-3">
      <input
        placeholder="PASSWORD"
        type="password"
        className="form-control input-edit"
        name= "password"
        id="exampleInputPassword1"
        onChange={handleInputChange}
      />
    </div>
    <button type="submit" className="original-button justify-content-center ">
      Sign Up
    </button>
  </form>
  
  );
};
