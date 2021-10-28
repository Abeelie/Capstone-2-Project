import { useState } from "react";

const useFlip = () => {
    const [flip, setFlip] = useState(true);
    const toggleFlip = () => {
      setFlip((flip) => !flip);
    }
    return [flip, toggleFlip];
}






export {useFlip}