import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../reusable/Logo";
import axios from "axios";

const DistributorRegister = () => {
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    });

    // const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3333/distributor/auth/register", details)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("Registered successfully");
                    navigate("/distributor/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="h-full w-full mx-auto px-6 pb-6 max-w-7xl">
            <Logo />
            <main className="mx-auto max-w-2xl p-6">
                <Link to="/distributor" className="flex items-center gap-4 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
                <form className="flex flex-col items-start my-16 mx-auto w-full max-w-xs" onSubmit={handleSubmit}>
                    <div className="text-4xl font-bold">One Last Step,</div>
                    <div className="flex flex-col items-start mt-12 w-full">
                        <label className="text-lg" htmlFor="name">Name *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="name" value={details.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="email">Email Address *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="email" value={details.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="password">Password *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="password" value={details.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="address">Address *</label>
                        <div className="mt-2 w-full">
                            <textarea className="w-full py-1 px-2 border border-black resize-none" id="address" value={details.address} onChange={handleChange} maxLength={200} required></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="phone">Phone *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="phone" value={details.phone} onChange={handleChange} type="number" required />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Register</button>
                    </div>
                    <Link to="/distributor/login" className="mt-8 w-full text-left">Already a user?&nbsp;&nbsp;&nbsp;Login now <i className="fal fa-long-arrow-right inline-block"></i></Link>
                </form>
            </main>
        </div>
    );
};

export default DistributorRegister;