import { useRef, type FormEvent } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./LogInForm.css";
function LogInForm() {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const sendData = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("email", email.current?.value || "");
    formData.append("password", password.current?.value || "");

    try {
      const response = await login(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_name", response.data.user.user_name);
      localStorage.setItem(
        "profile_image_url",
        response.data.user.profile_image_url
      );
      console.log("succes", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Form onSubmit={sendData}>
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

        <Form.Control
          ref={password}
          type="password"
          placeholder="Enter password"
          required
          className="my-form-control"
        />
      </Form.Group>

      <Button className="w-100 my-orange-bg my-border-none" type="submit">
        SIGN IN
      </Button>
    </Form>
  );
}

export default LogInForm;
