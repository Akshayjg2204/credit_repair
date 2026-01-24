"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles, Menu, X, Check, Shield, TrendingUp, Award, Users, Clock, Zap, Lock, DollarSign, BarChart3, Phone, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CreditPathAnimation } from "@/components/ui/svg-follow-scroll"
import { CreditCardParallax } from "@/components/ui/parallax-scrolling"

const testimonials = [
    {
        name: "Michael Rodriguez",
        role: "Business Owner",
        company: "Rodriguez Enterprises",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "My credit score jumped 150 points in just 6 months! The team was professional, responsive, and delivered exactly what they promised. Best investment I've made.",
        results: ["150+ point increase", "6 months timeline", "100% satisfaction"]
    },
    {
        name: "Sarah Thompson",
        role: "Real Estate Agent",
        company: "Thompson Realty",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "After years of credit issues, I finally qualified for my dream home. The credit repair process was seamless and the results exceeded my expectations.",
        results: ["Home loan approved", "Negative items removed", "Credit restored"]
    },
    {
        name: "David Chen",
        role: "Entrepreneur",
        company: "Chen Innovations",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "Professional service from start to finish. They removed all inaccurate items and helped me understand how to maintain good credit. Highly recommended!",
        results: ["All errors removed", "Credit education", "Ongoing support"]
    },
    {
        name: "Jennifer Martinez",
        role: "Healthcare Professional",
        company: "City Medical Center",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "The transparency and communication throughout the process was outstanding. My credit score improved dramatically and I secured a better car loan rate.",
        results: ["Better loan rates", "Transparent process", "Fast results"]
    },
    {
        name: "Robert Johnson",
        role: "IT Consultant",
        company: "Johnson Tech Solutions",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        text: "I was skeptical at first, but the results speak for themselves. My credit is now in excellent standing and I have access to premium credit cards.",
        results: ["Excellent credit", "Premium cards", "Financial freedom"]
    }
]

