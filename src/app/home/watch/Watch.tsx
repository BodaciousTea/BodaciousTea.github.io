import React, {useState, ComponentType} from "react";
import Layout from "./Layout";

type SectionItem =
  | React.JSXElementConstructor<any>
  | [React.JSXElementConstructor<any>, Record<string, any>?];

interface WatchProps {
  sections: SectionItem[];
  skipFirstPaginate?: boolean;
}

function Watch(props: WatchProps) {
  const {sections, skipFirstPaginate} = props;
  const [watch, setWatch] = useState<number>(0);

  const nextWatch = () => {
    setWatch((prev) => {
      if (prev >= sections.length - 1) return 0;
      return prev + 1;
    });
  };

  const sectionItem = sections[watch];

  let CurrentSection: ComponentType<any> | null = null;
  let currentProps = {};

  if (typeof sectionItem === "function") {
    // Direct component
    CurrentSection = sectionItem;
  } else if (Array.isArray(sectionItem)) {
    // Component with props as an array
    [CurrentSection, currentProps = {}] = sectionItem;
  }

  const pagination = {
    current: watch,
    pages: sections.length,
  };

  return (
    <div className="">
      <Layout
        pagination={
          skipFirstPaginate
            ? watch !== 0
              ? pagination
              : undefined
            : pagination
        }
        onClick={nextWatch}
      >
        {CurrentSection && <CurrentSection {...currentProps} />}
      </Layout>
    </div>
  );
}

export default Watch;
