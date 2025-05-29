"use client";

import { useState } from "react";
import Link from "next/link";

const BlogCard = ({ title, excerpt, date, readTime, category, slug }) => (
  <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-6xl text-white">📝</div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
          {category}
        </span>
        <span className="text-gray-500 text-sm">{readTime} min read</span>
      </div>
      <h2 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{date}</span>
        <Link
          href={`/blog/${slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  </article>
);

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const posts = [
    {
      title: "Building Scalable React Applications",
      excerpt:
        "Learn best practices for structuring large React applications with proper state management and component architecture.",
      date: "May 15, 2025",
      readTime: 8,
      category: "React",
      slug: "building-scalable-react-applications",
    },
    {
      title: "Next.js 15: New Features and Performance Improvements",
      excerpt:
        "Explore the latest features in Next.js 15 and how they can improve your web application performance.",
      date: "May 10, 2025",
      readTime: 6,
      category: "Next.js",
      slug: "nextjs-15-new-features",
    },
    {
      title: "TypeScript Best Practices for Better Code Quality",
      excerpt:
        "Discover TypeScript patterns and practices that will make your code more maintainable and bug-free.",
      date: "May 5, 2025",
      readTime: 10,
      category: "TypeScript",
      slug: "typescript-best-practices",
    },
    {
      title: "Database Design Patterns for Modern Applications",
      excerpt:
        "Understanding different database design patterns and when to use them in your applications.",
      date: "April 28, 2025",
      readTime: 12,
      category: "Database",
      slug: "database-design-patterns",
    },
    {
      title: "Deploying Full-Stack Applications with Docker",
      excerpt:
        "A comprehensive guide to containerizing and deploying your full-stack applications using Docker.",
      date: "April 20, 2025",
      readTime: 15,
      category: "DevOps",
      slug: "deploying-with-docker",
    },
    {
      title: "Building RESTful APIs with Node.js and Express",
      excerpt:
        "Learn how to build robust and scalable REST APIs using Node.js, Express, and modern development practices.",
      date: "April 15, 2025",
      readTime: 9,
      category: "Backend",
      slug: "building-restful-apis",
    },
  ];

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Portfolio
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-blue-600">
                Blog
              </Link>
              <Link
                href="/#about"
                className="hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/#projects"
                className="hover:text-blue-600 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/#contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Sharing my thoughts on web development, programming best practices,
            and the latest tech trends.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to get notified about new posts and insights on web
            development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Your Name. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
