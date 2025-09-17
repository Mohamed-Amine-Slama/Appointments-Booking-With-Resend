import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />📅 Réservez votre rendez-vous gratuit avec un Conseiller en Gestion de
            Patrimoine
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Optimisez votre avenir financier aujourd'hui
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Vous cherchez à réduire vos impôts, préparer votre retraite, investir intelligemment, transmettre votre
            patrimoine, ou simplement mieux organiser vos finances ?
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nos Conseillers en Gestion de Patrimoine (CGP) vous proposent un premier échange gratuit de 30 minutes, sans
            aucun engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-4"
            >
              ✅ Réserver mon rendez-vous gratuit
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
              En savoir plus
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-secondary" />
              100% gratuit
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-secondary" />
              Sans engagement
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-secondary" />
              Rendez-vous confidentiel
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
