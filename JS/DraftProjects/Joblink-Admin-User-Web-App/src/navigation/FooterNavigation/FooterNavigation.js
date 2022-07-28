import React from 'react';
import {Link} from "react-router-dom";

const FooterNavigation = () => {
    return (
        <>
            <Link className="mr-3" to="/terms-conditions"><span className='link'>Terms & Conditions</span></Link>
            <Link to="/privacy-policy"><span className="link">Privacy Policy</span></Link>
        </>
    )
}

export default FooterNavigation;