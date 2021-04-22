import _ from "lodash";
import { number, func } from "prop-types";

const Pagination = ({ pageSize, totalCount, onPageClick, currentPage }) => {
  const numberOfPages = Math.ceil(totalCount / pageSize);
  return numberOfPages === 0 ? null : (
    <>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {_.range(1, numberOfPages + 1).map((n) => (
              <li
                key={n}
                className={"page-item " + (n === currentPage ? "active" : "")}
              >
                <a className="page-link" onClick={() => onPageClick(n)}>
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
Pagination.propTypes = {
  pageSize: number.isRequired,
  totalCount: number.isRequired,
  onPageClick: func.isRequired,
  currentPage: number.isRequired,
};

export default Pagination;
