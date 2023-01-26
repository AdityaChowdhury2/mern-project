import {
	MDBBtn,
	MDBCollapse,
	MDBContainer,
	MDBIcon,
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBNavbarNav,
	MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import "./Header.css";

export const Header = (props) => {
	const { toggleTheme, theme } = props;

	const [show, setShow] = useState(false);
	return (
		<MDBNavbar
			fixed="top"
			expand="lg"
			style={{ backgroundColor: "#f0e6ea" }}
		>
			<MDBContainer>
				<MDBNavbarBrand
					style={{
						color: "#606080",
						fontWeight: "600",
						fontSize: "22px",
					}}
				>
					Touropedia
				</MDBNavbarBrand>
				<MDBNavbarToggler
					type="button"
					aria-label="Toggle-navigation"
					aria-expanded="false"
					onClick={() => setShow(!show)}
					style={{ color: "#606080" }}
				>
					<MDBIcon icon="bars" fas />
				</MDBNavbarToggler>
				<MDBCollapse show={show} navbar>
					<MDBNavbarNav
						right
						fullWidth={false}
						className="mb-2 mb-lg-0"
					>
						<MDBNavbarItem>
							<MDBNavbarLink href="/">
								<p className="header-text">Home</p>
							</MDBNavbarLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<MDBNavbarLink href="/addTour">
								<p className="header-text">Add Tour</p>
							</MDBNavbarLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<MDBNavbarLink href="/dashboard">
								<p className="header-text">Dashboard</p>
							</MDBNavbarLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<MDBNavbarLink href="/login">
								<p className="header-text">Logout</p>
							</MDBNavbarLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<MDBNavbarLink href="/login">
								<p className="header-text">Login</p>
							</MDBNavbarLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<MDBNavbarLink href="#">
								<MDBBtn onClick={toggleTheme} block>
									<MDBIcon fas icon="moon" />
								</MDBBtn>
							</MDBNavbarLink>
						</MDBNavbarItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBContainer>
		</MDBNavbar>
	);
};
