import React from "react";
import "./Footer.css";
const Footer = () => {

    const footerStyle= {
        "color": "#ffffff",
        "textDecoration": "none"
    }
    return(<div>
  <footer>
            <p><a style={footerStyle} href="https://vcard.miomideal.com">© Mio Mideal</a></p>
        </footer>
    </div>
      
    )
}
export default Footer;