const CreditRepairWebsite = () => {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = React.useState(0)
    const [direction, setDirection] = React.useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
    const [showNav, setShowNav] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const viewportHeight = window.innerHeight
            // Show nav after scrolling past the parallax section (about 1 viewport height)
            setShowNav(scrollPosition > viewportHeight * 0.8)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
        }, 6000)

        return () => clearInterval(timer)
    }, [])

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45
        })
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96] as const
            }
        }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const nextTestimonial = () => {
        setDirection(1)
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setDirection(-1)
        setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF8DE] via-white to-[#FFF2C6] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
            {/* Parallax Scrolling Effect - Hero */}
            <CreditCardParallax />

            {/* Navigation */}
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl border-b border-[#8CA9FF]/30 dark:border-[#8CA9FF]/20 transition-all duration-500",
                showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#AAC4F5] to-[#8CA9FF] flex items-center justify-center">
                                <Shield className="h-6 w-6 text-slate-900" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] bg-clip-text text-transparent">
                                Elite Credit Repair
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Features</a>
                            <a href="#pricing" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Testimonials</a>
                            <a href="#faq" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">FAQ</a>
                            <a href="#contact" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Contact</a>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="text-slate-700 dark:text-slate-300"
                            >
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                            <Button className="bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] text-slate-900 hover:from-[#8CA9FF] hover:to-[#AAC4F5]">
                                Get Started
                            </Button>
                        </div>

                        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="md:hidden mt-4 pb-4 flex flex-col gap-4"
                        >
                            <a href="#features" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Features</a>
                            <a href="#pricing" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Testimonials</a>
                            <a href="#faq" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">FAQ</a>
                            <a href="#contact" className="text-sm text-slate-700 dark:text-slate-300 hover:text-[#8CA9FF] transition-colors">Contact</a>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleTheme}
                                className="text-slate-700 dark:text-slate-300 justify-start"
                            >
                                {theme === 'dark' ? <><Sun className="h-4 w-4 mr-2" /> Light Mode</> : <><Moon className="h-4 w-4 mr-2" /> Dark Mode</>}
                            </Button>
                            <Button className="bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] text-slate-900">
                                Get Started
                            </Button>
                        </motion.div>
                    )}
                </div>
            </nav>

            {/* Proof Section */}
            <section className="py-20 bg-gradient-to-b from-[#FFF8DE]/50 to-white dark:from-slate-950 dark:to-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                            Proven Results That Speak
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400">
                            Real numbers from real clients
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {[
                            { icon: Users, number: "10,000+", label: "Happy Clients" },
                            { icon: TrendingUp, number: "150+", label: "Avg Score Increase" },
                            { icon: Award, number: "98%", label: "Success Rate" },
                            { icon: Clock, number: "45", label: "Days Avg Timeline" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-white to-[#FFF8DE]/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm border border-[#AAC4F5]/30 rounded-2xl p-8 text-center shadow-lg"
                                whileHover={{ scale: 1.05, borderColor: "rgba(140, 169, 255, 0.5)" }}
                            >
                                <stat.icon className="h-12 w-12 text-[#8CA9FF] dark:text-[#AAC4F5] mx-auto mb-4" />
                                <div className="text-4xl font-bold text-[#8CA9FF] dark:text-[#AAC4F5] mb-2">{stat.number}</div>
                                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                            Comprehensive Credit Solutions
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400">
                            Everything you need to rebuild your credit
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: Shield,
                                title: "Credit Dispute",
                                description: "Challenge inaccurate items on your credit report with our proven dispute process."
                            },
                            {
                                icon: BarChart3,
                                title: "Score Monitoring",
                                description: "Track your credit score improvements in real-time with detailed analytics."
                            },
                            {
                                icon: Lock,
                                title: "Identity Protection",
                                description: "Safeguard your credit with advanced identity theft protection services."
                            },
                            {
                                icon: DollarSign,
                                title: "Debt Validation",
                                description: "Verify the legitimacy of debts and remove invalid collections."
                            },
                            {
                                icon: Zap,
                                title: "Fast Results",
                                description: "See improvements in as little as 30-45 days with our accelerated process."
                            },
                            {
                                icon: Award,
                                title: "Expert Support",
                                description: "Dedicated credit specialists guide you every step of the way."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                            >
                                <Card className="bg-gradient-to-br from-white to-[#FFF8DE]/30 dark:from-slate-800/50 dark:to-slate-900/50 border-[#AAC4F5]/30 h-full shadow-lg">
                                    <CardHeader>
                                        <div className="h-14 w-14 rounded-full bg-[#AAC4F5]/30 dark:bg-[#8CA9FF]/10 flex items-center justify-center mb-4">
                                            <feature.icon className="h-7 w-7 text-[#8CA9FF] dark:text-[#AAC4F5]" />
                                        </div>
                                        <CardTitle className="text-slate-900 dark:text-white">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-slate-700 dark:text-slate-400">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gradient-to-b from-white to-[#FFF8DE]/50 dark:from-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                            Transparent Pricing
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400">
                            Choose the plan that fits your needs
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                name: "Basic",
                                price: "$79",
                                period: "/month",
                                features: [
                                    "Credit report analysis",
                                    "Basic dispute letters",
                                    "Monthly score updates",
                                    "Email support",
                                    "Educational resources"
                                ],
                                popular: false
                            },
                            {
                                name: "Professional",
                                price: "$129",
                                period: "/month",
                                features: [
                                    "Everything in Basic",
                                    "Advanced disputes",
                                    "Weekly score updates",
                                    "Priority phone support",
                                    "Creditor interventions",
                                    "Identity theft protection"
                                ],
                                popular: true
                            },
                            {
                                name: "Premium",
                                price: "$199",
                                period: "/month",
                                features: [
                                    "Everything in Professional",
                                    "Dedicated specialist",
                                    "Daily score monitoring",
                                    "24/7 VIP support",
                                    "Legal consultation",
                                    "Lifetime credit education",
                                    "Money-back guarantee"
                                ],
                                popular: false
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card className={cn(
                                    "relative h-full shadow-lg",
                                    plan.popular
                                        ? "bg-gradient-to-br from-[#FFF8DE] to-[#AAC4F5]/30 dark:from-[#8CA9FF]/20 dark:to-[#AAC4F5]/20 border-[#8CA9FF] dark:border-[#8CA9FF]"
                                        : "bg-gradient-to-br from-white to-[#FFF8DE]/30 dark:from-slate-800/50 dark:to-slate-900/50 border-[#AAC4F5]/30"
                                )}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-slate-900 dark:text-white text-2xl">{plan.name}</CardTitle>
                                        <div className="mt-4">
                                            <span className="text-5xl font-bold text-[#8CA9FF] dark:text-[#AAC4F5]">{plan.price}</span>
                                            <span className="text-slate-600 dark:text-slate-400">{plan.period}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 text-[#8CA9FF] dark:text-[#AAC4F5] flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            className={cn(
                                                "w-full",
                                                plan.popular
                                                    ? "bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] text-slate-900 hover:from-[#8CA9FF] hover:to-[#AAC4F5]"
                                                    : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700"
                                            )}
                                        >
                                            Get Started
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SVG Path Animation */}
            <CreditPathAnimation />

            {/* Testimonials Section */}
            <section id="testimonials" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#FFF2C6]/20 via-[#AAC4F5]/10 to-[#8CA9FF]/15 dark:from-[#8CA9FF]/[0.08] dark:via-[#AAC4F5]/[0.05] dark:to-[#8CA9FF]/[0.08]"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '400% 400%'
                        }}
                    />
                </div>

                <motion.div
                    className="relative z-10 max-w-7xl mx-auto px-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#AAC4F5]/30 dark:bg-white/[0.08] border border-[#8CA9FF]/40 dark:border-white/[0.15] backdrop-blur-sm mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Sparkles className="h-4 w-4 text-[#8CA9FF]" />
                            <span className="text-sm font-medium text-slate-800 dark:text-white/80">
                                Client Success Stories
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
                            variants={fadeInUp}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80">
                                Trusted by
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-[#AAC4F5] via-[#8CA9FF] to-[#8CA9FF] dark:from-[#AAC4F5] dark:via-[#8CA9FF] dark:to-[#8CA9FF] bg-clip-text text-transparent">
                                Thousands
                            </span>
                        </motion.h2>
                    </motion.div>

                    {/* Testimonial slider implementation omitted to save space, but added back partially. */}
                    {/* I will implement the slider as it is a key visual part */}

                    <div className="relative max-w-6xl mx-auto mb-16">
                        <div className="relative h-[500px] md:h-[400px]" style={{ perspective: "1000px" }}>
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={currentTestimonialIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.4 },
                                        scale: { duration: 0.4 },
                                        rotateY: { duration: 0.6 }
                                    }}
                                    className="absolute inset-0"
                                >
                                    <div className="relative h-full bg-gradient-to-br from-white/90 to-[#FFF8DE]/90 dark:from-white/[0.08] dark:to-white/[0.02] backdrop-blur-xl rounded-3xl border border-[#AAC4F5]/40 dark:border-white/[0.15] p-8 md:p-12 overflow-hidden shadow-2xl">
                                        <motion.div
                                            className="absolute top-8 right-8 opacity-20"
                                            animate={{ rotate: [0, 10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            <Quote className="w-16 h-16 text-slate-900 dark:text-white" />
                                        </motion.div>

                                        <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                                            <div className="flex-shrink-0 text-center md:text-left">
                                                <motion.div
                                                    className="relative mb-6"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-[#AAC4F5]/40 dark:border-white/20 relative">
                                                        <img
                                                            src={testimonials[currentTestimonialIndex].avatar}
                                                            alt={testimonials[currentTestimonialIndex].name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </motion.div>

                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                                    {testimonials[currentTestimonialIndex].name}
                                                </h3>
                                                <p className="text-[#8CA9FF] dark:text-[#AAC4F5] mb-1 font-medium">
                                                    {testimonials[currentTestimonialIndex].role}
                                                </p>
                                                <p className="text-slate-600 dark:text-white/60 mb-4">
                                                    {testimonials[currentTestimonialIndex].company}
                                                </p>

                                                <div className="flex justify-center md:justify-start gap-1 mb-6">
                                                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: i * 0.1, duration: 0.3 }}
                                                        >
                                                            <Star className="w-5 h-5 fill-[#8CA9FF] text-[#8CA9FF]" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <motion.blockquote
                                                    className="text-xl md:text-2xl text-slate-800 dark:text-white/90 leading-relaxed mb-8 font-light italic"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.8 }}
                                                >
                                                    "{testimonials[currentTestimonialIndex].text}"
                                                </motion.blockquote>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {testimonials[currentTestimonialIndex].results.map((result, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="bg-[#AAC4F5]/20 dark:bg-white/[0.05] rounded-lg p-3 border border-[#8CA9FF]/30 dark:border-white/[0.1] backdrop-blur-sm"
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                                            whileHover={{ backgroundColor: "rgba(140, 169, 255, 0.2)" }}
                                                        >
                                                            <span className="text-sm text-slate-700 dark:text-white/70 font-medium">
                                                                {result}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-center items-center gap-6 mt-8">
                            <motion.button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full bg-[#AAC4F5]/30 dark:bg-white/[0.08] border border-[#8CA9FF]/40 dark:border-white/[0.15] backdrop-blur-sm text-slate-900 dark:text-white hover:bg-[#8CA9FF]/40 dark:hover:bg-white/[0.15] transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </motion.button>

                            <div className="flex gap-3">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => {
                                            setDirection(index > currentTestimonialIndex ? 1 : -1)
                                            setCurrentTestimonialIndex(index)
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonialIndex
                                            ? 'bg-[#8CA9FF] dark:bg-[#AAC4F5] scale-125'
                                            : 'bg-slate-400 dark:bg-white/30 hover:bg-slate-500 dark:hover:bg-white/50'
                                            }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full bg-[#AAC4F5]/30 dark:bg-white/[0.08] border border-[#8CA9FF]/40 dark:border-white/[0.15] backdrop-blur-sm text-slate-900 dark:text-white hover:bg-[#8CA9FF]/40 dark:hover:bg-white/[0.15] transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-gradient-to-b from-[#FFF8DE]/50 to-white dark:from-slate-950 dark:to-slate-900">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400">
                            Everything you need to know about credit repair
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Accordion type="single" collapsible className="space-y-4">
                            {[
                                {
                                    question: "How long does credit repair take?",
                                    answer: "Most clients see results within 30-45 days, with significant improvements within 3-6 months. The timeline varies based on the complexity of your credit issues."
                                },
                                {
                                    question: "Is credit repair legal?",
                                    answer: "Yes, credit repair is 100% legal. The Fair Credit Reporting Act (FCRA) gives you the right to dispute inaccurate information on your credit report."
                                },
                                {
                                    question: "What can be removed from my credit report?",
                                    answer: "We can help remove inaccurate, unverifiable, or outdated negative items including late payments, collections, charge-offs, bankruptcies, and more."
                                },
                                {
                                    question: "Will credit repair hurt my score?",
                                    answer: "No, legitimate credit repair will not hurt your score. In fact, removing negative items typically results in score increases."
                                },
                                {
                                    question: "Do you offer a money-back guarantee?",
                                    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll refund your first month's payment."
                                }
                            ].map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-gradient-to-br from-white to-[#FFF8DE]/50 dark:from-slate-800/50 dark:to-slate-900/50 border border-[#AAC4F5]/30 rounded-xl px-6 shadow-lg"
                                >
                                    <AccordionTrigger className="text-slate-900 dark:text-white hover:text-[#8CA9FF] dark:hover:text-[#AAC4F5] text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-700 dark:text-slate-400">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section & Footer would go here (omitted for brevity, can be added if requested) */}
            {/* Restoring Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                            Get Your Free Consultation
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-slate-400">
                            Start your credit repair journey today
                        </motion.p>
                    </motion.div>

                    {/* Contact form and details */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-[#8CA9FF] dark:text-[#AAC4F5]" />
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
                                    <p className="text-slate-700 dark:text-slate-400">Call us Monday-Friday, 9am-6pm EST</p>
                                    <a href="tel:+18005551234" className="text-[#8CA9FF] dark:text-[#AAC4F5] hover:text-[#AAC4F5] dark:hover:text-[#8CA9FF]">
                                        (800) 555-1234
                                    </a>
                                </div>
                            </div>
                            {/* ... Other contact details ... */}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-white to-[#FFF8DE]/50 dark:from-slate-800/50 dark:to-slate-900/50 border-[#AAC4F5]/30 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-slate-900 dark:text-white">Send us a message</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Input
                                                placeholder="First Name"
                                                className="bg-slate-50 dark:bg-slate-900/50 border-[#AAC4F5]/40 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#8CA9FF]"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder="Last Name"
                                                className="bg-slate-50 dark:bg-slate-900/50 border-[#AAC4F5]/40 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#8CA9FF]"
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        className="bg-slate-50 dark:bg-slate-900/50 border-[#AAC4F5]/40 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#8CA9FF]"
                                    />
                                    <Button className="w-full bg-gradient-to-r from-[#AAC4F5] to-[#8CA9FF] text-slate-900 hover:from-[#8CA9FF] hover:to-[#AAC4F5]">
                                        Get Free Consultation
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-[#FFF8DE]/50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-[#AAC4F5]/30 dark:border-[#8CA9FF]/20 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                        © 2024 Elite Credit Repair. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default CreditRepairWebsite
