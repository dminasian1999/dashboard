import DraweerHeader from "./DraweerHeader.tsx";
import DraweerBody from "./DraweerBody.tsx";
import DraweerSearch from "./DraweerSearch.tsx";

const Drawer = () => {
    return (
        <nav className="navbar  bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#staticBackdrop"
                        aria-controls="staticBackdrop"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>
                <DraweerSearch/>

                <div className="offcanvas offcanvas-start bg-dark " tabIndex={-1}
                     id="staticBackdrop"
                     aria-labelledby="staticBackdropLabel"
                     data-bs-scroll="true"
                     data-bs-backdrop="false"

                    >
                    <DraweerHeader/>
                    <hr className="border-white "></hr>
                    <DraweerBody/>

                </div>
            </div>
        </nav>
    )
}

export default Drawer
