import "./App.css"
import {ProductsContext} from "./utils/context.ts"
import {useState} from "react";
import type {ProductT, ReceiptT} from "./utils/types.ts";
import Header from "./components/Header.tsx";

const App = () => {

    const [products, setProducts] = useState([] as ProductT[])
    const [receipts, setReceipts] = useState([] as ReceiptT[])
    const [language, setLanguage] = useState("English")
    return (
        <div className="container-fluid row m-0 p-0">
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
                <Header/>
                {/*<QuickViewPopup />*/}

            </ProductsContext.Provider>
        </div>
    )
}

export default App
