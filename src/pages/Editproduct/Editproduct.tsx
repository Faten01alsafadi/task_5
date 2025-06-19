import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Editproduct.css";
import axios from "axios";
import ImageWithDefaultImage from "../../components/ImageWithDefaultImage/ImageWithDefaultImage";
interface allData {
  id: number;
  price: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
function Editproduct() {
  const [data, setData] = useState<allData>();
  const { id } = useParams();

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

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  async function edieItem(event: React.FormEvent) {
    event.preventDefault();

    if (!name.current || !price.current) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name.current.value);
    formData.append("price", price.current.value);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("_method", "PUT");
    try {
      const response = await fetch(
        `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const result = await response.json();
      console.log("Updated successfully", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating");
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
            EDIT ITEM
          </h1>

          {data ? (
            <Form onSubmit={edieItem} className="my-mt-78px">
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="fs-2">Name</Form.Label>
                    <Form.Control
                      defaultValue={data.name}
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
                      defaultValue={data.price}
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
                    <Form.Label className="fs-2">Image</Form.Label>

                    <Form.Control
                      ref={image}
                      type="file"
                      className="d-none"
                      onChange={handleImageChange}
                    />

                    <div
                      onClick={handleDivClick}
                      className="my-pointer my-dashed-border my-blue-bg d-flex justify-content-center align-items-center p-4"
                    >
                      <ImageWithDefaultImage
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : data?.image_url
                        }
                        alt="selected"
                        className="w-50 h-50 d-block  my-pointer"
                      />
                    </div>
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
          ) : (
            <div>loading</div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Editproduct;
