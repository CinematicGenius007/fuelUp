import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SupplierAddProduct = () => {
    const navigate = useNavigate();

    const { id, branchId } = useParams();

    const [units, setUnits] = useState([]);

    const [newProductData, setNewProductData] = useState({
        unit: "",
        price: "",
        maxOutputPerDay: "",
        supplyingEntity: branchId
    });

    const [selectedUnit, setSelectedUnit] = useState("");

    const handleNewProductData = (e) => {
        setNewProductData({
            ...newProductData,
            [e.target.id]: e.target.value
        });
    };

    const handleUnitChange = (e) => {
        const selectedUnit = e.target.value;
        units.forEach((unit) => {
            if (`${unit.capacity}Kg - ${unit.type}` === selectedUnit) {
                setNewProductData({...newProductData, unit: unit._id});
            }
        })
        setSelectedUnit(selectedUnit);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3333/supplier/product', newProductData, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res);
                navigate(`/supplier/${id}/${branchId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:3333/unit')
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [branchId]);

    return (
        <div className="mt-8 w-full py-4 px-6 text-left">
            <div className="mx-auto max-w-sm">
                <Link to={`/supplier/${id}/${branchId}`} className="flex items-center gap-4 mt-8 text-lg text-left">
                    <i className="fal fa-long-arrow-left inline-block translate-y-0.5"></i>
                    <span>Go Back</span>
                </Link>
                <form className="flex flex-col items-start my-12 mx-auto w-full max-w-xs" onSubmit={handleAddProduct}>
                    <div className="text-4xl font-bold">Add Product</div>
                    <div className="flex flex-col items-start mt-12 w-full">
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
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="price">Price *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="price" value={newProductData.price} onChange={handleNewProductData} type="number" required />
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-4 w-full">
                        <label className="text-lg" htmlFor="maxOutputPerDay">Max Output / Day *</label>
                        <div className="mt-2 w-full">
                            <input className="w-full py-1 px-2 border border-black" id="maxOutputPerDay" value={newProductData.maxOutputPerDay} onChange={handleNewProductData}  type="number" required />
                        </div>
                    </div>
                    <div className="mt-8 w-full">
                        <button className="w-full py-2 px-4 bg-gray-300 hover:bg-gray-400" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierAddProduct;