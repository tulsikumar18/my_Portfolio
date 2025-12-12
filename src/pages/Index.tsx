"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Download, Trophy, MapPin, Calendar, User, Code, Database, Server, Award } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AOS from "aos";
import "aos/dist/aos.css";

const Portfolio = () => {
  console.log("[Index] Portfolio component rendering");
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1 });
  const [hackathonsRef, hackathonsInView] = useInView({ threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.1 });
  const [educationRef, educationInView] = useInView({ threshold: 0.1 });
  const [certificationsRef, certificationsInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    console.log("[Index] Portfolio component mounted, initializing AOS");
    setIsVisible(true);
    try {
      AOS.init({
        duration: 1000,
        once: true,
        easing: "ease-out-cubic",
        offset: 100,
        delay: 0,
        anchorPlacement: "top-bottom",
        disable: window.innerWidth < 768 ? "mobile" : false,
      });
      console.log("[Index] AOS initialized successfully");
      
      // Refresh AOS on scroll for better performance
      const handleScroll = () => {
        AOS.refresh();
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } catch (error) {
      console.error("[Index] Error initializing AOS:", error);
    }
  }, []);

  useEffect(() => {
    const sections = [
      { id: "hero", inView: heroInView },
      { id: "about", inView: aboutInView },
      { id: "skills", inView: skillsInView },
      { id: "hackathons", inView: hackathonsInView },
      { id: "projects", inView: projectsInView },
      { id: "experience", inView: experienceInView },
      { id: "education", inView: educationInView },
      { id: "certifications", inView: certificationsInView },
      { id: "contact", inView: contactInView },
    ];

    const active = sections.find(section => section.inView)?.id || "";
    if (active) setActiveSection(active);
  }, [
    heroInView,
    aboutInView,
    skillsInView,
    hackathonsInView,
    projectsInView,
    experienceInView,
    educationInView,
    certificationsInView,
    contactInView
  ]);

  // Hero Section Data
  const heroData = {
    name: "Tulsi Kumar Yadav",
    tagline: "AI Full-Stack Developer & Hackathon Winner",
    ctaButtons: [
      {
        text: "Download Resume",
        href: "https://drive.google.com/file/d/1d9B7a1PLFNbxO9_lYtNhBTQYzRzt0F3N/view?usp=sharing",
        variant: "default"
      },
      {
        text: "Contact Me",
        href: "#contact",
        variant: "outline"
      },
      {
        text: "View Projects",
        href: "#projects",
        variant: "outline"
      },
    ],
  };

  // About Section Data
  const aboutData = {
    short: "I'm an AI Full-Stack Developer with expertise in building intelligent applications that solve real-world problems. Winner of Hacktopus Hackathon with innovative solutions in agriculture and civic technology.",
    long: "As a passionate AI Full-Stack Developer, I specialize in creating innovative solutions that bridge the gap between complex technical challenges and user-friendly experiences. My approach combines analytical thinking with creative problem-solving to deliver products that not only function flawlessly but also provide exceptional user value. I'm committed to staying at the forefront of technological advancement, continuously learning and applying cutting-edge techniques to drive meaningful impact. My achievements include winning 1st place at Hacktopus Hackathon among 50+ teams and developing impactful projects like AgriAid and JanMitra."
  };

  // Skills Section Data
  const skillsData = {
    programming: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React Native", level: 88 },
      { name: "C/C++", level: 80 },
      { name: "Node.js", level: 90 }
    ],
    aiMl: [
      { name: "Machine Learning", level: 92 },
      { name: "Deep Learning", level: 85 },
      { name: "Natural Language Processing", level: 88 },
      { name: "Computer Vision", level: 87 },
      { name: "Generative AI", level: 85 },
      { name: "Data Science", level: 90 }
    ],
    fullStack: [
      { name: "React", level: 92 },
      { name: "MongoDB", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "Node.js", level: 95 },
      { name: "PostgreSQL", level: 85 },
      { name: "Supabase", level: 87 }
    ],
    tools: [
      { name: "Git/GitHub", level: 90 },
      { name: "DevOps", level: 85 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Figma", level: 82 },
      { name: "VS Code", level: 95 }
    ]
  };

  // Hackathons Section Data
  const hackathonsData = [
    {
      name: "Hacktopus Hackathon",
      position: "1st Place Winner",
      date: "May 2025, Bengaluru",
      description: "Built AgriAid, an AI-powered agricultural assistant that helps farmers detect plant diseases via text, image, or voice. Integrated multilingual support, voice-based outputs, and accessibility features to reach a wide range of users. Won 1st place among 50+ teams, recognized for innovation and real-world impact.",
      certificateImage: "https://drive.google.com/file/d/1VRK7f4LVk3gpyvzbGljW1lSvTUhG8Eng/view?usp=sharing",
      icon: Trophy
    },
    {
      name: "IVIS Labs Promptathon",
      position: "Certificate",
      date: "Mar 2025, Bengaluru",
      description: "Developed 'Sketch to Slide', a Smart Board to Slide Deck Converter that transformed handwritten notes, diagrams, and equations into structured presentation slides. Implemented AI-based vision models for text and diagram recognition, enabling export to PowerPoint/PDF. Gained experience in prompt engineering, full-stack development and teamwork under 24 hour deadline pressure.",
      icon: Award
    }
  ];

  // Projects Section Data
  const projectsData = [
    {
      title: "AgriAid",
      description: "AI-powered agricultural assistant that helps farmers detect plant diseases via image, text, or voice input. Integrated multilingual support and voice-based responses, ensuring inclusivity for diverse users. Provides disease details, treatments, preventive measures, and organic remedies in preferred language.",
      technologies: ["Python", "TensorFlow", "Computer Vision", "React Native", "MongoDB"],
      links: [
        { text: "GitHub", href: "https://github.com/tulsikumar18/AgriAid", icon: Github },
        { text: "Watch Demo Video", href: "https://drive.google.com/file/d/13oJG7U6W43YkJlChiFagw9NCBynm2deI/view?usp=sharing", icon: Download }
      ],
      impact: "Won 1st place at Hacktopus Hackathon among 50+ teams"
    },
    {
      title: "Swasthya Margadarshika",
      description: "Multilingual AI-driven health assistant enabling users to input symptoms via text or voice in their chosen language. Implemented disease prediction, home remedies, preventive measures, and medicine recommendations using symptom analysis. Integrated voice-based output to improve accessibility for visually impaired and elderly users.",
      technologies: ["React", "Node.js", "MongoDB", "NLP", "Express.js"],
      links: [
        { text: "GitHub", href: "https://github.com", icon: Github },
        { text: "Demo Video", href: "#", icon: Download }
      ],
      impact: "Improved healthcare accessibility for diverse linguistic communities"
    },
    {
      title: "JanMitra",
      description: "Mobile-first civic reporting platform enabling citizens to submit issues with photos, map-based location tagging, multilingual UI and voice-to-text descriptions. Implemented a community upvote system with automatic priority levels, duplicate detection, and a reward mechanism. Integrated Gemini Pro AI chatbot for guided reporting and real-time notifications.",
      technologies: ["React Native", "Supabase", "Gemini Pro API", "Expo", "PostgreSQL", "Mapbox"],
      links: [
        { text: "GitHub", href: "https://github.com/tulsikumar18/JanMitra", icon: Github },
        { text: "Watch Demo Video", href: "https://drive.google.com/file/d/1aYaxH5cLpfeuPLmhs3hzhXONh7Na-Wl_/view?usp=sharing", icon: Download }
      ],
      impact: "Engineered secure, scalable backend with role-based access and government dashboard"
    }
  ];

  // Experience Section Data
  const experienceData = [
    {
      company: "Hacktopus Hackathon",
      role: "1st Place Winner",
      timeline: "May 2025, Bengaluru",
      achievements: [
        "Built AgriAid, an AI-powered agricultural assistant that helps farmers detect plant diseases via text, image, or voice",
        "Integrated multilingual support, voice-based outputs, and accessibility features to reach a wide range of users",
        "Won 1st place among 50+ teams, recognized for innovation and real-world impact"
      ],
      icon: Trophy
    },
    {
      company: "IVIS Labs Promptathon",
      role: "Participant",
      timeline: "Mar 2025, Bengaluru",
      achievements: [
        "Developed 'Sketch to Slide', a Smart Board to Slide Deck Converter that transformed handwritten notes into structured presentation slides",
        "Implemented AI-based vision models for text and diagram recognition, enabling export to PowerPoint/PDF",
        "Gained experience in prompt engineering, full-stack development and teamwork under tight deadlines"
      ],
      icon: Award
    }
  ];

  // Education Section Data
  const educationData = [
    {
      institution: "AMC Engineering College (Affiliated to VTU)",
      location: "Bengaluru, Karnataka",
      degree: "B.E - CSE (Data Science)",
      timeline: "Sep 2022 – Jul 2026",
      gpa: "GPA: 8.7 / 10 (up to 6th semester)",
      icon: User
    }
  ];

  // Certifications Section Data
  const certificationsData = [
    {
      name: "IBM SQL Certified",
      issuer: "IBM",
      year: "2025",
      link: "https://drive.google.com/file/d/1UEFxEivOCnoKNQRKh_j--BG5yfqV8gXc/view?usp=sharing",
      icon: Database
    },
    {
      name: "Oracle Generative AI Certified",
      issuer: "Oracle",
      year: "2025",
      link: "https://drive.google.com/file/d/1daQqhW4fu7zeTqUwbGBo9NQHSp97dCRY/view?usp=sharing",
      icon: Code
    }
  ];

  // Contact Section Data
  const contactData = {
    email: "tk6377054@gmail.com",
    phone: "+91 8099233649",
    github: "https://github.com/tulsikumar18",
    linkedin: "https://www.linkedin.com/in/tulsi-kumar-yadav-2b749627a",
    resume: "https://drive.google.com/file/d/1d9B7a1PLFNbxO9_lYtNhBTQYzRzt0F3N/view?usp=sharing"
  };

  // Skill Level Bar Component
  const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between mb-2">
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{skill}</span>
        <motion.span
          className="text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200/60 rounded-full h-3 dark:bg-gray-700/60 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-gray-100/30 dark:from-gray-900/50 dark:to-gray-800/50 text-gray-900 dark:text-gray-100 relative backdrop-blur-sm">
      
      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center px-4 py-20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div
          className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroData.name}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 text-gray-900 dark:text-gray-100 max-w-2xl mx-auto font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroData.tagline}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroData.ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant as any}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
                asChild
              >
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {button.text === "Download Resume" && <Download className="mr-2 h-5 w-5" />}
                  {button.text}
                </a>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              data-aos="fade-right"
            >
              <p className="text-lg mb-6 text-gray-900 dark:text-gray-100 font-medium">
                {aboutData.short}
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {aboutData.long}
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-blue-500/70 to-purple-600/70 rounded-2xl p-8 text-white shadow-xl backdrop-blur-md border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              data-aos="fade-left"
            >
              <h3 className="text-2xl font-bold mb-4">My Mission</h3>
              <p className="mb-6">
                To leverage cutting-edge AI and software engineering to solve complex problems and create innovative solutions that make a positive impact on society.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">AI Innovation</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">Full-Stack Development</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">Hackathon Winner</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-20 px-4 bg-gradient-to-br from-gray-100/30 to-gray-200/30 dark:from-gray-900/30 dark:to-gray-800/30 relative overflow-hidden backdrop-blur-sm"
      >
        {/* Background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Skills & Expertise
          </motion.h2>
          <Separator className="mb-16 max-w-xs mx-auto" />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            {/* Programming Languages Card */}
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="h-full"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md transform hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Code className="mr-3 h-6 w-6 text-blue-500" />
                    Programming Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {skillsData.programming.map((skill, index) => (
                    <SkillBar key={index} skill={skill.name} level={skill.level} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI/ML & Data Science Card */}
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="h-full"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md transform hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Database className="mr-3 h-6 w-6 text-purple-500" />
                    AI/ML & Data Science
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {skillsData.aiMl.map((skill, index) => (
                    <SkillBar key={index} skill={skill.name} level={skill.level} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Full-Stack & Mobile Card */}
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="h-full"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md transform hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Server className="mr-3 h-6 w-6 text-indigo-500" />
                    Full-Stack & Mobile
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {skillsData.fullStack.map((skill, index) => (
                    <SkillBar key={index} skill={skill.name} level={skill.level} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tools & Technologies Card */}
            <motion.div
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="h-full"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-full border-0 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md transform hover:scale-[1.02]">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
                    <Github className="mr-3 h-6 w-6 text-gray-600" />
                    Tools & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {skillsData.tools.map((skill, index) => (
                    <SkillBar key={index} skill={skill.name} level={skill.level} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hackathons & Achievements Section */}
      <section
        id="hackathons"
        ref={hackathonsRef}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Hackathons & Achievements
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="space-y-8">
            {hackathonsData.map((hackathon, index) => {
              const Icon = hackathon.icon;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform hover:scale-[1.01] bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-0">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold flex items-center">
                            <Icon className="mr-2 h-6 w-6 text-yellow-500" />
                            {hackathon.name}
                          </h3>
                          <p className="text-lg text-blue-600 dark:text-blue-400">{hackathon.position}</p>
                        </div>
                        <Badge variant="secondary" className="text-sm py-1 px-3">
                          {hackathon.date}
                        </Badge>
                      </div>
                      {hackathon.certificateImage && (
                        <div className="mb-4">
                          <a href={hackathon.certificateImage} target="_blank" rel="noopener noreferrer">
                            <img
                              src={hackathon.certificateImage}
                              alt="Hackathon Certificate"
                              className="rounded-lg shadow-md max-w-xs hover:shadow-lg transition-shadow transform hover:scale-105"
                            />
                          </a>
                        </div>
                      )}
                      <p className="text-gray-900 dark:text-gray-100 font-medium">{hackathon.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-20 px-4 bg-gray-100/30 dark:bg-gray-800/30 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Featured Projects
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="h-full"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:scale-[1.02] bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-0">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                    <p className="text-gray-800 dark:text-gray-200 mb-4 flex-grow font-medium">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4 font-medium">{project.impact}</p>
                    <div className="flex gap-4 mt-auto">
                      {project.links.map((link, idx) => (
                        <Button key={idx} variant="outline" size="sm" asChild className="transform hover:scale-105">
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.text}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={experienceRef}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Experience
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="space-y-12">
            {experienceData.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={index}
                  className="relative pl-8 border-l-2 border-blue-500 dark:border-blue-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold flex items-center text-gray-900 dark:text-gray-100">
                      <Icon className="mr-2 h-5 w-5 text-blue-500" />
                      {exp.role}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{exp.timeline}</p>
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-gray-900 dark:text-gray-100 font-medium">{achievement}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        ref={educationRef}
        className="py-20 px-4 bg-gray-100/30 dark:bg-gray-800/30 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Education
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="space-y-8">
            {educationData.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Card className="shadow-lg transform hover:scale-[1.01] transition-all duration-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Icon className="mr-4 h-6 w-6 text-blue-500 mt-1" />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                          <p className="text-lg text-blue-600 dark:text-blue-400">{edu.institution}</p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">{edu.location}</p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <p className="flex items-center text-gray-900 dark:text-gray-100 font-medium">
                              <Calendar className="mr-2 h-4 w-4" />
                              {edu.timeline}
                            </p>
                            <p className="flex items-center text-gray-700 dark:text-gray-300">
                              <MapPin className="mr-2 h-4 w-4" />
                              {edu.gpa}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        ref={certificationsRef}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Certifications
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto" />
          <div className="grid md:grid-cols-2 gap-6">
            {certificationsData.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:shadow-blue-200 dark:hover:shadow-blue-900 transform hover:scale-[1.02] bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Icon className="mr-3 h-8 w-8 text-blue-500" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{cert.name}</h3>
                      </div>
                      <p className="text-lg text-blue-600 dark:text-blue-400 mb-2 font-semibold">{cert.issuer}</p>
                      <p className="text-gray-800 dark:text-gray-200 mb-4 font-semibold">{cert.year}</p>
                      <Button variant="outline" asChild className="transform hover:scale-105">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          View Certificate
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-20 px-4 bg-gradient-to-br from-blue-500/60 to-purple-600/60 dark:from-blue-700/60 dark:to-purple-800/60 text-white backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Get In Touch
          </motion.h2>
          <Separator className="mb-12 max-w-xs mx-auto bg-white/30" />
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-3 text-lg hover:text-blue-200 transition-colors transform hover:scale-105"
            >
              <Mail className="h-6 w-6" />
              {contactData.email}
            </a>
            <a
              href={`tel:${contactData.phone}`}
              className="flex items-center gap-3 text-lg hover:text-blue-200 transition-colors transform hover:scale-105"
            >
              <span className="text-xl">📞</span>
              {contactData.phone}
            </a>
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:text-blue-200 transition-colors transform hover:scale-105"
            >
              <Linkedin className="h-6 w-6" />
              LinkedIn
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:text-blue-200 transition-colors transform hover:scale-105"
            >
              <Github className="h-6 w-6" />
              GitHub
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            data-aos="fade-up"
          >
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
              asChild
            >
              <a href={contactData.resume} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Full Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p>© {new Date().getFullYear()} Tulsi Kumar Yadav. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors transform hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="hover:text-white transition-colors transform hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <Button variant="link" asChild className="text-gray-400 hover:text-white transform hover:scale-105">
              <a href={contactData.resume} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <div className="mt-4">
              <MadeWithDyad />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;