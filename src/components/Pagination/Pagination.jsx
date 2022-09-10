import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate className={styles.pagination}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination