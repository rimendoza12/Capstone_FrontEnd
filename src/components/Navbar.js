import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {

	const navigate = useNavigate();

	const isAuthenticated = localStorage.getItem('login_token');
	
	const handleLogin =() => {
		localStorage.setItem('login_token', 'your_login_token_here');
		navigate('/login');
	}

	const handleLogout =() => {
		localStorage.removeItem('login_token');
		navigate('/home');
	}

	const handleBooking =() => {
		navigate('/login');
	}

	return (
		<>
			{/* {isAuthenticated ? 
				<div className='home-menu'>
						<Nav>
							<NavMenu>
							<IconButton activestyle='true'>
									<LogoutIcon onClick={handleLogout} />
								</IconButton>
							</NavMenu>
						</Nav>
				</div>
			:  */}
				<div className='home-menu'>
				<link href="https://fonts.googleapis.com/css?family=Russo+One" rel="stylesheet" />
				<svg className='logosvg' viewBox="0 -15 1320 100" preserveAspectRatio="none">
					<text x="50%" y="20%" dy=".35em" textAnchor="middle">
						Arellano Music Studio
					</text>
				</svg>
				<Nav>
					<NavMenu>
						 <NavLink to="/" activestyle='true'>
							Home
						</NavLink>
						<NavLink to="/about" activestyle='true'>
							About
						</NavLink>
						<NavLink to="/contact" activestyle='true'>
							Contact Us
						</NavLink>  
						<NavLink to="/packages" activestyle='true'>
							Packages
						</NavLink>
						<NavLink to="/teacher" activestyle='true'>
							Teachers
						</NavLink>
						
					</NavMenu>
					<NavMenu>
					{isAuthenticated ? (
								<IconButton activestyle='true'>
									<LogoutIcon onClick={handleLogout} />
								</IconButton>
							) : (
								<IconButton to="/login" activestyle='true'>
									<LoginIcon onClick={handleLogin} />
								</IconButton>
							)}
							<Button activestyle='true' onClick={handleBooking}>
								Book Now!
							</Button>
					</NavMenu>
				</Nav>
				
			</div>
			

	 
		</>
	);
};

export default Navbar;
