import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = () => {
    const { id } = useParams();

    const [details, setDetails] = useState({
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

    const [sorting, setSorting] = useState({date: "down"});

    const [orders, setOrders] = useState([]);

    const handleSorting = () => {
        if (sorting.date === "down") {
            setSorting({...sorting, date: "up"});
        } else {
            setSorting({...sorting, date: "down"});
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3333/user/details', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get('http://localhost:3333/user/orders', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="text-left">
            <div className="mt-8 w-full text-5xl font-bold capitalize">Hello, {details.name}</div>
            <div className="mt-4"><i className="fas fa-map-marker-alt mr-2"></i>{details.address}</div>
            <div className="mt-16 w-full">
                <div className="flex justify-between">
                    <button onClick={handleSorting}><span className="text-lg">Date</span><i className={`far fa-long-arrow-${sorting.date} ml-2`}></i></button>
                    <Link to="new-order" className="text-lg"><i className="far fa-plus"></i><span className="ml-2">Place New Order</span></Link>
                </div>
                {
                    orders.length === 0 ? (
                        <div className="mt-8 w-full p-6 text-5xl font-bold text-neutral-600 text-center">No Order Available</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6 mt-8 w-full py-4 text-left">
                            {
                                orders.sort((a, b) => sorting.date === "up" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)).map((order, key) => (
                                    <div key={key} className="py-3 px-6 bg-neutral-200 hover:bg-neutral-300">
                                        <div className="text-2xl font-bold">{order.unit.capacity}Kg - {order.unit.type}</div>
                                        <div className="flex flex-wrap justify-between gap-2"><span>Order ID</span><span>{order._id}</span></div>
                                        <div className="mt-4 text-xl font-bold">Price</div>
                                        <div className="flex flex-wrap justify-between gap-2 mt-2">
                                            <span>Product Cost</span>
                                            <span>₹{order.product.price}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <span>Delivery Cost</span>
                                            <span>₹{order.item.price}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <span>Order Fee</span>
                                            <span>₹{order.surcharge}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <span>Tax</span>
                                            <span>₹{order.tax}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-between gap-2 mt-2 font-bold">
                                            <span>Total</span>
                                            <span>₹{order.total}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default UserOrders;