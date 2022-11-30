import React from "react";

interface IndividualAccountModuleProps {
  category: string;
}

const IndividualAccountModule: React.FC<IndividualAccountModuleProps> = ({
  category,
}) => {
  return (
    <>
      <h1>{category}</h1>
    </>
  );
};

export default IndividualAccountModule;
