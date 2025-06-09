import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import type React from "react";


interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onChange: (selected: number) => void;
}

export default function Pagination({ totalPages, onChange, currentPage }: PaginationProps) {
    return (totalPages > 1 &&
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => onChange(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    )
}