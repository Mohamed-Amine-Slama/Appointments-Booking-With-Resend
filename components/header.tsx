import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-secondary-foreground font-bold text-sm">CGP</span>
          </div>
          <span className="font-bold text-lg text-foreground">PatrimoineExpert</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#consultations" className="text-muted-foreground hover:text-foreground transition-colors">
            Consultations
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            À propos
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Réserver maintenant</Button>
      </div>
    </header>
  )
}
