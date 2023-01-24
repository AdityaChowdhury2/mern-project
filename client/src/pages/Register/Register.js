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

import "./Register.css";
import { register } from "../../redux/features/authSlice";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};
// const google = window.google || "";

const Register = () => {
	const [formValue, setFormValue] = useState(initialState);
	const { loading, error } = useSelector((state) => ({ ...state.auth }));
	const { email, password, firstName, lastName, confirmPassword } = formValue;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleCallbackResponse = (response) => {};
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
		if (password !== confirmPassword) {
			return toast.error("Password Should be matched");
		}
		if (email && password && firstName && lastName && confirmPassword) {
			dispatch(register({ formValue, navigate, toast }));
		}
	};
	const onInputChange = (e) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	return (
		<div className="register-container">
			<MDBCard alignment="center">
				<MDBIcon fas icon="user-circle" className="fa-2x mt-5" />
				<h5>Sign Up</h5>
				<MDBCardBody>
					<MDBValidation
						onSubmit={handleSubmit}
						noValidate
						className="row g-3"
					>
						<MDBValidationItem
							className="col-md-6"
							feedback="Please provide your first Name"
							invalid
							tooltip
						>
							<MDBInput
								label="First Name"
								type="text"
								value={firstName}
								name="firstName"
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
						<MDBValidationItem
							className="col-md-6"
							feedback="Please provide your last Name"
							invalid
							tooltip
						>
							<MDBInput
								label="Last Name"
								type="text"
								value={lastName}
								name="lastName"
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
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
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
						<MDBValidationItem
							className="col-md-12"
							feedback="Please provide your password again"
							invalid
							tooltip
						>
							<MDBInput
								label="Confirm Password"
								type="password"
								value={confirmPassword}
								name="confirmPassword"
								onChange={onInputChange}
								required
							></MDBInput>
						</MDBValidationItem>
						<div className="col-12">
							<MDBBtn
								style={{ width: "100%" }}
								className="mt-2 btn-lg"
							>
								{loading && (
									<MDBSpinner
										size="sm"
										role="status"
										tag="span"
										className="me-2"
									/>
								)}
								Register
							</MDBBtn>
						</div>
						{/* {console.log(SocialLogin)} */}
						<hr className="my-4" />
					</MDBValidation>
				</MDBCardBody>
				<br />
				<div id="googleSignUpDiv" className="mx-auto"></div>
				<MDBCardFooter>
					<Link to="/login">
						<p>Already have an account ? Sign In</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
};

export default Register;
