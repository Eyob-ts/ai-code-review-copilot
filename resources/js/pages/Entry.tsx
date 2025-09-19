import Benefits from "@/components/sections/Benefits";
import Demo from "@/components/sections/Demo";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Header from "@/layouts/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground grid-pattern">
      <Header />
      <Hero/>
      <HowItWorks/>
      <Demo />
      <Benefits />
      {/* <Footer /> */}
      
    </div>
  )
}