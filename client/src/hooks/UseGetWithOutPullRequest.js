import { useEffect, useState } from 'react';
import axiosConfig from '../config/configAxios';

const UseGetWithOutPullRequest = () => {
  const [reposWithoutPullRequests, setReposWithoutPullRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('reposWithoutPullRequests');
        const lastFetchTime = localStorage.getItem('reposWithoutPullRequestsLastFetchTime');

        if (cachedData && lastFetchTime) {
          const fiveHoursInMillis = 5 * 60 * 60 * 1000;
          const timeSinceLastFetch = Date.now() - parseInt(lastFetchTime, 10);

          if (timeSinceLastFetch < fiveHoursInMillis) {
            try {
              const parsedData = JSON.parse(cachedData);
              setReposWithoutPullRequests(parsedData);
            } catch (parseError) {
              console.error('Error parsing cached data:', parseError);
              localStorage.removeItem('reposWithoutPullRequests');
              localStorage.removeItem('reposWithoutPullRequestsLastFetchTime');
              makeApiRequest();
            }
          } else {
            makeApiRequest();
          }
        } else {
          makeApiRequest();
        }
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    const makeApiRequest = async () => {
      try {
        const response = await axiosConfig.configAxios().get('/getAllRepos/with-out-Pull-Reuqest');
        const data = response.data.withoutPR;

        const formattedData = data.map(item => ({
          repoName: item.repoName,
          totalCount: item.total_count,
          items: [],
        }));

        setReposWithoutPullRequests(formattedData);

        localStorage.setItem('reposWithoutPullRequests', JSON.stringify(formattedData));
        localStorage.setItem('reposWithoutPullRequestsLastFetchTime', Date.now().toString());
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { reposWithoutPullRequests, loading, error };
};

export default UseGetWithOutPullRequest;
