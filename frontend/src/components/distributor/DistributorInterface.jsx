import { Outlet, useNavigate } from "react-router-dom";

const DistributorInterface = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/distributor");
    };

    return (
        <div className="min-h-screen w-full py-4 px-8">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-2xl font-bold">
                    <i className="fas fa-burn"></i>
                    <span>fuelUp</span>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 py-1 px-3 text-lg">
                        <i className="fas fa-cog md:hidden translate-y-0.5"></i>
                        <span className="hidden md:inline">Settings</span>
                    </div>
                    <button className="flex items-center gap-2 py-1 px-3 text-lg" onClick={handleLogout}>
                        <i className="fas fa-sign-out md:hidden translate-y-0.5"></i>
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>

            <hr className="mt-4 w-[10rem] border-black" />

            <Outlet />
        </div>
    );
};

export default DistributorInterface;