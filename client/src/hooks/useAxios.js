import { useState } from "react";
import axios from "axios";


const useAxios = (baseUrl) => {
    const [res, setRes] = useState([]);
    const [error, setError] = useState(null);
  
    const getData = async (addition) => {
      const url = typeof addition === "object" ? baseUrl : baseUrl + addition;
      try {
        const resp = await axios.get(url);
        setRes((data) => [...data, resp.data]);
      } catch (err) {
        setError(error);
      }
    };

    const clearData = () => {
       setRes([])
    }
  
    return [res, getData, clearData];
  };
  

export { useAxios }