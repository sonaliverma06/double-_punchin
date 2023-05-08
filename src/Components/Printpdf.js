import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function  Printpdf({ children }) {
    const linkToPrint = () => {
        return (
            <button>Click To Print Out!</button>
        )
    }
    const componentRef = useRef();
    return (
        <>
        

         
            <div ref={componentRef}>
            <p>Before you can begin to determine what the composition of a particular paragraph will be,
 you must first decide on an argument and a working thesis statement for your paper. What is the most
  important idea that you are trying to convey to your reader? The information in each paragraph must
   be related to that idea. In other words, your paragraphs should remind your reader that there is a 
   recurrent relationship between your thesis and the information in each paragraph. A working thesis
    functions like a seed from which your paper, and your ideas, will grow. The whole process is an
  organic one—a natural progression from a seed to a full-blown paper where there are direct, familial 
    relationships between all of the ideas in the paper.
  </p>
  
     <img src='../logo512.png'></img>
            </div>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            </>
    );
}