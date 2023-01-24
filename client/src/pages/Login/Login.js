import React, { useEffect, useState } from "react";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBIcon,
	MDBInput,
	MDBSpinner,
	MDBValidation,
	MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "./Login.css";
import { googleSignIn, login } from "../../redux/features/authSlice";

const initialState = {
	email: "",
	password: "",
};
const tokenState = {
	token: "",
};
const Login = () => {
	const [formValue, setFormValue] = useState(initialState);

	const { loading, error } = useSelector((state) => ({ ...state.auth }));
	const { email, password } = formValue;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCallbackResponse = (response) => {
		// console.log();
		const token = response.credential;
		const responsePayload = jwt_decode(response.credential);
		const googleId = responsePayload?.sub;
		const email = responsePayload?.email;
		const name = responsePayload?.name;
		const result = { email, name, token, googleId };
		dispatch(googleSignIn({ result, navigate, toast }));
		// const responsePayload = jwt_decode(response.credential);
		// console.log(responsePayload);
		// console.log("ID: " + responsePayload.sub);
		// console.log("Full Name: " + responsePayload.name);
		// console.log("Given Name: " + responsePayload.given_name);
		// console.log("Family Name: " + responsePayload.family_name);
		// console.log("Image URL: " + responsePayload.picture);
		// console.log("Email: " + responsePayload.email);
	};

	useEffect(() => {
		error && toast.error(error);
	}, [error]);
	useEffect(() => {
		window.onload = () => {
			window.google.accounts.id.initialize({
				client_id:
					"450106290342-vdb2ou65t71vb6m14o6s2mmujptnpruh.apps.googleusercontent.com",
				callback: handleCallbackResponse,
			});
			window.google.accounts.id.renderButton(
				document.getElementById("googleSignUpDiv"),
				{
					theme: "filled_blue",
					size: "large",
					text: "continue_with",
					shape: "square",
					logo_alignment: "center",
					width: "350",
				}
			);
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			dispatch(login({ formValue, navigate, toast }));
		}
	};
	const onInputChange = (e) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};
	// const googleSuccess = (resp) => {
	// 	const email = resp?.email; //resp && resp.email
	// 	const name = resp?.name; //resp && resp.name
	// 	const token = resp?.tokenId; //resp && resp.name
	// 	const googleId = resp?.googleId; //resp && resp.name
	// 	const result = { email, name, token, googleId };
	// 	dispatch(googleSignIn({ result, navigate, toast }));
	// };
	return (
		<div className="login-container">
			<MDBCard alignment="center">
				<MDBIcon fas icon="user-circle" className="fa-2x mt-5" />
				<h5>Sign In</h5>
				<MDBCardBody>
					<MDBValidation
						onSubmit={handleSubmit}
						noValidate
						className="row g-3"
					>
						<MDBValidationItem
							className="col-md-12"
							feedback="Please enter a valid email"
							invalid
							tooltip
						>
							<MDBInput
								label="Email"
								type="email"
								value={email}
								name="email"
								id="validationCustom01"
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
						<MDBValidationItem
							className="col-md-12"
							feedback="Please provide your password"
							invalid
							tooltip
						>
							<MDBInput
								label="Password"
								type="password"
								value={password}
								name="password"
								id="validationCustom02"
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
						<div className="col-12">
							<MDBBtn style={{ width: "100%" }} className="mt-2">
								{loading && (
									<MDBSpinner
										size="sm"
										role="status"
										tag="span"
										className="me-2"
									/>
								)}
								Login
							</MDBBtn>
						</div>
					</MDBValidation>
				</MDBCardBody>
				<br />
				<div id="googleSignUpDiv" className="mx-auto"></div>
				<MDBCardFooter>
					<Link to="/register">
						<p>Don't have an account? Sign Up</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
};

export default Login;
