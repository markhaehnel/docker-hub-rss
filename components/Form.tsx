import { Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { DockerHubFilterParams } from "../lib/utils";

type FormProps = {
  initialParams?: DockerHubFilterParams;
  onResultChange: (params: DockerHubFilterParams) => void;
};

const Form: React.FC<FormProps> = ({ initialParams, onResultChange }) => {
  const [username, setUsername] = useState(initialParams?.username ?? "_");
  const [repository, setRepository] = useState(
    initialParams?.repository ?? "postgres"
  );
  const [include, setInclude] = useState(initialParams?.include ?? "");
  const [exclude, setExclude] = useState(initialParams?.exclude ?? "");
  const [includeRegex, setIncludeRegex] = useState(
    initialParams?.includeRegex ?? ""
  );
  const [excludeRegex, setExcludeRegex] = useState(
    initialParams?.excludeRegex ?? ""
  );

  useEffect(() => {
    const params: DockerHubFilterParams = {
      username,
      repository,
      include,
      includeRegex,
      exclude,
      excludeRegex,
    };
    onResultChange(params);
  }, [
    onResultChange,
    username,
    repository,
    include,
    exclude,
    includeRegex,
    excludeRegex,
  ]);

  return (
    <Group direction="column" position="center" grow>
      <Group direction="row" grow>
        <TextInput
          label="Username"
          type="text"
          name="username"
          placeholder="_"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <TextInput
          label="Repository"
          type="text"
          name="repository"
          placeholder="prometheus"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
          id="repository"
        />
      </Group>
      <Group direction="row" grow>
        <TextInput
          label="Include"
          type="text"
          name="include"
          placeholder="latest,latest-dev"
          value={include}
          onChange={(e) => setInclude(e.target.value)}
          id="include"
        />
        <TextInput
          label="Include Regex"
          type="text"
          name="includeRegex"
          placeholder="v.*"
          value={includeRegex}
          onChange={(e) => setIncludeRegex(e.target.value)}
          id="includeRegex"
        />
      </Group>
      <Group direction="row" grow>
        <TextInput
          label="Exclude"
          type="text"
          name="exclude"
          placeholder="latest,latest-dev"
          value={exclude}
          onChange={(e) => setExclude(e.target.value)}
          id="exclude"
        />
        <TextInput
          label="Exclude Regex"
          type="text"
          name="excludeRegex"
          placeholder=".*-dev"
          value={excludeRegex}
          onChange={(e) => setExcludeRegex(e.target.value)}
          id="excludeRegex"
        />
      </Group>
    </Group>
  );
};

export default Form;
