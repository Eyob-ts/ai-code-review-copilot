import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, Shield, DollarSign, Globe } from "lucide-react"

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why teams choose AI Code Review Copilot
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accelerate development while maintaining the highest code quality standards
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Clock className="w-8 h-8 text-accent mb-3" />
              <CardTitle className="text-lg">Saves Time</CardTitle>
              <CardDescription>
                Get instant feedback instead of waiting hours or days for human reviewers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Shield className="w-8 h-8 text-accent mb-3" />
              <CardTitle className="text-lg">Consistent Reviews</CardTitle>
              <CardDescription>
                Maintain consistent code quality standards across all pull requests
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <DollarSign className="w-8 h-8 text-accent mb-3" />
              <CardTitle className="text-lg">Cost Effective</CardTitle>
              <CardDescription>
                More affordable than hiring senior developers for code review tasks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Globe className="w-8 h-8 text-accent mb-3" />
              <CardTitle className="text-lg">Works Anywhere</CardTitle>
              <CardDescription>
                Compatible with any GitHub repository, public or private
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
