import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <hr className="mt-16 mx-auto w-[calc(100%_-_2rem)] border-black" />
            <footer className="mt-8 mx-auto w-full px-4 text-lg">
                <p className="flex flex-wrap gap-x-10 gap-y-2 mt-10 text-left">
                    <span>CopyRight &copy; {year}. All Rights Reserved</span>
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/supplier" className="hover:underline">Supplier</Link>
                    <Link to="/distributor" className="hover:underline">Distributor</Link>
                    <Link to="/about-us" className="hover:underline">About Us</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/docs" className="hover:underline">Docs</Link>
                </p>
            </footer>
        </>
    );
};

export default Footer;