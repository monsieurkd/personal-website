import Link from "next/link";
import ContactForm from "../components/ContactForm";

export default function Contact() {
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
              David Kieu
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link
                href="/blog"
                className="hover:text-blue-600 transition-colors"
              >
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
              <Link href="/contact" className="text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Send me an email
              </p>
              <a
                href="mailto:david.kieu@example.com"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                david.kieu@example.com
              </a>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect professionally
              </p>
              <a
                href="https://linkedin.com/in/david-kieu"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                /in/david-kieu
              </a>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Check out my code
              </p>
              <a
                href="https://github.com/davidkieu"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                /davidkieu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Send me a message</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Fill out the form below and I'll get back to you as soon as
              possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                What's your typical response time?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I usually respond to emails within 24 hours during business
                days. For urgent matters, please mention it in your subject
                line.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                What types of projects do you work on?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I specialize in web applications, e-commerce platforms, SaaS
                products, and mobile-responsive websites using modern
                technologies like React, Next.js, and Node.js.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">
                Do you work with international clients?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! I work with clients from all over the world and am
                comfortable with different time zones and communication
                preferences.
              </p>
            </div>
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
