import React, { useEffect, useState } from "react";
import "./styles/gitHubProfileFinder.css";
import octokit from "./octokit";

function GitHubProfileFinder() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [clsName, setClsName] = useState("");

  useEffect(() => {
    name === "" ? setClsName("hidden") : setClsName("");
    async function fetchData() {
      try {
        const response = await octokit.request("GET /users/{username}", {
          username: name,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        setData(response);
      } catch (e) {
        setFlag(false);
      }
    }
    fetchData();
    setFlag(true);
  }, [name, data]);

  function handleChange(e) {
    setName((prev) => {
      return (prev = e.target.value);
    });
  }

  return (
    <div className="github_profile_finder">
      <div className="github_profile_finder__search">
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={name}
        />
        <a href={data?.data?.html_url} target="_blank">
          <div className="github_profile_finder__results">
            <div className={`github_profile_finder__results__card ${clsName}`}>
              {flag ? (
                <img src={data?.data?.avatar_url} alt="Profile pic" />
              ) : (
                <p>No Results</p>
              )}
              <div
                className={`github_profile_finder__results__card__content ${clsName}`}
              >
                <div
                  className={`github_profile_finder__results__card__content__username ${clsName}`}
                >
                  <p>
                    {data?.data?.name ? data?.data?.name : data?.data?.login}
                  </p>
                </div>
                <div
                  className={`github_profile_finder__results__card__content__bio ${clsName}`}
                >
                  <p>{data?.data?.bio}</p>
                </div>
                <div
                  className={`github_profile_finder__results__card__content__socials ${clsName}`}
                >
                  <div
                    className={`github_profile_finder__results__card__content__socials__email ${clsName}`}
                  >
                    {data?.data?.email && <p>Email: {data?.data?.email}</p>}
                  </div>
                  <div
                    className={`github_profile_finder__results__card__content__socials__twitter ${clsName}`}
                  >
                    {data?.data?.twitter_username && (
                      <p>Twitter: {data?.data?.twitter_username}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default GitHubProfileFinder;
