import { Button } from "@/components/ui/button"
import { Github, Menu, X, Eye } from "lucide-react"
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Eye className="w-6 h-6 text-muted-foreground mr-2"/>
          <span className="text-xl font-bold">AI Code Review Copilot</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            Login with GitHub
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          className="md:hidden p-2 rounded-lg hover:bg-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        >
          {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </Button>
      </div>
      
      {/* Mobile Menu - Appears below the header */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#demo" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </a>
            <a 
              href="#benefits" 
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </a>
            <Button variant="outline" size="sm" className="w-full mt-2">
              <Github className="w-4 h-4 mr-2" />
              Login with GitHub
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}