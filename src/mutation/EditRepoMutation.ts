import { commitMutation } from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import { graphql } from "babel-plugin-relay/macro";

const mutation = graphql`
  mutation EditRepoMutation($input: UpdateRepositoryInput!) {
    updateRepository(input: $input) {
      repository {
        id
        name
        description
      }
    }
  }
`;

export default function UpdateRepoMutation(
  name: string,
  description: string,
  repositoryId: string,
  callback: () => void
) {
  const variables = {
    input: {
      name,
      description,
      repositoryId,
    },
  };
  commitMutation(RelayEnvironment, {
    mutation: mutation,
    variables,
    onCompleted: (response) => {
      callback();
    },
    onError: (err) => console.error(err),
    optimisticUpdater: (proxyStore) => {
      const repositoryRecord = proxyStore.get(repositoryId);
      if (repositoryRecord) {
        repositoryRecord.setValue(name, "name");
        repositoryRecord.setValue(description, "description");
      }
    },
  });
}
