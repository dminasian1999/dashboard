import {ProductsContext} from "./utils/context.ts"
import  {useState} from "react";
import type {ProductT, ReceiptT} from "./utils/types.ts";
import Drawer from "./components/Drawer.tsx";
import Main from "./components/Main.tsx";
import "./App.css"
import Drawer1 from "./components/Drawer1.tsx";

const App = () => {

    const [products, setProducts] = useState([] as ProductT[])
    const [receipts, setReceipts] = useState([] as ReceiptT[])
    const [language, setLanguage] = useState("English")
    return (
        <div className="container-fluid p-0">
            <ProductsContext.Provider
                value={{
                    products,
                    setProducts,
                    receipts,
                    setReceipts,
                    language,
                    setLanguage,
                }}
            >

                <Drawer/>
                <Main/>


                {/*<div className="row mt-5">*/}
                {/*</div>*/}

            </ProductsContext.Provider>
        </div>
    )
}

export default App
