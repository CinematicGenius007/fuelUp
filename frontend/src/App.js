import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/user/Home';
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import UserInterface from './components/user/UserInterface';
import UserOrders from './components/user/UserOrders';
import UserNewOrder from './components/user/UserNewOrder';

import SupplierHome from './components/supplier/SupplierHome';
import SupplierLogin from './components/supplier/SupplierLogin';
import SupplierRegister from './components/supplier/SupplierRegister';
import SupplierInterface from './components/supplier/SupplierInterface';
import SupplierBranches from './components/supplier/SupplierBranches';
import SupplierNewBranch from './components/supplier/SupplierNewBranch';
import SupplierBranch from './components/supplier/SupplierBranch';
import SupplierProducts from './components/supplier/SupplierProducts';
import SupplierAddProduct from './components/supplier/SupplierAddProduct';
// import SupplierProduct from './components/supplier/SupplierProduct';

import DistributorHome from './components/distributor/DistributorHome';
import DistributorLogin from './components/distributor/DistributorLogin';
import DistributorRegister from './components/distributor/DistributorRegister';
import DistributorInterface from './components/distributor/DistributorInterface';
import DistributorBranches from './components/distributor/DistributorBranches';
import DistributorNewBranch from './components/distributor/DistributorNewBranch';
import DistributorBranch from './components/distributor/DistributorBranch';
import DistributorItems from './components/distributor/DistributorItems';
import DistributorAddItem from './components/distributor/DistributorAddItem';

function App() {
  return (
    <div className="App min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/:id" element={<UserInterface />}>
          <Route path="" element={<UserOrders />} />
          <Route path="new-order" element={<UserNewOrder />} />
          <Route path=":orderId" element={<div></div>} />
          <Route path="settings" element={<div></div>} />
        </Route>
        
        <Route path="/supplier" element={<SupplierHome />} />
        <Route path="/supplier/login" element={<SupplierLogin />} />
        <Route path="/supplier/register" element={<SupplierRegister />} />
        <Route path="/supplier/:id" element={<SupplierInterface />}>
          <Route path="" element={<SupplierBranches />} />
          <Route path="new-branch" element={<SupplierNewBranch />} />
          <Route path=":branchId" element={<SupplierBranch />}>
            <Route path="" element={<SupplierProducts />} />
            <Route path="add-product" element={<SupplierAddProduct />} />
            <Route path="settings" element={<div></div>} />
          </Route>
          <Route path="settings" element={<div></div>} />
        </Route>
        
        <Route path="/distributor" element={<DistributorHome />} />
        <Route path="/distributor/login" element={<DistributorLogin />} />
        <Route path="/distributor/register" element={<DistributorRegister />} />
        <Route path="/distributor/:id" element={<DistributorInterface />}>
          <Route path="" element={<DistributorBranches />} />
          <Route path="new-branch" element={<DistributorNewBranch />} />
          <Route path=":branchId" element={<DistributorBranch />}>
            <Route path="" element={<DistributorItems />} />
            <Route path="add-item" element={<DistributorAddItem />} />
            <Route path="settings" element={<div></div>} />
          </Route>
          <Route path="settings" element={<div></div>} />
        </Route>

        <Route path="/about-us" element={<div>404</div>} />
        <Route path="/contact" element={<div>404</div>} />
        <Route path="/docs" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
