import { useState } from "react";
import { Nav, Button, Image } from "react-bootstrap";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const userName = localStorage.getItem("user_name");
  const userImage = localStorage.getItem("profile_image_url");
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  };
  return (
    <div className="text-center ">
      <Button
        onClick={toggleSidebar}
        className="d-md-none m-2 position-fixed top-0 start-0 z-3 my-orange-bg border-0"
      >
        ☰
      </Button>

      <div
        className={`sidebar ${
          isOpen ? "show-sidebar" : ""
        } d-flex flex-column bg-light p-3`}
      >
        <div className="d-md-none text-end mb-2 ">
          <Button variant="outline-warning" onClick={closeSidebar}>
            ✖
          </Button>
        </div>

        <div className="text-center mx-auto mb-3 my-orange-border-left my-w-35 ps-2 ">
          <img src="/assets/logo.svg" alt="Logo" className="w-100" />
        </div>

        <div className="text-center mb-3">
          <Image src={userImage ?? ""} roundedCircle className="w-50 mt-4" />
          <p className="mt-2 fw-bold">{userName}</p>
        </div>

        <Nav className="flex-column mt-5">
          <Nav.Link
            to={"/dashboard"}
            as={NavLink}
            className="d-flex gap-2 w-75 m-auto text-dark fw-500 "
          >
            <div className="text-center w-25">
              <img src="/assets/Vector-2.svg" alt="" />
            </div>
            Products
          </Nav.Link>
          <Nav.Link
            to={"/"}
            as={NavLink}
            className="d-flex gap-2 w-75 m-auto text-dark fw-500 "
          >
            <div className="text-center w-25">
              <img src="/assets/bookmark 1.svg" alt="" />
            </div>
            Favorites
          </Nav.Link>
          <Nav.Link
            to={"/"}
            as={NavLink}
            className="d-flex gap-2 w-75 m-auto text-dark fw-500 "
          >
            <div className="text-center w-25">
              <img src="/assets/bookmark 1.svg" alt="" />
            </div>
            Order List
          </Nav.Link>
        </Nav>

        <div className="mx-auto mt-auto pt-3">
          <Nav.Link
            onClick={logOut}
            className="d-flex gap-3 w-100 m-auto text-dark fw-500 "
          >
            logout
            <div className="text-center w-50 text-dark">
              <img src="/assets/Vector-3.svg" alt="" />
            </div>
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
