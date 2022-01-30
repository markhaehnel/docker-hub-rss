/**
 * @jest-environment jsdom
 */

import { buildUrl } from "../../../src/lib/ui/buildUrl";

describe("buildUrl", () => {
  test("should return valid url when given all parameters", () => {
    const actualValue = buildUrl({
      username: "prom",
      repository: "prometheus",
      include: "latest",
      exclude: "dev",
      includeRegex: ".*",
      excludeRegex: ".*-dev",
    });

    expect(actualValue).toBe(
      "http://localhost/prom/prometheus.atom?include=latest&exclude=dev&includeRegex=.*&excludeRegex=.*-dev"
    );
  });

  test("should return valid url when given some parameters", () => {
    const actualValue = buildUrl({
      username: "prom",
      repository: "prometheus",
      include: "latest",
      excludeRegex: ".*-dev",
    });

    expect(actualValue).toBe(
      "http://localhost/prom/prometheus.atom?include=latest&excludeRegex=.*-dev"
    );
  });

  test("should return valid url when given required parameters", () => {
    const actualValue = buildUrl({
      username: "prom",
      repository: "prometheus",
    });

    expect(actualValue).toBe("http://localhost/prom/prometheus.atom");
  });
});
