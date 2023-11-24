import { useState, useEffect } from "react";

const CurrentMilestone = () => {
  const [currentMilestoneData, setCurrentMilestoneData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/current-milestone")
      .then((res) => {
        if (res.status < 500) {
          return res.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${res.status} ${res.statusText}`
          );
        }
      })
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
