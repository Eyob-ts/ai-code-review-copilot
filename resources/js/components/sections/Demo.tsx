import { Card, CardContent } from "@/components/ui/card"
import { Eye, Zap } from "lucide-react"

export default function Demo() {
  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">See it in action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how AI Code Review Copilot analyzes your pull requests
          </p>
        </div>

        {/* Demo Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Window top bar */}
              <div className="bg-muted/30 p-6 border-b border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">AI Code Review Results</span>
                </div>

                {/* Fake Review Results */}
                <div className="space-y-4">
                  <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Eye className="w-3 h-3 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Security Issue Detected</p>
                        <p className="text-xs text-muted-foreground">
                          Line 42: Potential SQL injection vulnerability. Consider using parameterized queries.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Performance Optimization</p>
                        <p className="text-xs text-muted-foreground">
                          Consider memoizing this expensive calculation to improve render performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
