import React from "react";
import pagenotfound from '../../img/404.png'
import { Link } from "react-router-dom";

export const NotFound = () =>{
    return(
        <div>
            <img src={pagenotfound} alt="" className="notfound" />
            <div className="d-flex justify-content-center mt-3">
            <Link to={'/'}><button type="" className="original-button justify-content-center ">
            HOME
          </button></Link>
            </div>
        </div>
    )
}