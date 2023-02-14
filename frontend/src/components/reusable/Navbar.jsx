import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = (props) => {
    return (
        <>
            <nav className="flex justify-evenly mx-auto w-full px-4 text-lg">
                <Link to={props.primary.link} className="hover:underline">{props.primary.title}</Link>
                <Link to={props.secondary.link} className="hover:underline">{props.secondary.title}</Link>
                <Link to="/about-us" className="hover:underline">About Us</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
                <Link to="login" className="hover:underline">Login</Link>
            </nav>
            
            <Logo />            
        </>
    );
};

export default Navbar;