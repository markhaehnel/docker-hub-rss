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

const PAGE_SIZE = 15;

const FeedPreview: React.FC<FeedPreviewProps> = ({ url }) => {
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<FeedResponse>();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
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
              ?.slice(
                activePage * PAGE_SIZE,
                activePage * PAGE_SIZE + PAGE_SIZE
              )
              .map((item) => {
                return (
                  <List.Item key={item.guid.__text}>{item.title}</List.Item>
                );
              })}
          </List>
          {feed.rss.channel.item?.length > PAGE_SIZE && (
            <Pagination
              grow
              withControls={false}
              page={activePage}
              onChange={setActivePage}
              total={Math.floor(feed.rss.channel.item.length / PAGE_SIZE)}
            />
          )}
        </Group>
      )}
    </>
  );
};

export { FeedPreview };
