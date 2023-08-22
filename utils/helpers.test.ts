import { buildApiUrl } from './helpers';

describe("buildApiUrl", () => {
  it("should return a url with the correct page param", () => {
    expect(
      buildApiUrl("endpoint", { pageParam: 10 }, "https://example.com")
    ).toBe("https://example.com/endpoint?page=10");
  });

  it("should include any other params we pass", () => {
    expect(
      buildApiUrl(
        "endpoint",
        { pageParam: 1, foo: "bar", baz: 123 },
        "https://example.com"
      )
    ).toBe("https://example.com/endpoint?page=1&foo=bar&baz=123");
  });
});
