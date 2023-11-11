import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Login } from "./login";
import { Link, useNavigate } from "react-router-dom";
export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
		if(sessionStorage.Token){
			navigate('/private')
		}
	}, [navigate]);
	

	return (
		<div className="text-center mt-5 ">
			<h1>JWT - Auth </h1>
			<div className="d-flex justify-content-center">
			<Login></Login>
			</div>
			<div className="grid-box mt-5">

			</div>
		</div>
	);
};
