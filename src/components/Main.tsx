import {Route, Routes} from "react-router-dom";
import {navItems} from "../utils/constants.ts";
import Home from "../pages/Home.tsx";
import Products from "./Products.tsx";
import EditProduct from "./EditProduct.tsx";
import Orders from "./Orders.tsx";
import OrderDetails from "./OrderDetails.tsx";

const Main = () => {

  return (
    <div className="container-fluid px-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-3 bg-body-tertiary rounded-3">
                    <li className="breadcrumb-item">
                        <a className="link-body-emphasis" href="#">
                            <svg className="bi" width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#house-door-fill"></use>
                            </svg>
                            <span className="visually-hidden">Home</span>
                        </a>
                    </li>
                    <li className="breadcrumb-item">
                        <a
                            className="link-body-emphasis fw-semibold text-decoration-none"
                            href="#"
                        >Library</a
                        >
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>

        <Routes>
        {[`/`, `/${navItems[0].route}`].map(path => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        <Route path="/products" element={<Products />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />

        <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />

      </Routes>
    </div>
  )
}

export default Main
