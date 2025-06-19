import { Form, Button, Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  const image = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleDivClick = () => {
    image.current?.click();
  };

  const handleImageChange = () => {
    const file = image.current?.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const goToPreviousPage = () => {
    navigate("/dashboard");
  };

  async function addItem(event: React.FormEvent) {
    event.preventDefault();
    if (!name.current || !price.current || !selectedImage) {
      alert("fill all forms plaese");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.current.value);
    formData.append("price", price.current.value);

    formData.append("image", selectedImage);

    try {
      const response = await fetch(
        "https://web-production-3ca4c.up.railway.app/api/items",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" AddProduct ">
      <Sidebar />

      <div className="my-ml-250px px-5 mt-sm-5 mt-md-2 ">
        <Container>
          <Button
            className=" prev-show-btn d-flex justify-content-center rounded-circle border-1 border-black mb-sm-4 mb-xl-2  mb-xxl-4"
            onClick={goToPreviousPage}
          >
            <img className="w-100" src="/assets/Vector-5.svg" alt="" />
          </Button>
          <h1 className="show-h my-fs-60px fw-semibold  mt-sm-5 mt-xl-3  mt-xxl-5">
            ADD NEW ITEM
          </h1>

          <Form onSubmit={addItem} className="my-mt-78px">
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label className="fs-2">Name</Form.Label>
                  <Form.Control
                    ref={name}
                    type="name"
                    placeholder="Enter the product name"
                    required
                    className="my-form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label className="fs-2">Price</Form.Label>
                  <Form.Control
                    ref={price}
                    type="number"
                    placeholder="Enter the product price"
                    required
                    className="my-form-control"
                  />
                </Form.Group>
              </Col>
              <Col lg={6} sm={12} className=" my-div-click">
                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Label className="fs-2"> Image</Form.Label>
                  <Form.Control
                    ref={image}
                    type="file"
                    className="d-none"
                    onChange={handleImageChange}
                    required
                  />

                  {selectedImage ? (
                    <div
                      onClick={handleDivClick}
                      className="my-pointer my-dashed-border my-blue-bg  d-flex justify-content-center align-items-center p-4"
                    >
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="selected-image"
                        onClick={handleDivClick}
                        className="w-25 h-25 d-block rounded shadow my-pointer"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={handleDivClick}
                      className="my-pointer my-dashed-border my-blue-bg  d-flex justify-content-center align-items-center p-4"
                    >
                      <img
                        className="w-25"
                        src="/assets/Upload icon.svg"
                        alt="upload-image"
                      />
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center my-mt-120px">
              <Button
                className="my-w-200px  my-orange-bg my-border-none"
                type="submit"
              >
                <span className="fs-3">Save</span>
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AddProduct;
