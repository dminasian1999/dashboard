import {Link} from "react-router-dom";
import {navItems} from "../utils/constants.ts";

const DraweerBody = () => {
    return (
        <div className="offcanvas-body ">
            <ul className="navbar-nav d-flex gap-4 align-items-start flex-grow-1 ">
                {navItems.map(item => (
                    <li className="nav-item text-light ">
                        <Link to={item.route} className='text-decoration-none text-light h4 mt-2 :&:hover text-'>
                            <div
                                className={`${item.icon} me- fs-5 text-warning `}
                                onMouseEnter={e => (e.currentTarget.className = `${item.icon} me-3 fs-5 text-danger`)}
                                onMouseLeave={e => (e.currentTarget.className = `${item.icon} me-3 fs-5 text-warning`)}
                            >
                                <span className={'h4 ms-3'}>{item.title}</span>
                            </div>
                            {/*{item.title}*/}
                        </Link>
                    </li>
                ))}

                {/*<li className="nav-item ">*/}
                {/*    <div className="fa fa-edit text-white">*/}

                {/*        <a className="nav-link active text-light" aria-current="page" href="#">Home</a>*/}

                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*    <a className="nav-link text-light" href="#">Link</a>*/}
                {/*</li>*/}
                {/*<li className="nav-item dropdown">*/}
                {/*    <a className="nav-link dropdown-toggle text-light " href="#" role="button" data-bs-toggle="dropdown"*/}
                {/*       aria-expanded="false">*/}
                {/*        Dropdown*/}
                {/*    </a>*/}
                {/*    <ul className="dropdown-menu">*/}
                {/*        <li><a className="dropdown-item" href="#">Action</a></li>*/}
                {/*        <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                {/*        <li>*/}
                {/*            <hr className="dropdown-divider"/>*/}
                {/*        </li>*/}
                {/*        <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                {/*    </ul>*/}
                {/*</li>*/}
            </ul>

        </div>

    )
}

export default DraweerBody
