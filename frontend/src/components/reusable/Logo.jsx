import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <>
            <hr className="my-16 mx-auto w-[calc(100%_-_2rem)] border-black" />
            
            <div className="w-max mx-auto px-4 py-2 bg-white -translate-y-24 rounded">
                <Link to="/" className="flex items-center gap-4 text-4xl font-bold">
                    <i className="fas fa-burn"></i>
                    <span>fuelUp</span>
                </Link>
            </div>
        </>
    );
};

export default Logo;