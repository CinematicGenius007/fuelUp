import { Link, useNavigate } from "react-router-dom";
import Logo from "../reusable/Logo";
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials({ ...credentials, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3333/user/auth/login", credentials)
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate(`/${res.data.user._id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="h-full w-full mx-auto px-6 pb-6 max-w-7xl">
            <Logo />
            <main className="mx-auto max-w-2xl p-6">
                <Link to="/" className="flex items-center gap-4 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
                <form className="flex flex-col items-start my-16 mx-auto w-full max-w-xs" onSubmit={handleSubmit}>
                    <div className="text-4xl font-bold">Welcome Back,</div>
                    <div className="flex flex-col items-start mt-12 w-full">
                        <label className="text-lg">Email Address</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" type="email" id="email" value={credentials.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg">Password</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" type="password" id="password" value={credentials.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Login</button>
                    </div>
                    <Link to="/register" className="mt-8 w-full text-left">New here?&nbsp;&nbsp;&nbsp;Register now <i className="fal fa-long-arrow-right inline-block"></i></Link>
                </form>
            </main>
        </div>
    );
};

export default UserLogin;