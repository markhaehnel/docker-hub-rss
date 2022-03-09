import { ActionIcon, AppShell, Group, Header, Text } from "@mantine/core";
import { MarkGithubIcon, RssIcon } from "@primer/octicons-react";
import Head from "next/head";
import Link from "next/link";

const NavigationLink: React.FC<{ url: string }> = ({ url, children }) => (
  <>
    <Link passHref href={url}>
      <ActionIcon variant="transparent" component="a" size={48} radius="xl">
        {children}
      </ActionIcon>
    </Link>
  </>
);

const NavigationLinks: React.FC = () => (
  <Group direction="row" spacing="xs">
    <NavigationLink url="https://github.com/markhaehnel/docker-hub-rss">
      <MarkGithubIcon size={32} />
    </NavigationLink>
  </Group>
);

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf8" />
        <meta
          name="description"
          content="RSS feeds for Docker Hub images. Subscribe using Slack RSS, Feedly, or any other RSS feed reader to get notified when a new image is published."
        />

        <meta property="og:url" content="https://docker-hub-rss.ezhub.de/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Docker Hub RSS" />
        <meta
          property="og:description"
          content="RSS feeds for Docker Hub images. Subscribe using Slack RSS, Feedly, or any other RSS feed reader to get notified when a new image is published."
        />
        <meta property="og:image" content="" />
      </Head>
      <AppShell
        padding="md"
        header={
          <Header
            height={70}
            padding="md"
            styles={{
              top: 0,
              left: 0,
              right: 0,
              zIndex: 6,
              position: "fixed",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "var(--removed-scroll-width, 0px)",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <RssIcon size={32} />
              <Group direction="column" ml="md" spacing={0}>
                <Text size="xl" weight="bold">
                  Docker Hub RSS
                </Text>
                <Text>RSS feeds for Docker Hub images</Text>
              </Group>
              <div style={{ flexGrow: 1 }} />
              <NavigationLinks />
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <main>{children}</main>
      </AppShell>
    </>
  );
};

export default Layout;
