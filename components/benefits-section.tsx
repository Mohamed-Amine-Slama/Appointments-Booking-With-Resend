import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, TrendingUp, Shield } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8 text-secondary" />,
      title: "Se présenter et expliquer sa démarche",
      description: "L'expert vous explique clairement son approche et sa méthodologie",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-secondary" />,
      title: "Écouter vos objectifs et analyser votre situation",
      description: "Une analyse personnalisée de votre situation financière actuelle",
    },
    {
      icon: <Shield className="w-8 h-8 text-secondary" />,
      title: "Déterminer la valeur ajoutée adaptée",
      description: "Identifier les opportunités d'optimisation spécifiques à vos besoins",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            👉 Lors de ce rendez-vous, l'expert :
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">✅ {benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-8 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            ✔️ Choisissez le format qui vous convient :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">En visioconférence</h4>
              <p className="text-muted-foreground text-sm">Pratique et rapide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">En rendez-vous physique</h4>
              <p className="text-muted-foreground text-sm">
                L'expert se déplace chez vous, avec davantage d'avantages personnalisés
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
