import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Header() {
    return (
        <header className="border-b border-border/50 bg-background/50 backdrop-blur-md stricky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* LOGO */}
                <div className="flex item-center gap-2" >
                    <span>AI Code Review Copilot</span>
                </div>

            {/**Navigation */}
            <nav className="hidden md:flex item-center gap-6">
                <a href="#how-it-work" className="text-muted-foreground hover:text-foreground transition-colors">
                    How it Works
                </a>
                <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                    Benefits
                </a>
                <Button variant={"outline"} size="sm">
                    <Github className="w-4 h-4 mr-2"/>
                    Login with GitHub
                </Button>
            </nav>
            </div>


        </header>
    )
}