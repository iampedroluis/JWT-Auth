import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "./signUp";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 ">
		<h1>Create Account</h1>
		<div className="d-flex justify-content-center">
		<SignUp></SignUp>
		</div>
		<div className="puntos mt-5">

		</div>
	</div>
	);
};
