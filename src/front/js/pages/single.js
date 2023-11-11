import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate()
useEffect(() => {
	if(!sessionStorage.Token){
		navigate('/')
	}
}, [navigate]);


	return (
		<div className="">
<div class="wrapper d-flex  justify-content-center align-items-center ">
    <div class="typing-demo">
	Welcome to the website.
    </div>
</div>

		</div>
	);
};
