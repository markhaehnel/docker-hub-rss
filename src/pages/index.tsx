import { Card, Group, Title, Text, TextInput, Kbd } from "@mantine/core";
import { useOs, useHotkeys } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FeedPreview } from "../components/feedPreview";
import Form from "../components/form";
import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/router";
import { buildUrl } from "../lib/ui/buildUrl";
import { DockerHubFilterParams as DockerHubFilterParameters } from "../lib/ui/types";

type HomeProperties = {
  initialParams: DockerHubFilterParameters;
};

const Home: NextPage<HomeProperties> = ({ initialParams }) => {
  const [parameters, setParameters] =
    useState<DockerHubFilterParameters>(initialParams);
  const [url, setUrl] = useState("");
  const clipboard = useClipboard();
  const os = useOs();

  const router = useRouter();

  useHotkeys([["mod+C", () => clipboard.copy(url)]]);

  useEffect(() => {
    setUrl(buildUrl(parameters));

    const urlQuery = new URLSearchParams();
    for (const x of Object.entries(parameters)) {
      if (x[1]) urlQuery.append(x[0], x[1]);
    }
    router.replace(`/?${urlQuery.toString()}`, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters]);

  return (
    <>
      <Head>
        <title>Docker Hub RSS</title>
      </Head>
      <div style={{ maxWidth: 640, width: "100%", margin: "auto" }}>
        <Group direction="column" position="center">
          <Card shadow="sm" p="lg">
            <Title>Why use Docker Hub RSS?</Title>
            <Text mt="sm" size="sm">
              Docker Hub doesn&apos;t provide notifications for new image
              releases, so Docker Hub RSS turns image tags into an RSS feed for
              easy consumption. Subscribe using Slack RSS, Feedly, or any other
              RSS feed reader to get notified when a new image is published.
            </Text>
          </Card>

          <Card shadow="sm" p="lg" style={{ width: "100%" }}>
            <Form initialParams={parameters} onResultChange={setParameters} />
          </Card>

          <Card shadow="sm" p="lg" style={{ width: "100%" }}>
            <TextInput
              label="Feed URL"
              description="Subscribe to this feed"
              rightSectionWidth={80}
              rightSection={
                typeof window === "undefined" && (
                  <>
                    <Kbd>{os === "macos" ? "⌘" : "Ctrl"}</Kbd> + <Kbd>C</Kbd>
                  </>
                )
              }
              onFocus={(error) => error.target.select()}
              value={url}
              readOnly
            />
          </Card>
          <Card shadow="sm" p="lg" style={{ width: "100%" }}>
            <FeedPreview url={url} />
          </Card>
        </Group>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  const initialParameters = {
    username: "_",
    repository: "mongo",
    ...query,
  } as DockerHubFilterParameters;
  return { initialParams: initialParameters };
};

export default Home;
