import TaskCard  from "./task-card"
import  {ProgressSection}  from "./progress-section"
import  QuickAccess  from "./quick-access"
import  ReflectionCard  from "./reflection-card"
import  ActivityList  from "./activity-list"
import BottomNav from "./bottom-nav.jsx"
import ThemeToggle from "./theme-toggle";
import Link from "next/link"

export function Dashboard() {
  const cards = [
    {
      colorVar: "--color-task-yellow",
      title: "Take psychological test",
      subtitle: "Measure your logical & numerical ability.",
      time: "10-20 min",
      iconLabel: "IQ",
      to : "/option-page"
    },
  
    {
      colorVar: "--color-task-green",
      title: "Mental Health Check",
      subtitle: "Check your emotional well-being using scientific tools.",
      time: "5-7 min",
      iconLabel: "MH",
      to : "/"

    },
    {
      colorVar: "--color-task-purple",
      title: "Academic Assessment",
      subtitle: "Evaluate academic strengths and learning style.",
      time: "10-20 min",
      iconLabel: "AC",
      to : "/"

    },
    {
      colorVar: "--color-task-red",
      title: "Entry Test Prep",
      subtitle: "MCAT, CEAT and other admission test preparation.",
      time: "20-30 min",
      iconLabel: "EP",
      to : "/"

    },
    {
      colorVar: "--color-task-orange",
      title: "Aptitude Test",
      subtitle: "Assess your natural abilities and career potential.",
      time: "20-30 min",
      iconLabel: "AP",
      to : "/"

    },
  ] 

  return (
    <div className="mx-auto w-full max-w-7xl  px-4 py-6 md:px-0 md:py-0">
      {/* Greeting row */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-[18px] font-semibold md:text-xl">{"Hi, Alex 👋"}</h1>
          <p className="text-sm text-muted-foreground">Ready to explore your mind today?</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Profile"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border bg-card text-xs"
            title="Profile"
          >
            👤
          </button>
        </div>
      </div>

      {/* Task cards */}
      <div className="space-y-3 md:space-y-4">
        {cards.map((c, i) => (
          <TaskCard key={i} {...c} />
        ))}
      </div>

      <div className="mt-6 space-y-6">
        <QuickAccess />
        <ProgressSection />
        <ReflectionCard />
        <ActivityList />
      </div>

      <BottomNav />
      <p className="sr-only">Reference screenshots at /images/app-dark.png and /images/app-light.png</p>
    </div>
  )
}
