import { useEffect, useState } from 'react';
import axios from '../config/configAxios'; 

function usePullRequestsData() {
  const [isLoadingData, setIsLoading] = useState(true);
  const [pullsData, setPullsData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const milestoneResponse = await axios.configAxios().get('/current-milestone');
        const currentMilestoneData = milestoneResponse.data;
        const pullsResponse = await axios.configAxios().get('/getAllRepos/pull-request');
        const pullsData = pullsResponse.data;
        setPullsData({
          pulls: pullsData.pulls,
          factorName: pullsData.factorName,
          factorExpectationValue: pullsData.factorExpectationValue,
          currentMilestoneData,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { isLoadingData, pullsData };
}

export default usePullRequestsData;
