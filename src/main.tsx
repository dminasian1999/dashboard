import  {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./app/store";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "@fortawesome/fontawesome-free/css/all.min.css";

import {BrowserRouter} from "react-router-dom";

import App from "./App.tsx";

const container = document.getElementById("root");


if (!container) {
    throw new Error("Root element with ID 'root' was not found in the document.");
}

const root = createRoot(container);

root.render(
    <StrictMode>
            <BrowserRouter>
                <Provider store={store}>

                    <App />

                </Provider>
            </BrowserRouter>
    </StrictMode>
);
