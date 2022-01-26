import { Tag } from "./api/types";

const filterTags = (
  tags: Tag[],
  include: string[],
  exclude: string[],
  includeRegex: string,
  excludeRegex: string
) => {
  return tags.filter((tag: { name: string }) => {
    return (
      (include.length === 0 || include.indexOf(tag.name) !== -1) &&
      (exclude.length === 0 || exclude.indexOf(tag.name) === -1) &&
      (!includeRegex || tag.name.match(new RegExp(includeRegex))) &&
      (!excludeRegex || !tag.name.match(new RegExp(excludeRegex)))
    );
  });
};

export { filterTags };
