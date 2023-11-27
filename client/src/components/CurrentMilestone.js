import { useState, useEffect } from "react";
import axios from "../config/configAxios";

const CurrentMilestone = () => {
  const [currentMilestoneData, setCurrentMilestoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const instant = axios.configAxios();
    instant
      .get("/current-milestone")
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setCurrentMilestoneData(data);
        console.log(currentMilestoneData);
      })
      .catch((Error) => {
        setIsLoading(false);
        console.log(Error);
      });
  }, []);
  return <div></div>;
};

export default CurrentMilestone;
