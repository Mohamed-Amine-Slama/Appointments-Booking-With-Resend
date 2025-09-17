import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Karim, 42 ans",
      text: "Grâce à mon CGP, j'ai réduit mes impôts de 20% et mieux préparé ma retraite !",
      rating: 5,
    },
    {
      name: "Marie, 38 ans",
      text: "Un accompagnement personnalisé qui m'a permis d'optimiser mes investissements.",
      rating: 5,
    },
    {
      name: "Pierre, 45 ans",
      text: "Excellent conseil pour la transmission de mon patrimoine. Je recommande vivement !",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-muted-foreground">Des témoignages authentiques de clients satisfaits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-4 leading-relaxed">"{testimonial.text}"</blockquote>
                <cite className="text-muted-foreground font-medium">– {testimonial.name}</cite>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
