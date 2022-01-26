const parseQuery = (query: Record<string, string | string[]>) => {
  return {
    username: query.username as string,
    repository: (query.repository as string).replace(".atom", ""),
    include: query.include ? (query.include as string).split(",") : [],
    includeRegex: query.includeRegex as string,
    exclude: query.exclude ? (query.exclude as string).split(",") : [],
    excludeRegex: query.excludeRegex as string,
  };
};

export { parseQuery };
