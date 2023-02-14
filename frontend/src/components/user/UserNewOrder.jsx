import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserNewOrder = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [userDetails, setUserDetails] = useState({
        _id: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        zone: {
            _id: "",
            zone: ""
        },
        date: ""
    });

    const [units, setUnits] = useState([]);

    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedUnitId, setSelectedUnitId] = useState("");

    const [bestOrder, setBestOrder] = useState(null);

    const handleUnitChange = (e) => {
        const selectedUnit = e.target.value;
        units.forEach((unit) => {
            if (`${unit.capacity}Kg - ${unit.type}` === selectedUnit) {
                setSelectedUnitId(unit._id);
            }
        })
        setSelectedUnit(selectedUnit);
    };

    const handleNewOrder = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3333/user/get-best-order?zone=${userDetails.zone._id}&unit=${selectedUnitId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res.data);
                setBestOrder(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const placeOrder = (e) => {
        axios.post('http://localhost:3333/user/place-order', {
            bestPrice: bestOrder
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res);
                navigate(`/${id}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3333/user/details', {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                setUserDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:3333/unit')
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="mt-8 w-full py-4 px-6 text-left">
            <div className="mx-auto max-w-sm">
                <Link to={`/${id}`} className="inline-flex items-center gap-4 mt-8 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
            </div>
            <form className="flex flex-col items-start my-12 mx-auto w-full max-w-xs" onSubmit={handleNewOrder}>
            <div className="flex flex-col items-start w-full">
                    <label className="text-lg" htmlFor="product-type">Product Type *</label>
                    <div className="mt-2 w-full">
                        <input className="w-full py-1 px-2 border border-black" id="product-type" list="product-type-list" value={selectedUnit} onChange={handleUnitChange} required />
                    </div>
                    <datalist id="product-type-list">
                        {
                            units.map((unit, index) => (
                                <option key={index} value={`${unit.capacity}Kg - ${unit.type}`} />
                            ))
                        }
                    </datalist>
                </div>
                <div className="mt-8 w-full">
                    <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Search</button>
                </div>
            </form>
            {
                !bestOrder ? (
                    <div className="mt-24 max-w-sm mx-auto text-2xl text-neutral-600 font-bold text-center">No order available</div>
                ) : (
                    <div className="mt-20 max-w-sm mx-auto">
                        <div className="text-3xl font-bold">Order Details</div>
                        <div className="mt-8 text-xl font-bold">{selectedUnit}</div>
                        <div className="flex justify-between mt-4 w-full text-lg"><span>Cylinder Price</span><span>₹{bestOrder.product.price}</span></div>
                        <div className="flex justify-between text-lg"><span>Delivery Charges</span><span>₹{bestOrder.item.price}</span></div>
                        <div className="flex justify-between text-lg"><span>Order Fees</span><span>₹{bestOrder.surcharge}</span></div>
                        <div className="flex justify-between text-lg"><span>Tax</span><span>₹{bestOrder.tax}</span></div>
                        <div className="flex justify-between mt-4 text-lg font-bold"><span>Total</span><span>₹{bestOrder.price}</span></div>
                        <div className="mt-12 w-full">
                            <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default UserNewOrder;