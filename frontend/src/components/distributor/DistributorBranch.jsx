// const { useParams } = require("react-router-dom");
// const { useEffect, useState } = require("react");
const { Outlet } = require("react-router-dom");

const DistributorBranch = () => {
    // const { id, branchId } = useParams();

    // useEffect(() => {
    //     // console.log(id, branchId);
    // });

    return (
        <Outlet />
    );
};

export default DistributorBranch;