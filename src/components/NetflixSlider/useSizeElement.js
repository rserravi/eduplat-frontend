import { useState, useRef, useEffect } from 'react'

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (elementRef && elementRef.current){
    setWidth(elementRef.current.clientWidth);
    }
    else {
      setWidth(260);
      //console.log("NO HAY REFERENCIA: ",elementRef.current)
    }
  }, [elementRef.current]);

  //console.log("ELEMENT REF", elementRef);
  return { width, elementRef };
}

export default useSizeElement;