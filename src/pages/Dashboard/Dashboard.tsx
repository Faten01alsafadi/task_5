import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";

import { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { useNavigate } from "react-router-dom";
import Product from "../../components/Product/Product";

interface Product {
  id: number;
  name: string;
  image_url: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [searchedItems, setSearchedItems] = useState<Product[] | null>(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (searchedItems ?? products).slice(
    indexOfFirstItem,
    indexOfLastItem
  ); 
  const navigate = useNavigate();
  const goToAddProduct = () => {
    navigate("/addproduct");
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!products.length) {
      alert("Products are still loading. Please wait.");
      return;
    }

    const lowerSearch = search.trim().toLowerCase();

    if (!lowerSearch) {
      setSearchedItems(null);
      return;
    }

    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    );

    if (filtered.length > 0) {
      setSearchedItems(filtered);
      setCurrentPage(1);
    } else {
      setSearchedItems([]);
      alert("Product not found!");
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchedItems(null);
    setCurrentPage(1);
  };

  function updateItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 550) {
      setItemsPerPage(1);
    } else if (width > 550 && width <= 600) {
      setItemsPerPage(2);
    } else if (width > 600 && width <= 900) {
      setItemsPerPage(4);
    } else if (width > 900 && width <= 1100) {
      setItemsPerPage(6);
    } else if (width > 1100 && width < 1200) {
      setItemsPerPage(9);
    } else {
      setItemsPerPage(8);
    }
  }

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    fetch("https://web-production-3ca4c.up.railway.app/api/items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data: Product[]) => {
        console.log("Products fetched:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="my-ml-250px w-100">
        <Row>
          <Form onSubmit={handleSearch} className="w-50 mx-auto">
            <InputGroup className="my-3">
              <FormControl
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search product by name"
                className="search-input"
              />
              <Button type="submit" className="bg-transparent search-button">
                <img src="/assets/Vector-4.svg" alt="Search" />
              </Button>
              {searchedItems && (
                <Button
                  variant="secondary"
                  onClick={handleClearSearch}
                  className="ms-2"
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Form>
        </Row>

        <Container className="my-w-81">
          <Row className="d-flex justify-content-end ">
            <Button
              onClick={goToAddProduct}
              className="my-orange-bg my-iphonBtn border-0"
            >
              ADD NEW PRODUCT
            </Button>
          </Row>

          <Row>
            {currentItems.map((item) => (
              <Col
                key={item.id}
                xl={3}
                lg={4}
                md={6}
                sm={6}
                className="my-my-iphone"
              >
                <div className="py-2">
                  <Product
                    name={item.name}
                    image={item.image_url}
                    id={item.id}
                  />
                </div>
              </Col>
            ))}
          </Row>

          <div className="pagination mx-auto">
            <CustomPagination
              totalItems={(searchedItems ?? products).length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
