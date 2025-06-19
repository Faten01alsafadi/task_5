import { Link } from "react-router-dom";
import LogInForm from "../../components/LogInForm/LogInForm";

type signupProps = {
  img: string;
  logo: string;
  h3: string;
  p: string;
};
function LogIn(props: signupProps) {
  return (
    <div>
      <div className="bg-gradient-orange-to-yellow vh-100 d-flex justify-content-center align-items-center my-color-dark">
        <div className=" w-sm-75 w-md-25   my-h-92  my-w-33vw  my-bg-light my-p-15px  my-rounded-20px">
          <div className="my-scroll-box w-100  h-100 px-4 pt-5 ">
            <div className="text-center ">
              <img src={props.logo} alt="logo" />
              <h3 className="fs-4 fw-semibold text-dark my-mt-42px">
                {props.h3}
              </h3>
              <p>{props.p}</p>
            </div>
            <LogInForm />

            <div className="d-flex justify-content-center mt-4 gap-1">
              <p>Don't you have an account?</p>
              <Link className="my-orange-color" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
