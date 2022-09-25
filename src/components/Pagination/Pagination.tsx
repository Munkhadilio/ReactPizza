import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
    currentPage: number;
    onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate className={styles.pagination}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            forcePage={currentPage - 1}
        //renderOnZeroPageCount={null}
        // не знаю зачем это
        />
    )
}

export default Pagination