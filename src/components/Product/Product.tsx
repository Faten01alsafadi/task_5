import { Button, Card, Modal } from "react-bootstrap";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ImageWithDefaultImage from "../ImageWithDefaultImage/ImageWithDefaultImage";

interface ProductProps {
  name: string;
  image: string;
  id: number;
}

function Product({ name, image, id }: ProductProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    navigate(`/showiteminfo/${id}`);
  };
  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/editproduct/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete");

      const result = await response.json();
      console.log("Item deleted successfully:", result);
      setShowModal(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Card
        onClick={handleClick}
        className={`my-product-card px-3 py-1 d-flex justify-content-center align-items-center position-relative ${
          showModal ? "blur-bg" : ""
        }`}
      >
        <ImageWithDefaultImage src={image} className="my-product-img" />
        <div className="layer w-100 h-100 px-1 d-flex align-items-center justify-content-center my-bg-opicity">
          <div>
            <div className="text-center mb-2">
              <h2 className={name.length > 15 ? "fs-5" : "fs-2"}>{name}</h2>
            </div>
            <div className="d-flex gap-2">
              <Button
                onClick={(e) => handleEditClick(e, id)}
                className="my-product-btn my-orange-bg border-0 "
              >
                edit
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="my-product-btn my-red-bg border-0"
              >
                delete
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        className="my-popup "
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body className="d-flex justify-content-center align-items-center fw-semibold">
          <span className=" fs-4">
            {" "}
            Are you sure you want to delete the product?{" "}
          </span>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around w-50 m-auto">
          <Button
            className="my-orange-bg border-0 w-25 fs-3"
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
          <Button
            className="my-orange-bg border-0 w-25 fs-3"
            onClick={confirmDelete}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Product;
