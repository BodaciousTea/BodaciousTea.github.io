import React from "react";
import Pagination, {type PaginationProps} from "./Pagination";

interface LayoutProps {
  children?: React.ReactNode;
  onClick?: () => void;
  pagination?: PaginationProps;
}

function Layout(props: LayoutProps) {
  const {children, onClick, pagination} = props;

  return (
    <div onClick={onClick}>
      <section className="min-h-screen flex items-center bg-slate-950">
        <div className="relative w-full">
          <div className="mb-[1vw]">{children}</div>
          {pagination && <Pagination {...pagination} />}
        </div>
      </section>
    </div>
  );
}

export default Layout;
