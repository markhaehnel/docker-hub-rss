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
      (include.length === 0 || include.includes(tag.name)) &&
      (exclude.length === 0 || !exclude.includes(tag.name)) &&
      (!includeRegex || new RegExp(includeRegex).test(tag.name)) &&
      (!excludeRegex || !new RegExp(excludeRegex).test(tag.name))
    );
  });
};

export { filterTags };
