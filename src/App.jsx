import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Download, Menu, X, Code, Database, Palette, Zap } from 'lucide-react';

// Lazy load components for better performance
const ProjectGallery = lazy(() => Promise.resolve({
  default: ({ projects }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Code className="w-16 h-16 text-white" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.demo} className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a href={project.github} className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors">
                <Github className="w-4 h-4" />
                Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}));

const ContactForm = lazy(() => Promise.resolve({
  default: ({ onSubmit }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async () => {
      setIsSubmitting(true);
      
      try {
        await onSubmit(formData);
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        setSubmitStatus('Error sending message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {submitStatus && (
          <p className={`mt-3 text-center ${submitStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {submitStatus}
          </p>
        )}
      </div>
    );
  }
}));

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample data - replace with your actual data
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React frontend and Node.js backend",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      demo: "https://example.com",
      github: "https://github.com/example"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
      demo: "https://example.com",
      github: "https://github.com/example"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      demo: "https://example.com",
      github: "https://github.com/example"
    }
  ];

  const skills = [
    { name: "Frontend", icon: Code, items: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"] },
    { name: "Backend", icon: Database, items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"] },
    { name: "Design", icon: Palette, items: ["Figma", "Adobe XD", "UI/UX Design", "Responsive Design"] },
    { name: "Tools", icon: Zap, items: ["Git", "Docker", "AWS", "Jest", "Webpack", "CI/CD"] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'resume', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-xl">Portfolio</div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['about', 'projects', 'skills', 'resume', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize hover:text-blue-600 transition-colors ${
                      activeSection === section ? 'text-blue-600 border-b-2 border-blue-600' : ''
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                {['about', 'projects', 'skills', 'resume', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {section}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center px-4">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">JD</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">John Doe</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Full-Stack Developer & UI/UX Designer
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get In Touch
            </button>
            <div className="mt-12 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I'm a passionate full-stack developer with 5+ years of experience creating
                  innovative web applications. I specialize in React, Node.js, and modern
                  web technologies.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  My journey started with a computer science degree, and I've been constantly
                  learning and adapting to new technologies ever since. I love turning complex
                  problems into simple, beautiful solutions.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-2">
                  <li>🎓 Computer Science Graduate</li>
                  <li>💼 5+ Years Experience</li>
                  <li>🌍 Based in San Francisco, CA</li>
                  <li>☕ Coffee Enthusiast</li>
                  <li>🎯 Problem Solver</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
            <Suspense fallback={<div className="text-center">Loading projects...</div>}>
              <ProjectGallery projects={projects} />
            </Suspense>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillCategory, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <skillCategory.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-4">{skillCategory.name}</h3>
                  <ul className="space-y-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-600 dark:text-gray-300">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Resume</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Download my resume to learn more about my experience and qualifications.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
              <Download className="w-5 h-5" />
              Download Resume
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  I'm always interested in new opportunities and collaborations.
                  Feel free to reach out if you'd like to work together!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              <Suspense fallback={<div className="text-center">Loading contact form...</div>}>
                <ContactForm onSubmit={handleFormSubmit} />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>&copy; 2024 John Doe. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;