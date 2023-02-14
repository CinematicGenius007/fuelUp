import { Link, useNavigate } from "react-router-dom";
import Logo from "../reusable/Logo";
import { useEffect, useState } from "react";
import axios from "axios";

const UserRegister = () => {
    const navigate = useNavigate();

    const [zones, setZones] = useState([]);

    const [userDetails, setUserDeatails] = useState({
        name: "",
        email: "",
        password: "",
        zone: "",
        address: "",
        phone: "",
    });

    const [selectedZone, setSelectedZone] = useState("");

    const handleZoneChange = (e) => {
        const selectedZone = e.target.value;
        zones.forEach((zone) => {
            if (zone.zone === selectedZone) {
                setUserDeatails({ ...userDetails, zone: zone._id });
            }
        })
        setSelectedZone(selectedZone);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserDeatails({ ...userDetails, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3333/user/auth/register", userDetails)
            .then((res) => {
                console.log(res);
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3333/zone')
            .then((res) => {
                setZones(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="h-full w-full mx-auto px-6 pb-6 max-w-7xl">
            <Logo />
            <main className="mx-auto max-w-2xl p-6">
                <Link to="/" className="flex items-center gap-4 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
                <form className="flex flex-col items-start my-16 mx-auto w-full max-w-xs" onSubmit={handleSubmit}>
                    <div className="text-4xl font-bold">One Last Step,</div>
                    <div className="flex flex-col items-start mt-12 w-full">
                        <label className="text-lg" htmlFor="name">Name *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="name" value={userDetails.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="email">Email Address *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" type="email" id="email" value={userDetails.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="password">Password *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" type="password" id="password" value={userDetails.password} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="zone">Zone *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="zone" value={selectedZone} onChange={handleZoneChange} list="zone-list" required />
                        </div>
                        <datalist id="zone-list">
                            {
                                zones.map((zone, key) => (
                                    <option key={key} value={zone.zone} />
                                ))
                            }
                        </datalist>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="address">Address *</label>
                        <div className="mt-2 w-full">
                            <textarea className="w-full py-1 px-2 border border-black resize-none" id="address" value={userDetails.address} onChange={handleChange} maxLength={200} required></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="phone">Phone *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" type="number" id="phone" value={userDetails.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Register</button>
                    </div>
                    <Link to="/login" className="mt-8 w-full text-left">Already a user?&nbsp;&nbsp;&nbsp;Login now <i className="fal fa-long-arrow-right inline-block"></i></Link>
                </form>
            </main>
        </div>
    );
};

export default UserRegister;