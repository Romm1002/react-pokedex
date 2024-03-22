import { useSearchParams } from "react-router-dom";

function Pagination({ page, totalPages }) {
  const [_, setSearchParams] = useSearchParams();

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, page - 2);
    const endPage = Math.min(totalPages - 1, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setSearchParams({ page: page - 1 })}
            disabled={page === 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {generatePageNumbers().map((pageNumber) => (
          <li className={`page-item ${pageNumber === page ? 'active' : ''}`} key={pageNumber}>
            <button
              className="page-link"
              onClick={() => setSearchParams({ page: pageNumber })}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setSearchParams({ page: page + 1 })}
            disabled={page === totalPages - 1}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
