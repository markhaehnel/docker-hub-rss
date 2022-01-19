import {
  Center,
  Group,
  List,
  Pagination,
  ThemeIcon,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { TagIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { FeedResponse } from "../lib/types";
import { fetchFeed } from "../lib/utils";

type FeedPreviewProps = {
  url: string;
};

const FeedPreview: React.FC<FeedPreviewProps> = ({ url }) => {
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<FeedResponse>();
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const [feedPreviewUrl, setFeedPreviewUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const feed = await fetchFeed(feedPreviewUrl);
        setFeed(feed);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [feedPreviewUrl]);

  useEffect(() => {
    if (url !== feedPreviewUrl) {
      setFeedPreviewUrl("");
      setLoading(false);
    }
  }, [url, feedPreviewUrl]);

  return (
    <>
      {!feed?.rss && (
        <Button
          fullWidth
          loading={loading}
          disabled={loading}
          onClick={() => setFeedPreviewUrl(url)}
        >
          Preview Feed
        </Button>
      )}
      {error && (
        <Center>
          <Text mt="md">Error occured while fetching feed</Text>
        </Center>
      )}
      {!error && !loading && feed?.rss && feed.rss.channel.item?.length > 0 && (
        <Group direction="column" spacing="lg" grow>
          <Title order={3}>{feed.rss.channel.title}</Title>
          <List
            spacing="md"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <TagIcon size={12} />
              </ThemeIcon>
            }
          >
            {feed.rss.channel.item
              ?.slice(activePage, activePage + 15)
              .map((item) => {
                return (
                  <List.Item key={item.guid.__text}>{item.title}</List.Item>
                );
              })}
          </List>
          {feed.rss.channel.item?.length > 15 && (
            <Pagination
              grow
              withControls={false}
              page={activePage}
              onChange={setPage}
              total={Math.ceil(feed.rss.channel.item.length / 15)}
            />
          )}
        </Group>
      )}
    </>
  );
};

export { FeedPreview };
