import { Variables } from "relay-runtime";

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(
  text: string | null | undefined,
  variables: Variables
) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${JSON.parse(
        localStorage.getItem("access_token")!
      )}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
