import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DistributorBranches = () => {
    const { id } = useParams();

    const [distributorInfo, setDistributorInfo] = useState({
        id: id, 
        name: "", 
        email: "", 
        address: "", 
        phone: 0,
        date: ""
    });

    const [sorting, setSorting] = useState({ date: "down" });

    const [branches, setBranches] = useState([]);

    const handleSorting = (e) => {
        e.preventDefault();
        if (sorting.date === "down") {
            setSorting({ date: "up" });
        } else {
            setSorting({ date: "down" });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3333/distributor/details', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setDistributorInfo({
                    ...distributorInfo,
                    name: res.data.name,
                    email: res.data.email,
                    address: res.data.address,
                    phone: res.data.phone,
                    date: res.data.date
                });
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:3333/distributor/distributingEntities', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setBranches(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distributorInfo.id]);

    return (
        <div className="text-left">
            <div className="mt-8 w-full text-5xl font-bold">Welcome, {distributorInfo.name}</div>
            <div className="mt-4 p-6">
                <div className="text-2xl underline">Branches</div>
                <div className="flex justify-between mt-8 w-full">
                    <button onClick={handleSorting}><span className="text-lg">Date</span><i className={`far fa-long-arrow-${sorting.date} ml-2`}></i></button>
                    <Link to="new-branch" className="text-lg"><i className="far fa-plus"></i><span className="ml-2">Open New Branch</span></Link>
                </div>
                {
                    branches.length === 0 ? (
                        <div className="mt-8 w-full p-6 text-5xl font-bold text-neutral-600 text-center">No Branch Available</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6 mt-8 w-full py-4 text-left">
                            {
                                branches.sort((a, b) => sorting.date === "up" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)).map((branch, key) => (
                                    <Link className="py-3 px-6 bg-neutral-200 hover:bg-neutral-300" to={branch._id} key={key}>
                                        <div className="text-xl font-bold">{branch.name} ({branch.zone.zone})</div>
                                        <div className="mt-4"><i className="fas fa-map-marker-alt mr-2"></i>{branch.address}</div>
                                        <div className="mt-2"><i className="fas fa-phone mr-2"></i>{branch.phone}</div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DistributorBranches;