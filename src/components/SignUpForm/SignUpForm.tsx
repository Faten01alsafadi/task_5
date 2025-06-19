import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { useRef, useState, type FormEvent } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";
function SignUpForm() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirmation = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", first_name.current?.value || "");
    formData.append("last_name", last_name.current?.value || "");
    formData.append(
      "user_name",
      `${first_name.current?.value}_ ${last_name.current?.value || ""}`
    );
    formData.append("email", email.current?.value || "");
    formData.append("password", password.current?.value || "");
    formData.append(
      "password_confirmation",
      password_confirmation.current?.value || ""
    );

    if (profile_image.current?.files?.[0]) {
      formData.append("profile_image", profile_image.current.files[0]);
    }

    try {
      const response = await register(formData);
      console.log("succes", response.data);
      navigate("/");
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleDivClick = () => {
    profile_image.current?.click();
  };

  const handleImageChange = () => {
    const file = profile_image.current?.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Row>
          <Col>
            <Form.Control
              ref={first_name}
              type="text"
              placeholder="First Name"
              required
              className="my-form-control"
            />
          </Col>
          <Col>
            <Form.Control
              ref={last_name}
              type="text"
              placeholder="Last Name"
              required
              className="my-form-control"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          ref={email}
          type="email"
          placeholder="Enter your email"
          required
          className="my-form-control"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>

        <Row>
          <Col>
            <Form.Control
              ref={password}
              type="password"
              placeholder="Enter password"
              required
              className="my-form-control"
            />
          </Col>
          <Col>
            <Form.Control
              ref={password_confirmation}
              type="password"
              placeholder="Re-enter your password"
              required
              className="my-form-control"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFile">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          ref={profile_image}
          type="file"
          className="d-none"
          onChange={handleImageChange}
          required
        />

        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="preview"
            onClick={handleDivClick}
            className="w-25 h-25 d-block rounded shadow my-pointer"
          />
        ) : (
          <div
            onClick={handleDivClick}
            className="my-pointer my-dashed-border my-blue-bg w-25 d-flex justify-content-center align-items-center p-4"
          >
            <img src="/assets/Upload icon.svg" alt="upload-image" />
          </div>
        )}
      </Form.Group>

      <Button className="w-100 my-orange-bg my-border-none" type="submit">
        SIGN UP
      </Button>
    </Form>
  );
}

export default SignUpForm;
