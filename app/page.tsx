"use client"

import { useState, useEffect } from "react"
import TaskBoard from "@/components/task-board"
import type { Task, Column } from "@/types/task"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [githubConnecting, setGithubConnecting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollCTA(true);
      } else {
        setShowScrollCTA(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const connectGitHub = () => {
    setGithubConnecting(true);
    // In a real implementation, this would redirect to GitHub OAuth flow
    setTimeout(() => {
      alert("This would connect to GitHub in a real implementation");
      setGithubConnecting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Floating CTA button */}
      {showScrollCTA && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-6 rounded-full shadow-lg animate-pulse-subtle">
              <span className="mr-2">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </Link>
        </div>
      )}

      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          <span className="text-xl font-bold">TaskFlow</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#github-integration" className="text-sm font-medium hover:underline underline-offset-4">
            GitHub
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Streamline Your Tasks with TaskFlow
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Organize, prioritize, and track your tasks efficiently. Boost productivity with our intuitive task management solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border bg-white shadow-lg">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 h-[200px] rounded-lg bg-blue-50 p-3">
                        <h3 className="font-medium mb-2">To Do</h3>
                        <div className="space-y-2">
                          <div className="h-12 bg-white rounded shadow-sm p-2 text-xs">Create project plan</div>
                          <div className="h-12 bg-white rounded shadow-sm p-2 text-xs">Research competitors</div>
                        </div>
                      </div>
                      <div className="col-span-1 h-[200px] rounded-lg bg-yellow-50 p-3">
                        <h3 className="font-medium mb-2">In Progress</h3>
                        <div className="space-y-2">
                          <div className="h-12 bg-white rounded shadow-sm p-2 text-xs">Design mockups</div>
                        </div>
                      </div>
                      <div className="col-span-1 h-[200px] rounded-lg bg-green-50 p-3">
                        <h3 className="font-medium mb-2">Done</h3>
                        <div className="space-y-2">
                          <div className="h-12 bg-white rounded shadow-sm p-2 text-xs">Set up repository</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the powerful tools that make TaskFlow the perfect solution for your task management needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" x2="15" y1="15" y2="15" />
                  </svg>
                  <h3 className="text-xl font-bold">Kanban Boards</h3>
                </div>
                <p className="text-gray-500">Visualize your workflow with customizable Kanban boards.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <h3 className="text-xl font-bold">Task Tracking</h3>
                </div>
                <p className="text-gray-500">Set deadlines and track progress with ease.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  <h3 className="text-xl font-bold">Intuitive Interface</h3>
                </div>
                <p className="text-gray-500">Simple and clean design that's easy to use for everyone.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-white" id="github-integration">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-1 fill-current">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span>GitHub Integration</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Seamlessly Connect with GitHub</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Link your tasks directly to GitHub issues and pull requests. Automate your workflow and keep everything in sync.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Automatically create tasks from GitHub issues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Two-way synchronization with real-time updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    <span>Track PR status within your TaskFlow dashboard</span>
                  </li>
                </ul>
                <div>
                  <Button 
                    className="bg-black text-white hover:bg-gray-800" 
                    onClick={connectGitHub}
                    disabled={githubConnecting}
                  >
                    {githubConnecting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                        </svg>
                        Connect with GitHub
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] rounded-lg border bg-white p-4 shadow-lg overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-white">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">GitHub Issues</h3>
                        <p className="text-sm text-gray-500">Synced with TaskFlow</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 rounded-md border p-3 bg-gray-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">#142 - Add authentication to API endpoints</span>
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">bug</span>
                          </div>
                          <p className="text-xs text-gray-500">Opened 2 days ago by @developer1</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-md border p-3 bg-gray-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-purple-500"></div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">#138 - Implement dark mode toggle</span>
                            <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">enhancement</span>
                          </div>
                          <p className="text-xs text-gray-500">Opened 3 days ago by @designer2</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-md border p-3 bg-gray-50">
                        <div className="mt-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">#136 - Optimize database queries</span>
                            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">performance</span>
                          </div>
                          <p className="text-xs text-gray-500">Opened 4 days ago by @developer3</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100" id="stats">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-blue-600">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">10,000+</h2>
                <p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400">Happy Users</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-green-600">
                      <path d="M12 2v20"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">1.2M</h2>
                <p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400">Tasks Completed</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-yellow-600">
                      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                      <path d="M2 7h20"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">500+</h2>
                <p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400">Companies</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-red-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">99.9%</h2>
                <p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400">Uptime</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TaskFlow is trusted by thousands of teams worldwide to manage their workflows efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" className="h-5 w-5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "TaskFlow completely transformed how our team manages projects. The intuitive interface made adoption across the company seamless."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">SJ</div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Project Manager, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" className="h-5 w-5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "As a freelancer juggling multiple clients, TaskFlow helps me stay organized and meet all my deadlines. I couldn't work without it!"
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">ML</div>
                  <div>
                    <p className="font-medium">Marcus Lee</p>
                    <p className="text-sm text-gray-500">Independent Designer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="gold" className="h-5 w-5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-500 mb-4">
                    "We've tried several task management tools, but TaskFlow's simplicity and power make it the clear winner for our entire organization."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">AR</div>
                  <div>
                    <p className="font-medium">Aisha Ramirez</p>
                    <p className="text-sm text-gray-500">COO, StartupHub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="pricing">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Plans</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan for your needs. All plans include core features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="mt-1 text-gray-500">For individuals just getting started</p>
                  <div className="mt-6 text-4xl font-bold">$0</div>
                  <p className="mt-1 text-gray-500">per month</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Up to 10 tasks
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Basic Kanban board
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm ring-2 ring-blue-600">
                <div className="flex-1">
                  <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                    Popular
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">Pro</h3>
                  <p className="mt-1 text-gray-500">For professionals and small teams</p>
                  <div className="mt-6 text-4xl font-bold">$9.99</div>
                  <p className="mt-1 text-gray-500">per month</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Unlimited tasks
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Advanced Kanban features
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Task analytics
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="mt-1 text-gray-500">For organizations and large teams</p>
                  <div className="mt-6 text-4xl font-bold">$29.99</div>
                  <p className="mt-1 text-gray-500">per month</p>
                  <ul className="mt-6 space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Everything in Pro
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Team collaboration
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-green-500">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Priority support
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button className="w-full" variant="outline">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="faq">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about TaskFlow
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">How do I get started with TaskFlow?</h3>
                <p className="mt-2 text-gray-500">
                  Getting started is easy! Just click the "Get Started" button, create your free account, and you can immediately begin creating and managing tasks.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Can I collaborate with my team?</h3>
                <p className="mt-2 text-gray-500">
                  Yes! Our Pro and Enterprise plans include team collaboration features that allow you to share boards, assign tasks, and track progress together.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Is my data secure?</h3>
                <p className="mt-2 text-gray-500">
                  Absolutely. We use industry-standard encryption and security measures to ensure your data is safe. We also offer regular backups and have a 99.9% uptime guarantee.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Can I upgrade or downgrade my plan?</h3>
                <p className="mt-2 text-gray-500">
                  Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Do you offer a mobile app?</h3>
                <p className="mt-2 text-gray-500">
                  Yes! TaskFlow is available on iOS and Android, so you can manage your tasks on the go. All changes sync instantly across all your devices.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">What kind of support do you offer?</h3>
                <p className="mt-2 text-gray-500">
                  We offer email support for all plans, with priority support for Enterprise customers. Our knowledge base also has extensive documentation and guides to help you get the most out of TaskFlow.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-500 to-purple-600 text-white" id="cta">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Ready to Boost Your Productivity?</h2>
                <p className="max-w-[900px] text-gray-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of happy users who are already managing their tasks with TaskFlow.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Get Started for Free</Button>
                </Link>
                <Link href="#pricing">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">View Pricing</Button>
                </Link>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-100">No credit card required. Start with our free plan today.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span className="text-xl font-bold">TaskFlow</span>
              </div>
              <p className="text-gray-400 text-sm">
                The simplest way to manage your tasks and boost productivity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white text-sm">Features</Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm">Dashboard</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Roadmap</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Documentation</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Guides</Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-400 hover:text-white text-sm">FAQs</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">About</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Careers</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Contact</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">© 2024 TaskFlow. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-4 md:mt-0">Made with ❤️ for productivity enthusiasts</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

