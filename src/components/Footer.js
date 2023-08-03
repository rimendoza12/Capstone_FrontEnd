import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';


const Footer = () => {
    
    return <footer id="sm-footer">
                <a href="https://www.facebook.com/profile.php?id=100092203615170" className="foot"><FacebookIcon /> Arellano Music Studio</a>
                <a href="mailto:vinaemailcode@gmail.com?Subject=Arellano%20Music%20Studio"className="foot"><GoogleIcon /> vinaemailcode@gmail.com</a>
                <span className="foot"><PhoneIcon /> +63 926 737 2307</span>
           </footer>;
};
  
export default Footer;