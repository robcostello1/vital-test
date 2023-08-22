export const buildApiUrl = <T extends { pageParam: unknown }>(
  endpoint: string,
  { pageParam, ...params }: T,
  base: string
) => {
  const url = new URL(endpoint, base);

  url.searchParams.set("page", (pageParam as number).toString());

  Object.entries(params).forEach(([key, value]) => {
    value && url.searchParams.set(key, value.toString());
  });

  return url.href;
};
