import Hero from "@/components/sections/Hero";
import Header from "@/layouts/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground grid-pattern">
      <Header />
      <Hero/>
      
    </div>
  )
}