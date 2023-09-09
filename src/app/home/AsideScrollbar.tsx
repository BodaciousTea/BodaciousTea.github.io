import React from "react";

interface AsideScrollbarProps {
  scroll: number;
}

function AsideScrollbar(props: AsideScrollbarProps) {
  const {scroll} = props;

  return (
    <div
      className={`fixed w-[0.5vw] right-[3.1vw] top-[2.7vw] bottom-[2.7vw]  rounded-xl bg-slate-400/40 z-30 duration-200 ${
        scroll ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="bg-slate-300 w-[0.5vw] h-10 rounded-xl absolute top-0 duration-300"
        style={{
          height: `calc(${100 / 5}vh - 2.7vw)`,
          top:
            `calc(${(100 / 5) * (scroll - 1)}vh` +
            `${scroll !== 1 ? " - 2.7vw" : ""})`,
          animationTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
        }}
      />
    </div>
  );
}

export default AsideScrollbar;
