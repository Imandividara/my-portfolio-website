import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, 
  FaPaintBrush, FaCode, FaMobileAlt, FaGamepad,
  FaExternalLinkAlt, FaArrowDown, FaMapMarkerAlt, FaClock,
  FaGraduationCap, FaBriefcase, FaAward, FaPhone, FaReact,
  FaNodeJs, FaJava, FaPython, FaDatabase
} from "react-icons/fa";
import { SiSpringboot, SiMongodb, SiPostgresql, SiMysql } from "react-icons/si";

// ============ DATA FROM YOUR CV ============
const projects = [
  {
    title: "ConstruxFlow",
    desc: "Supply Chain and Inventory Management System for procurement, supplier management, inventory tracking, and payment workflows. Achieved 25-30% gain in system responsiveness.",
    tags: ["React", "Spring Boot", "PostgreSQL", "REST APIs", "JPA"],
    img: "/2.jpg",
    github: "https://github.com/Imandividara/ConstruxFlow",
    live: "https://construxflow-demo.netlify.app",
    date: "May – Oct 2025",
    category: "Full-Stack"
  },
  {
    title: "FutureFinder",
    desc: "Higher Education and Career Guidance Platform connecting students, institutions, and employers with Z-score analytics.",
    tags: ["PHP", "JavaScript", "HTML", "CSS", "MySQL"],
    img: "/Frame 3.png",
    github: "https://github.com/Imandividara/FutureFinder",
    live: "https://futurefinder-demo.netlify.app",
    date: "May 2024 – Apr 2025",
    category: "Full-Stack"
  },
  {
    title: "SIMAS AUTOQUEST",
    desc: "Car Rental Platform with location-based search, booking management, and secure online payments.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    img: "/123.jpg",
    github: "https://github.com/Imandividara/SIMAS-AUTOQUEST",
    live: "https://simas-demo.netlify.app",
    date: "May 2024 – Oct 2024",
    category: "Full-Stack"
  },
  {
    title: "FoodieHub",
    desc: "Online Food Ordering Platform with Stripe payment integration and optimized React components.",
    tags: ["Spring Boot", "React", "Tailwind CSS", "MySQL", "Stripe"],
    img: "/game.jpg",
    github: "https://github.com/Imandividara/FoodieHub",
    live: "https://foodiehub-demo.netlify.app",
    date: "Jul 2024 – Jan 2025",
    category: "Full-Stack"
  },
];

const certificates = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online",
    date: "Ongoing",
    status: "In Progress"
  },
  {
    title: "Unity Essentials Pathway",
    issuer: "Unity",
    date: "2025",
  },
  {
    title: "AWS Educate Introduction to Cloud 101",
    issuer: "Amazon Web Services",
    date: "2024",
  },
];

const skills = [
  { name: "React", color: "#61DAFB", category: "Frontend", icon: FaReact },
  { name: "Spring Boot", color: "#6DB33F", category: "Backend", icon: SiSpringboot },
  { name: "Node.js", color: "#339933", category: "Backend", icon: FaNodeJs },
  { name: "Java", color: "#007396", category: "Language", icon: FaJava },
  { name: "JavaScript", color: "#F7DF1E", category: "Language", icon: FaCode },
  { name: "Python", color: "#3776AB", category: "Language", icon: FaPython },
  { name: "MySQL", color: "#4479A1", category: "Database", icon: SiMysql },
  { name: "MongoDB", color: "#47A248", category: "Database", icon: SiMongodb },
  { name: "PostgreSQL", color: "#336791", category: "Database", icon: SiPostgresql },
];

const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "GitHub Repos", value: 30, suffix: "+" },
  { label: "Hackathons", value: 5, suffix: "+" },
];

const achievements = [
  "🏆 Winner - SLIIT Codefest Designathon 2025 (IFS)",
  "🎯 Top 50 - INTERFACE X Designathon 2025 (Asta)",
  "💡 Participant - IntelliHack 5.0 (UCSC)",
  "🎵 First Runner-Up - All Island Inter-School Western Music Competition",
];

// ============ CUSTOM CURSOR COMPONENT ============
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50 blur-sm" />
    </motion.div>
  );
};

