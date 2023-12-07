import { useEffect, useState } from 'react';
import axiosConfig from '../config/configAxios';

const useFetchPullRequests = () => {
  const [pullRequestsData, setPullRequestsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('pullRequestsData');
        const lastFetchTime = localStorage.getItem('lastFetchTime');

        if (cachedData && lastFetchTime) {
          const fiveHoursInMillis = 5 * 60 * 60 * 1000;
          const timeSinceLastFetch = Date.now() - parseInt(lastFetchTime, 10);

          if (timeSinceLastFetch < fiveHoursInMillis) {
            try {
              const parsedData = JSON.parse(cachedData);
              setPullRequestsData(parsedData);
            } catch (parseError) {
              console.error('Error parsing cached data:', parseError);
              localStorage.removeItem('pullRequestsData');
              localStorage.removeItem('lastFetchTime');
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
        const response = await axiosConfig.configAxios().get('/getAllRepos/with-without-prs');
        const data = response.data.allPullRequest;

        const formattedData = {
          withPR: data.withPR.map(item => ({
            repoName: item.repoName,
            items: item.items.map(pr => ({
              number: pr.number,
              htmlUrl: pr.html_url,
              title: pr.title,
              createdAt: pr.created_at,
            })),
          })),
          withoutPR: data.withoutPR.map(item => ({
            repoName: item.repoName,
            totalCount: item.total_count,
            items: [],
          })),
        };

        setPullRequestsData(formattedData);

        localStorage.setItem('pullRequestsData', JSON.stringify(formattedData));
        localStorage.setItem('lastFetchTime', Date.now().toString());
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  return { pullRequestsData, loading, error };
};

export default useFetchPullRequests;
