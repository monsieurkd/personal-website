"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;

  // This would normally come from a database or CMS
  const post = {
    title: "Building Scalable React Applications",
    date: "May 15, 2025",
    readTime: 8,
    category: "React",
    author: "Your Name",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications is one of the most important skills for modern web developers. As applications grow in complexity, maintaining clean, efficient, and scalable code becomes crucial for long-term success.</p>
      
      <h2>Component Architecture</h2>
      <p>The foundation of any scalable React application is a well-thought-out component architecture. Here are the key principles to follow:</p>
      <ul>
        <li><strong>Single Responsibility Principle:</strong> Each component should have one clear purpose</li>
        <li><strong>Composition over Inheritance:</strong> Use composition to build complex UIs from simple components</li>
        <li><strong>Prop Drilling Avoidance:</strong> Use Context API or state management libraries for deep data passing</li>
      </ul>
      
      <h2>State Management</h2>
      <p>As your application grows, managing state becomes increasingly important. Consider these approaches:</p>
      <ol>
        <li><strong>Local State:</strong> Use useState for component-specific state</li>
        <li><strong>Context API:</strong> Great for app-wide state that doesn't change frequently</li>
        <li><strong>Redux/Zustand:</strong> For complex state logic and frequent updates</li>
      </ol>
      
      <h2>Performance Optimization</h2>
      <p>Performance is crucial for user experience. Key optimization techniques include:</p>
      <ul>
        <li>React.memo for preventing unnecessary re-renders</li>
        <li>useMemo and useCallback for expensive calculations</li>
        <li>Code splitting with React.lazy and Suspense</li>
        <li>Virtual scrolling for large lists</li>
      </ul>
      
      <h2>Testing Strategy</h2>
      <p>A comprehensive testing strategy ensures your application remains reliable as it scales:</p>
      <ul>
        <li><strong>Unit Tests:</strong> Test individual components and functions</li>
        <li><strong>Integration Tests:</strong> Test component interactions</li>
        <li><strong>End-to-End Tests:</strong> Test complete user workflows</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications requires careful planning, good architecture decisions, and continuous refactoring. By following these principles and best practices, you can create applications that are maintainable, performant, and ready to grow with your business needs.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              David Kieu
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

      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">
                {post.readTime} min read
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                📘 Share on LinkedIn
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                🐦 Share on Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                📱 Share on WhatsApp
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white">
                👨‍💻
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  About the Author
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your Name is a passionate full-stack developer with over 3
                  years of experience in building modern web applications. He
                  specializes in React, Next.js, and Node.js, and loves sharing
                  knowledge about web development best practices.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

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
