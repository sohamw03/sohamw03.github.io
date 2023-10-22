/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = ``;
let basePath = `/`;

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  assetPrefix = `/`;
  basePath = `/`;
  const nextConfig = {
    assetPrefix: assetPrefix,
    basePath: basePath,
    output: "export",
  };
} else {
  const nextConfig = {
    output: "export",
  };
}

module.exports = nextConfig;
