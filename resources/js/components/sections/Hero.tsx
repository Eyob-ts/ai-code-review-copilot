import { Button } from "../ui/button"
import { Github, Eye, } from "lucide-react"
import { Badge} from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Text Content */}
            <div className="text-left lg:w-1/2">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                AI for Enterprise
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
                Instant, human-like code reviews for your GitHub PRs
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8">
                Empower your development team with AI-powered code reviews that catch issues, suggest improvements, and
                maintain code quality at scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Github className="w-5 h-5 mr-2" />
                  Login with GitHub
                </Button>
                <Button variant="outline" size="lg" className="border-accent/20 hover:bg-accent/10 bg-transparent">
                  <Eye className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Right Column - Placeholder for an image or illustration */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-muted/20 rounded-xl p-8 border border-border/50 w-full max-w-md aspect-square flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="mx-auto bg-accent/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-accent" />
                  </div>
                  <p>Code Review Illustration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}