import { describe, it, expect } from "vitest";
import { posts } from "./posts";

/*
 * Data-contract tests for the blog.
 *
 * These pin the invariants the rest of the site assumes about `posts`: every
 * entry must be a routable, renderable post. If you add a post that breaks one
 * of these (a duplicate slug, a missing field), CI goes red before it ships.
 *
 * This is "make illegal states unrepresentable" applied to content — the same
 * idea several of the posts themselves argue for. The test is the guardrail.
 */

const REQUIRED_STRING_FIELDS = [
  "slug",
  "title",
  "excerpt",
  "date",
  "category",
  "author",
  "content",
];

describe("blog posts data contract", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("every post has all required string fields, non-empty", () => {
    for (const post of posts) {
      for (const field of REQUIRED_STRING_FIELDS) {
        expect(
          typeof post[field] === "string" && post[field].length > 0,
          `post "${post.slug ?? "(no slug)"}" has empty/missing field: ${field}`
        ).toBe(true);
      }
    }
  });

  it("every slug is unique (routing at /blog/[slug] depends on it)", () => {
    const slugs = posts.map((p) => p.slug);
    const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(duplicates, `duplicate slugs: ${duplicates.join(", ")}`).toEqual([]);
  });

  it("every slug is URL-safe (lowercase letters/digits separated by single hyphens)", () => {
    for (const post of posts) {
      expect(
        post.slug,
        `slug "${post.slug}" is not URL-safe`
      ).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("readTime is a positive number for every post", () => {
    for (const post of posts) {
      expect(typeof post.readTime, `readTime of "${post.slug}" is not a number`).toBe(
        "number"
      );
      expect(post.readTime, `readTime of "${post.slug}" must be > 0`).toBeGreaterThan(0);
    }
  });

  it("category is a non-empty string for every post", () => {
    for (const post of posts) {
      expect(typeof post.category).toBe("string");
      expect(post.category.length).toBeGreaterThan(0);
    }
  });
});
