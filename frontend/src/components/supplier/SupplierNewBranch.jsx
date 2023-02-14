import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SupplierNewBranch = () => {
    const { id } = useParams();

    const [zones, setZones] = useState([]);

    const [newBranchData, setNewBranchData] = useState({
        name: "",
        address: "",
        phone: "",
        zone: "",
    });

    const [selectedZone, setSelectedZone] = useState("");

    const handleInputChange = (e) => {
        setNewBranchData({ ...newBranchData, [e.target.id]: e.target.value });
    };

    const handleZoneChange = (e) => {
        const selectedZone = e.target.value;
        zones.forEach((zone) => {
            if (zone.zone === selectedZone) {
                setNewBranchData({ ...newBranchData, zone: zone._id });
            }
        });
        setSelectedZone(selectedZone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3333/supplier/supplyingEntity", newBranchData, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get("http://localhost:3333/zone")
            .then(res => {
                setZones(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="mt-8 w-full py-4 px-6 text-left">
            <div className="mx-auto max-w-sm">
                <Link to={`/supplier/${id}`} className="flex items-center gap-4 mt-8 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
                <form className="flex flex-col items-start my-12 mx-auto w-full max-w-xs" onSubmit={handleSubmit}>
                    <div className="text-4xl font-bold">New Branch</div>
                    <div className="flex flex-col items-start mt-12 w-full">
                        <label className="text-lg" htmlFor="name">Name *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="name" value={newBranchData.name} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="zone">Zone *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="zone" list="zone-list" value={selectedZone} onChange={handleZoneChange} required />
                        </div>
                        <datalist id="zone-list">
                            {zones.map((zone, index) => (
                                <option key={index} value={zone.zone} data-value={zone._id} />
                            ))}
                        </datalist>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="address">Address *</label>
                        <div className="mt-2 w-full">
                            <textarea className="w-full py-1 px-2 border border-black resize-none" id="address" value={newBranchData.address} onChange={handleInputChange} maxLength={200} required></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="phone">Phone *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="phone" value={newBranchData.phone} onChange={handleInputChange} type="number" required />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierNewBranch;