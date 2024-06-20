import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.octokit_key,
});

export default octokit;
