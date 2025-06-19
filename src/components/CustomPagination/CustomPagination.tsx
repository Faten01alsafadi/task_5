import { Button, Container } from "react-bootstrap";
import "./CustomPagination.css";
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function CustomPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const batchSize = 3;
  const countOfPage = Math.ceil(totalItems / itemsPerPage);

  console.log(countOfPage);

  const pageNumber = Array.from({ length: countOfPage }, (_, i) => i + 1);

  let pageStart = 1;
  let pageEnd = countOfPage;

  if (countOfPage <= batchSize) {
    pageStart = 1;
    pageEnd = countOfPage;
  } else if (currentPage <= 2) {
    pageStart = 1;
    pageEnd = batchSize;
  } else if (currentPage >= countOfPage - 1) {
    pageStart = countOfPage - batchSize + 1;
    pageEnd = countOfPage;
  } else {
    pageStart = currentPage - 1;
    pageEnd = currentPage + 1;
  }
  console.log("current", currentPage);
  console.log("start", pageStart);
  console.log("end", pageEnd);

  const visiblePageNumbers = pageNumber.slice(pageStart - 1, pageEnd);

  return (
    <Container>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
        <Button
          className="my-pagination-btn d-flex justify-content-center align-items-center"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          <img src="/assets/Prev.svg" alt="" />
        </Button>

        {pageStart > 1 && (
          <Button className="my-pagination-btn d-flex justify-content-center align-items-center fs-4">
            ...
          </Button>
        )}

        {visiblePageNumbers.map((item, index) => (
          <Button
            key={index}
            onClick={() => setCurrentPage(item)}
            className={`my-pagination-btn d-flex justify-content-center align-items-center ${
              item === currentPage
                ? "my-orange-bg text-white my-orange-hover"
                : ""
            }`}
          >
            {item}
          </Button>
        ))}

        {pageEnd < countOfPage && (
          <Button className="my-pagination-btn d-flex justify-content-center align-items-center fs-4">
            ...
          </Button>
        )}

        <Button
          className="my-pagination-btn my-prev-and-next d-flex justify-content-center align-items-center"
          disabled={currentPage === countOfPage}
          onClick={() => setCurrentPage(Math.max(currentPage + 1, 1))}
        >
          <img src="/assets/Next.svg" alt="" />
        </Button>
      </div>
    </Container>
  );
}

export default CustomPagination;
