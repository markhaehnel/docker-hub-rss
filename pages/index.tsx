import { Card, Group, Title, Text, TextInput, Kbd } from "@mantine/core";
import { useOs, useHotkeys } from "@mantine/hooks";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FeedPreview } from "../components/FeedPreview";
import Form from "../components/Form";
import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/router";
import { buildUrl } from "../lib/utils";
import { DockerHubFilterParams } from "../lib/types";

type HomeProps = {
  initialParams: DockerHubFilterParams;
};

const Home: NextPage<HomeProps> = ({ initialParams }) => {
  const [params, setParams] = useState<DockerHubFilterParams>(initialParams);
  const [url, setUrl] = useState("");
  const clipboard = useClipboard();
  const os = useOs();

  const router = useRouter();

  useHotkeys([["mod+C", () => clipboard.copy(url)]]);

  useEffect(() => {
    setUrl(buildUrl(params));

    const urlQuery = new URLSearchParams();
    Object.entries(params).forEach((x) => {
      if (x[1]) urlQuery.append(x[0], x[1]);
    });
    router.replace(`/?${urlQuery.toString()}`, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <Head>
        <title>Docker Hub RSS</title>
      </Head>
      <div style={{ maxWidth: 640, width: "100%", margin: "auto" }}>
        <Group direction="column" position="center">
          <Card shadow="sm" padding="lg">
            <Title>Why use Docker Hub RSS?</Title>
            <Text mt="sm" size="sm">
              Docker Hub doesn&apos;t provide notifications for new image
              releases, so Docker Hub RSS turns image tags into an RSS feed for
              easy consumption. Subscribe using Slack RSS, Feedly, or any other
              RSS feed reader to get notified when a new image is published.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" style={{ width: "100%" }}>
            <Form initialParams={params} onResultChange={setParams} />
          </Card>

          <Card shadow="sm" padding="lg" style={{ width: "100%" }}>
            <TextInput
              label="Feed URL"
              description="Subscribe to this feed"
              rightSectionWidth={80}
              rightSection={
                <>
                  <Kbd>{os === "macos" ? "⌘" : "Ctrl"}</Kbd> + <Kbd>C</Kbd>
                </>
              }
              onFocus={(e) => e.target.select()}
              value={url}
              readOnly
            />
          </Card>
          <Card shadow="sm" padding="lg" style={{ width: "100%" }}>
            <FeedPreview url={url} />
          </Card>
        </Group>
      </div>
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  const initialParams = {
    username: "_",
    repository: "mongo",
    ...query,
  } as DockerHubFilterParams;
  return { initialParams };
};

export default Home;
