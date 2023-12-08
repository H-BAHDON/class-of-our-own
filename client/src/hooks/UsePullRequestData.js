import { useEffect, useState } from 'react';
import axios from '../config/configAxios';

function usePullRequestsData() {
  const [isLoadingData, setIsLoading] = useState(true);
  const [pullsData, setPullsData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('pullsData');
        const lastFetchTime = localStorage.getItem('lastPullsFetchTime');

        if (cachedData && lastFetchTime) {
          const fiveHoursInMillis = 5 * 60 * 60 * 1000;
          const timeSinceLastFetch = Date.now() - parseInt(lastFetchTime, 10);

          if (timeSinceLastFetch < fiveHoursInMillis) {
            try {
              const parsedData = JSON.parse(cachedData);
              setPullsData(parsedData);
            } catch (parseError) {
              console.error('Error parsing cached data:', parseError);

              localStorage.removeItem('pullsData');
              localStorage.removeItem('lastPullsFetchTime');
              makeApiRequest();
            }
          } else {
            makeApiRequest();
          }
        } else {
          makeApiRequest();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    const makeApiRequest = async () => {
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

        localStorage.setItem('pullsData', JSON.stringify({
          pulls: pullsData.pulls,
          factorName: pullsData.factorName,
          factorExpectationValue: pullsData.factorExpectationValue,
          currentMilestoneData,
        }));
        localStorage.setItem('lastPullsFetchTime', Date.now().toString());

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
