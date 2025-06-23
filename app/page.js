"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";

const TypewriterText = ({ words, className }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return <span className={className}>{currentText}</span>;
};

const SkillCard = ({ skill, level, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{skill}</h3>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${level}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{level}%</p>
  </div>
);

const ProjectCard = ({ title, description, tech, demoUrl, codeUrl, image }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-6xl text-white">{image}</div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <a
          href={demoUrl}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition-colors"
        >
          Live Demo
        </a>
        <a
          href={codeUrl}
          className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-lg text-center transition-colors"
        >
          Code
        </a>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    { skill: "Python", level: 95, icon: "🐍" },
    { skill: "TensorFlow", level: 85, icon: "🧠" },
    { skill: "PyTorch", level: 80, icon: "🔥" },
    { skill: "Scikit-learn", level: 90, icon: "🤖" },
    { skill: "NLP", level: 82, icon: "🗣️" },
    { skill: "Computer Vision", level: 90, icon: "👁️" },
  ];

  const projects = [
    {
      title: "Game Development: Ping Pong and Chess",
      description:
        "Developed 2D games with a custom physics engine and AI-driven decision-making for the Chess game.",
      tech: ["Python"],
      demoUrl: "#",
      codeUrl: "https://github.com/monsieurkd",
      image: "🎮",
    },
    {
      title: "AVA Club Website",
      description:
        "A modern, responsive website for the AVA Club to showcase activities and events, featuring an events calendar and RSVP forms.",
      tech: ["React", "GitHub"],
      demoUrl: "#",
      codeUrl: "https://github.com/monsieurkd",
      image: "🎉",
    },
    {
      title: "AirGesture",
      description:
        "A computer vision project that detects and interprets hand gestures in real-time to translate them into actionable commands.",
      tech: ["Python", "OpenCV"],
      demoUrl: "#",
      codeUrl: "https://github.com/monsieurkd",
      image: "🖐️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center justify-center"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                David Kieu
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-8 h-12">
              I'm a{" "}
              <TypewriterText
                words={[
                  "Software Engineer",
                  "Full Stack Developer",
                  "Game Developer",
                  "Computer Vision Engineer",
                ]}
                className="text-blue-600 dark:text-blue-400 font-semibold"
              />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              A passionate and driven Computer Science student from the
              University of Adelaide with experience in full-stack development,
              computer vision, and game development. Proven ability to design,
              develop, and deploy software solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </a>
              <a
                href="/david-kieu-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                📄 Download CV
              </a>
              <a
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-8xl text-white">
                  👨‍💻
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Software Engineer & Computer Science Student
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                  Hello! I'm David Kieu, a Computer Science student at the
                  University of Adelaide. I have practical experience as a
                  Software Engineer at Ecosmartvietnam, where I designed and
                  deployed a production-grade website, and as an Intern at
                  Kaopiz Inc., where I engineered computer vision models.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                  I'm also an active community member, serving as Treasurer for
                  the Vietnamese Students Association and volunteering for
                  university events. I'm passionate about clean code, system
                  architecture, and mentoring junior developers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg">
                    🎓 Computer Science, University of Adelaide
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    💼 1+ Years Experience
                  </span>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg">
                    🚀 Community Volunteer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible.skills
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <SkillCard key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-center mb-16">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible.contact
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Let's Work Together
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              I'm always interested in new opportunities and exciting projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <a
                href="mailto:david.kieu25@gmail.com"
                className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>david.kieu25@gmail.com</p>
              </a>
              <a
                href="https://linkedin.com/in/kieu-duc-tech"
                className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p>/in/kieu-duc-tech</p>
              </a>
              <a
                href="https://github.com/monsieurkd"
                className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold mb-2">GitHub</h3>
                <p>/monsieurkd</p>
              </a>
            </div>
            <a
              href="mailto:david.kieu25@gmail.com"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Send me a message
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 David Kieu. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
