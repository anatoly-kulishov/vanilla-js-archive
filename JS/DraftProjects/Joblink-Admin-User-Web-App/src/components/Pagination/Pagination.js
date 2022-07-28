import React, {useState} from 'react';
import ReactPaginate from "react-paginate";
import './Pagination.scss';

const Pagination = () => {
    const [perPage, setPerPage] = useState(true);
    const pageCount = 99;

    return (
        <div className="pagination-box">
            <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={() => null}
                previousLabel={'previous'}
                nextLabel={'next'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'}
                breakLabel={'...'}
            />
            <div className="rows-options">
                <span className="mr-2">Rows per page</span>
                <div className="group">
                    <button className={`btn-badge ${perPage && 'active'}`} onClick={() => setPerPage(true)}>50</button>
                    <button className={`btn-badge ${!perPage && 'active'}`} onClick={() => setPerPage(false)}>100
                    </button>
                </div>
            </div>
        </div>
    )
}

Pagination.propTypes = {}

export default Pagination
