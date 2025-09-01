const Header = () => {
    return (
        <nav className="navbar  bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#staticBackdrop"
                        aria-controls="staticBackdrop"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="offcanvas offcanvas-start bg-dark " tabIndex={-1}
                     id="staticBackdrop"
                     aria-labelledby="staticBackdropLabel"
                     data-bs-scroll="true"
                     data-bs-backdrop="false"

                    >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
                        <button type="button" className="btn-close  bg-light" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body ">
                        <ul className="navbar-nav  justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item ">
                                <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light " href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
