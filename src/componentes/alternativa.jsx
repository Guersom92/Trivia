import React from "react";

function Alternativa({ alternativa, siguientePregunta, className }) {
  return (
    <div className={className} onClick={() => siguientePregunta(alternativa)}>
      {alternativa}
    </div>
  );
}

export default Alternativa;
