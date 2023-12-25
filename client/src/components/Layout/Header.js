import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import "./Header.css";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const LogoutBtn = (e) => {
    e.preventDefault(); //  to prevent to refresh page on submit

    toast.success("Logout Successfully");

    // Perform logout and navigation after a brief delay (1000 milliseconds in this example)
    setTimeout(() => {
      setAuth({ ...auth, user: null, token: "" });
      localStorage.removeItem("auth");
      navigate("/login");
    }, 2000);

    // setAuth({ ...auth, user: null, token: "" });
    // localStorage.removeItem("auth");
    // navigate("/login");
  };

  return (
    <>
      <div className="header">
        <Navbar className="navbar" variant="dark" expand="md">
          <Container>
            <Navbar.Brand className="navbarBrand" href="#home">
              <HiOutlineShoppingBag className="shopicon" size={30} />
              &nbsp;ShoeShop
            </Navbar.Brand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="navlink" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="navlink" href="/">
                  Shop
                </Nav.Link>
                <Nav.Link className="navlink" href="/">
                  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <FiHeart />
                </Nav.Link>
                <Nav.Link className="navlink" href="/contact">
                  <FiShoppingCart size={17} />
                </Nav.Link>

                <NavDropdown title={<FaRegUser size={17} />} id="nav-dropdown">
                  {!auth.user ? (
                    <>
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/signup">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={LogoutBtn}>
                        Logout
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;

// bbf

// f

// fb
// <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-target="#navbarToggle"
//     >
//       <span className="'navbar-toggler-icon" />
//     </button>

//     <div className="collapse navbar-collapse" id="navbarTogglerDemo1">
//       <NavLink to="/" className="navbar-brand" href="#">
//         ShoeShop
//       </NavLink>
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <NavLink
//             to="/"
//             className="nav-link active"
//             aria-current="page"
//             href="#"
//           >
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//             to="/"
//             className="nav-link active"
//             aria-current="page"
//             href="#"
//           >
//             About
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//             to="/"
//             className="nav-link active"
//             aria-current="page"
//             href="#"
//           >
//             Contact
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink
//             to="/"
//             className="nav-link active"
//             aria-current="page"
//             href="#"
//           >
//             Policy
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
//   );
// };

// export default Header;
