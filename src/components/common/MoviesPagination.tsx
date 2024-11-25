// Pagination.tsx
import { FC } from "react";
import ReactPaginate from "react-paginate";

interface MoviesPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void; // Accepts ReactPaginate's object structure
}

export const MoviesPagination: FC<MoviesPaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;
  return (
    <ReactPaginate
      className="flex justify-center mt-8 space-x-2"
      breakLabel="..."
      nextLabel="next >"
      previousLabel="< previous"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName="flex items-center space-x-2"
      pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
      activeClassName="bg-blue-500 text-white"
      previousClassName="px-3 py-1 border rounded hover:bg-gray-200"
      nextClassName="px-3 py-1 border rounded hover:bg-gray-200"
      breakClassName="px-3 py-1"
    />
  );
};
