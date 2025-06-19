import { Button, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ShowItemInfo.css";
import ImageWithDefaultImage from "../../components/ImageWithDefaultImage/ImageWithDefaultImage";
interface allData {
  id: number;
  price: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
function ShowItemInfo() {
  const navigate = useNavigate();
  const [data, setData] = useState<allData>();
  const { id } = useParams();
  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
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
  return (
    <div className=" ShowItemInfo">
      <Sidebar />
      {data ? (
        <Container className="my-sm-container my-ml-250px px-5 mt-sm-5 mt-md-2 ">
          <div className="show-item w-100">
            <Button
              className=" prev-show-btn d-flex justify-content-center rounded-circle border-1 border-black mb-sm-4 mb-xl-2  mb-xxl-4"
              onClick={goToPreviousPage}
            >
              <img className="w-100" src="/assets/Vector-5.svg" alt="" />
            </Button>
            <h1 className="show-h my-fs-60px fw-semibold  mt-sm-5 mt-xl-3  mt-xxl-5">
              {data.name}
            </h1>

            <div className="show-product m-auto">
              <ImageWithDefaultImage
                className="w-100"
                src={data.image_url}
                alt=""
              />
            </div>

            <div className="info d-flex justify-content-around mt-sm-4 mt-md-auto">
              <h2 className="my-fs-60px fw-semibold ">
                Price: <span className="fs-1">{data.price}$</span>
              </h2>
              <h2 className="my-fs-60px fw-semibold ">
                Added At:
                <span className="fs-1">{formatDate(data.created_at)}</span>
              </h2>
            </div>
            <div className="info d-flex justify-content-center mt-sm-2 mt-md-auto">
              <h2 className="my-fs-60px fw-semibold ">
                Updated At:
                <span className="fs-1">{formatDate(data.updated_at)}</span>
              </h2>
            </div>
          </div>
        </Container>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default ShowItemInfo;
