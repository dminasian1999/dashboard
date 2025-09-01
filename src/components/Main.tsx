import {Route, Routes} from "react-router-dom";
import {navItems} from "../utils/constants.ts";
import Home from "../pages/Home.tsx";

const Main = () => {

  return (
    <div className="container-fluid p-0">
      <Routes>
        {[`/`, `/${navItems[0].route}`].map(path => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        {/*<Route path="/products" element={<Products />} />*/}

      </Routes>
    </div>
  )
}

export default Main
