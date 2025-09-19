import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, GitBranch, Zap } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Github className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>1. Connect GitHub</CardTitle>
              <CardDescription>
                Securely connect your GitHub account with OAuth authentication
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GitBranch className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>2. Pick a Repo & PR</CardTitle>
              <CardDescription>
                Select any repository and see all open pull requests ready for review
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>3. Get Instant Review</CardTitle>
              <CardDescription>
                Receive AI-generated feedback with actionable suggestions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
