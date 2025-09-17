"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useState } from "react"

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  profession: string;
  age: string;
  income: string;
  debt: string;
  date: string;
  time: string;
}

export function BookingSection() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    profession: '',
    age: '',
    income: '',
    debt: '',
    date: '',
    time: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Helper function to check if a date is a weekday
  const isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // 0 = Sunday, 6 = Saturday
  };

  // Generate time slots from 8:00 to 19:00 (every 30 minutes)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 19 && minute > 0) break; // Stop at 19:00
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validate weekday selection
    if (formData.date && !isWeekday(formData.date)) {
      setSubmitStatus('error');
      setErrorMessage('Veuillez sélectionner un jour de semaine (lundi à vendredi).');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          profession: '',
          age: '',
          income: '',
          debt: '',
          date: '',
          time: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
              📝 Formulaire de prise de rendez-vous
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Merci de compléter vos informations pour confirmer votre rendez-vous 👇
            </p>

            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <AlertCircle className="w-4 h-4" />⚡ Attention : uniquement 10 rendez-vous disponibles cette semaine
            </div>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">
                Réservez votre consultation gratuite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">
                    🎉 Votre demande de rendez-vous a été envoyée avec succès !
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Nous vous contacterons dans les plus brefs délais.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-red-800 font-medium">
                    ❌ Erreur lors de l'envoi
                  </p>
                  <p className="text-red-700 text-sm mt-1">
                    {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">👤 Nom et prénom *</Label>
                    <Input 
                      id="name" 
                      placeholder="Votre nom complet" 
                      required 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">📞 Téléphone mobile *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="06 12 34 56 78" 
                      required 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">📧 Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre.email@exemple.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">💼 Profession *</Label>
                  <Input 
                    id="profession" 
                    placeholder="Votre profession actuelle" 
                    required 
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">🎂 Tranche d'âge *</Label>
                  <Select 
                    value={formData.age} 
                    onValueChange={(value) => handleInputChange('age', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre tranche d'âge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25-35">25-35 ans</SelectItem>
                      <SelectItem value="35-45">35-45 ans</SelectItem>
                      <SelectItem value="45-55">45-55 ans</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">(jusqu'à 55 ans maximum)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">💶 Tranche de revenu du foyer *</Label>
                  <Select 
                    value={formData.income} 
                    onValueChange={(value) => handleInputChange('income', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre tranche de revenu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30-50k">30 000 - 50 000 €</SelectItem>
                      <SelectItem value="50-80k">50 000 - 80 000 €</SelectItem>
                      <SelectItem value="80-120k">80 000 - 120 000 €</SelectItem>
                      <SelectItem value="120k+">Plus de 120 000 €</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debt">🏦 Avez-vous actuellement un crédit ou une dette ? (optionnel)</Label>
                  <Textarea 
                    id="debt" 
                    placeholder="Décrivez brièvement votre situation..." 
                    value={formData.debt}
                    onChange={(e) => handleInputChange('debt', e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">📅 Date du rendez-vous préférée *</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      required 
                      min={getMinDate()}
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      disabled={isSubmitting}
                    />
                    <p className="text-sm text-muted-foreground">
                      (Lundi à vendredi uniquement)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">🕐 Heure du rendez-vous *</Label>
                    <Select 
                      value={formData.time} 
                      onValueChange={(value) => handleInputChange('time', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez l'heure" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      (8h00 à 19h00)
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "✅ Je réserve mon rendez-vous et j'optimise mes impôts dès aujourd'hui"
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>✔️ 100% gratuit – ✔️ Sans engagement – ✔️ Rendez-vous confidentiel</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
