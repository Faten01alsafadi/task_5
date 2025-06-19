import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./signUp.css";

import { Link } from "react-router-dom";
type signupProps = {
  img: string;
  logo: string;
  h3: string;
  p: string;
};

function SignUp(props: signupProps) {
  return (
    <div className="my-sm-vh bg-gradient-orange-to-yellow vh-100 d-flex justify-content-center align-items-center my-color-dark">
      <div className=" w-sm-75 w-md-25   my-h-92  my-w-33vw  my-bg-light my-p-15px  my-rounded-20px">
        <div className="my-scroll-box w-100  overflow-y-auto h-100 px-4 pt-5 ">
          <div className="text-center ">
            <img src={props.logo} alt="logo" />
            <h3 className="fs-4 fw-semibold text-dark my-mt-42px">
              {props.h3}
            </h3>
            <p>{props.p}</p>
          </div>
          <SignUpForm />

          <div className="d-flex justify-content-center mt-4 gap-1">
            <p>Do you have an account?</p>
            <Link className="my-orange-color" to="/">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
