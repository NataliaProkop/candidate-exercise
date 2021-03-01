import React from "react";
import { useStore } from './ContexProvider';

interface ContentProps {
  /* You can't touch this! */
}

export const Content: React.FC<ContentProps> = () => {
  const store = useStore();

  const handleClik = () =>{
    store.fetchSecretData();
  }
  
  return (
    <div>
      Hello, this is content. I want you to{" "}
      <button onClick={handleClik}>click here</button> to fetch and update the
      secret data in sidebar and header.
    </div>
  );
};

export default Content;
