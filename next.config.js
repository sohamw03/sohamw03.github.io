/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = ``;
let basePath = `/`;
let nextConfig;
if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  assetPrefix = `/`;
  basePath = `/`;
  nextConfig = {
    assetPrefix: assetPrefix,
    basePath: basePath,
    output: "export",
  };
} else {
  nextConfig = {
    output: "export",
  };
}

module.exports = nextConfig;
