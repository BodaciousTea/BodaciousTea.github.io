import React from "react";

export interface PaginationProps {
  pages: number;
  current: number;
}

function Pagination(props: PaginationProps) {
  const {pages, current} = props;

  return (
    <div className="w-[70vw] flex gap-[0.5vw] justify-end mx-auto">
      {[...Array(pages)].map((_, i) => (
        <span
          key={i}
          className={`w-[0.2vw] h-[0.8vw] block duration-200 ${
            i === current ? "bg-slate-300" : "bg-slate-400"
          }`}
        />
      ))}
    </div>
  );
}

export default Pagination;
