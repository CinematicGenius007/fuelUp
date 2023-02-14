import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SupplierProducts = () => {
    const { id, branchId } = useParams();

    const [branch, setBranch] = useState({_id: branchId, name: "", address: "", phone: "", zone: {_id: "", zone: ""}});

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3333/supplier/supplyingEntity/${branchId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(res => {
                setBranch(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        
        axios.get(`http://localhost:3333/supplier/supplyingEntity/${branchId}/products`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branchId]);
    
    return (
        <div className="w-full text-left">
            <Link to={`/supplier/${id}`}><i className="far fa-long-arrow-left mt-8"></i><span className="ml-2">Go Back</span></Link>
            <div>
                <div className="mt-8 w-full text-4xl font-bold">
                    <span>{branch.name} ({branch.zone.zone})</span>
                </div>
                <div className="mt-4">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <span>{branch.address}</span>
                </div>
                <div className="mt-2">
                    <i className="fas fa-phone mr-2"></i>
                    <span>{branch.phone}</span>
                </div>
            </div>

            <div className="mt-8 py-4 px-6">
                <div className="flex items-center justify-between w-full">
                    <div className="text-2xl underline">Products</div>
                    <Link to="add-product" className="text-lg"><i className="far fa-plus"></i><span className="ml-2">Add Product</span></Link>
                </div>
                {
                    products.length === 0 ? (
                        <div className="mt-8 w-full p-6 text-5xl font-bold text-neutral-600 text-center">No Products Available</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-6 mt-8 w-full py-4 text-left">
                            {
                                products.map((product, key) => (
                                    <div className="pt-3 pb-4 px-6 bg-neutral-200" key={key}>
                                        <div className="text-xl font-bold">{product.unit.capacity}Kg - {product.unit.type}</div>
                                        <div className="mt-4"><i className="fas fa-money-bill-alt mr-2"></i>{product.price}</div>
                                        <div><i className="fas fa-warehouse-alt mr-2"></i>{product.maxOutputPerDay}</div>
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

export default SupplierProducts;