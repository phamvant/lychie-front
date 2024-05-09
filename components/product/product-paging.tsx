"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";

interface Props extends React.HTMLAttributes<HTMLElement> {
  classname?: React.HTMLAttributes<HTMLElement>;
  currentPage: number;
  isLastPage: boolean;
}

export function ProductPagination({
  className,
  currentPage,
  isLastPage,
}: Props) {
  let index = [-1, 0, 1];

  if (isLastPage) {
    index = [-2, -1, 0];
  }

  if (currentPage == 1) {
    index = [0, 1, 2];
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`product?page=${currentPage - 1}`}
            className="text-wrap: text-nowrap"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={index[0] == 0}
            href={`product?page=${currentPage + index[0]}`}
          >
            {currentPage + index[0]}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={index[1] == 0}
            href={`product?page=${currentPage + index[1]}`}
          >
            {currentPage + index[1]}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={index[2] == 0}
            href={`product?page=${currentPage + index[2]}`}
          >
            {currentPage + index[2]}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            disabled={isLastPage}
            href={`product?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
