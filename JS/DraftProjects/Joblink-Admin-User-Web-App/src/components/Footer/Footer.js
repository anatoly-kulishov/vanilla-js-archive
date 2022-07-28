import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import FooterNavigation from "../../navigation/FooterNavigation";
import './Footer.scss';

const Footer = () => {
    const fullYear = new Date().getFullYear();

    return (
        <ErrorBoundary>
            <footer className="app-footer mt-auto">
                <div className="app-footer__wrapper">
                    <FooterNavigation/>
                    <div className="copyright">© {fullYear} - All Rights Reserved</div>
                </div>
            </footer>
        </ErrorBoundary>
    );
}

export default Footer;