// ============ TYPING ANIMATION COMPONENT ============
const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
};

// ============ COUNTER ANIMATION COMPONENT ============
const CountUp = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

// ============ 3D TILT CARD COMPONENT ============
const TiltCard = ({ children, className = "" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
};

// ============ MAIN COMPONENT ============
const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("skills");
  const [filterCategory, setFilterCategory] = useState("All");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Projects", "Skills", "Contact"];
  const categories = ["All", "Full-Stack", "Frontend", "Backend"];

  const filteredProjects = filterCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === filterCategory);

  return (
    <main className="bg-black min-h-screen font-poppins text-white relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Gradient Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ============ NAVBAR ============ */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl md:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              IM
            </span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition text-lg relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          <motion.button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ============ HERO SECTION WITH TYPING ANIMATION ============ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <motion.div
          className="container max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image with 3D Effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <TiltCard>
                <motion.div
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-1 shadow-2xl relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-black border-4 border-black">
                    <img
                      src="/profile.png"
                      alt="Imandi Muthugala"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>

            {/* Text Content with Typing Effect */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl font-semibold mb-4"
                >
                  Hello, I'm
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                    <TypingAnimation text="Imandi Muthugala" />
                  </span>
                </h1>
              </motion.div>

              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl md:text-2xl font-normal text-gray-300 mb-6"
              >
                Computer Science Student | Full-Stack Developer
              </motion.h2>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              >
                Passionate about building impactful projects with clean, maintainable code. 
                Specializing in full-stack development, OOP, and modern web technologies.
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8"
              >
                <motion.a
                  href="#projects"
                  className="relative px-8 py-3 rounded-lg font-semibold overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-white">View My Work</span>
                </motion.a>
                <motion.a
                  href="/Imandi_Muthugala_Resume.pdf"
                  download
                  className="relative px-8 py-3 rounded-lg font-semibold border-2 border-transparent bg-clip-padding overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    Download CV
                  </span>
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex gap-6 justify-center md:justify-start"
              >
                {[
                  { icon: FaGithub, link: "https://github.com/Imandividara" },
                  { icon: FaLinkedin, link: "https://www.linkedin.com/in/imandi-muthugala" },
                  { icon: FaEnvelope, link: "mailto:imandividaramuthugala@gmail.com" },
                ].map(({ icon: Icon, link }, idx) => (
                  <motion.a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-3xl transition-colors relative group"
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown className="text-purple-500 text-2xl" />
        </motion.div>
      </section>

      {/* ============ STATS SECTION WITH COUNTER ANIMATION ============ */}
      <section className="py-16 px-6 relative">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <TiltCard className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-20 w-3/4 mx-auto opacity-50" />

      {/* ============ ABOUT SECTION ============ */}
      <section id="about" className="py-24 px-6 relative">
        <motion.div className="container max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              What I Do
            </span>
          </motion.h2>

          <motion.p
            className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Transforming ideas into powerful digital experiences with cutting-edge technologies
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education & Achievements in About Section */}
            <TiltCard className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <FaGraduationCap className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Education</h3>
                </div>
                <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  BSc in Computer Science
                </h4>
                <p className="text-white font-medium mb-1">University of Colombo School of Computing</p>
                <p className="text-gray-400 text-sm mb-2">May 2023 – Present</p>
                <p className="text-gray-400 text-sm">GPA: 3.498 (Director's List)</p>
              </div>
            </TiltCard>

            <TiltCard className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <FaAward className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Achievements</h3>
                </div>
                <ul className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      className="text-gray-400 flex items-start gap-3 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="text-xl">{achievement.split(' ')[0]}</span>
                      <span>{achievement.substring(achievement.indexOf(' ') + 1)}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent my-20 w-3/4 mx-auto opacity-50" />

      {/* ============ PROJECTS SECTION WITH FILTER ============ */}
      <section id="projects" className="py-24 px-6">
        <motion.div className="container max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          
          <motion.p
            className="text-center text-gray-400 text-lg mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Real-world applications built with cutting-edge technologies
          </motion.p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filterCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                    : "bg-gray-900/50 text-gray-400 border border-white/10 hover:border-white/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filterCategory}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.map((project, idx) => (
                <TiltCard
                  key={project.title}
                  className="relative group"
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                      <div className="relative overflow-hidden h-48">
                        <motion.img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaGithub className="text-2xl" />
                          </motion.a>
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition"
                            whileHover={{ scale: 1.2, rotate: -360 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaExternalLinkAlt className="text-2xl" />
                          </motion.a>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-semibold text-white">
                            {project.title}
                          </h3>
                          <span className="text-xs font-semibold whitespace-nowrap ml-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {project.date}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-4 text-sm">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs hover:bg-white/10 transition"
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-20 w-3/4 mx-auto opacity-50" />

      {/* ============ SKILLS SECTION WITH ICON ANIMATIONS ============ */}
      <section id="skills" className="py-24 px-6">
        <motion.div className="container max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Skills & Certifications
            </span>
          </motion.h2>

          {/* Tabs */}
          <div className="flex justify-center mb-12 gap-4">
            {["skills", "certificates"].map((tab) => (
              <motion.button
                key={tab}
                className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all relative overflow-hidden ${
                  activeTab === tab ? "" : "bg-gray-900/50 text-gray-400 border border-white/10"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === tab && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab ? "text-white" : ""}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {skills.map((skill, idx) => (
                  <TiltCard key={idx} className="relative group">
                    <motion.div
                      className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <skill.icon
                          className="w-12 h-12 mx-auto mb-3"
                          style={{ color: skill.color }}
                        />
                      </motion.div>
                      <p className="text-white font-semibold text-sm">{skill.name}</p>
                      <p className="text-xs mt-1 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                        {skill.category}
                      </p>
                    </motion.div>
                  </TiltCard>
                ))}
              </motion.div>
            )}

            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {certificates.map((cert, idx) => (
                  <TiltCard key={idx} className="relative group">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <motion.div
                          className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <FaAward className="text-3xl text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white mb-2 text-center">
                          {cert.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-1 text-center">{cert.issuer}</p>
                        <p className="text-sm font-semibold text-center bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                          {cert.date}
                        </p>
                        {cert.status && (
                          <span className="inline-block mt-3 px-3 py-1 bg-white/5 border border-white/10 text-xs mx-auto block w-fit rounded-full bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {cert.status}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </TiltCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent my-20 w-3/4 mx-auto opacity-50" />

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-24 px-6">
        <motion.div className="container max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </motion.h2>

          <motion.p
            className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Open for internship opportunities. Let's create something amazing!
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: FaEnvelope,
                title: "Email",
                content: "imandividaramuthugala@gmail.com",
                link: "mailto:imandividaramuthugala@gmail.com",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: FaPhone,
                title: "Phone",
                content: "+94 70 420 8782",
                link: "tel:+94704208782",
                gradient: "from-pink-500 to-cyan-500"
              },
              {
                icon: FaMapMarkerAlt,
                title: "Location",
                content: "Colombo, Sri Lanka",
                gradient: "from-cyan-500 to-blue-500"
              },
            ].map((info, idx) => (
              <TiltCard key={idx} className="relative group">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
                    <motion.div
                      className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="text-2xl text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-400 hover:text-white transition text-sm break-all"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">{info.content}</p>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/Imandi_Muthugala_Resume.pdf"
              download
              className="relative px-8 py-3 rounded-lg font-semibold text-center overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
              <span className="relative z-10 text-white">Download Resume</span>
            </motion.a>
            <motion.a
              href="mailto:imandividaramuthugala@gmail.com"
              className="relative px-8 py-3 rounded-lg font-semibold text-center border-2 border-transparent overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Send Email
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            className="flex gap-8 justify-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { icon: FaGithub, link: "https://github.com/Imandividara" },
              { icon: FaLinkedin, link: "https://www.linkedin.com/in/imandi-muthugala" },
              { icon: FaEnvelope, link: "mailto:imandividaramuthugala@gmail.com" },
            ].map(({ icon: Icon, link }, idx) => (
              <motion.a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-3xl transition-colors relative group"
                whileHover={{ y: -5, scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Icon />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container max-w-7xl mx-auto text-center">
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2025 Imandi Muthugala. Crafted with{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              React, Tailwind CSS & Framer Motion
            </span>
          </motion.p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
