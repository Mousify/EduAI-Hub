"use client";

import { useState } from "react";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "student",
    inquiryType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Žinutė išsiųsta!",
      description: "Gavome jūsų žinutę ir netrukus su jumis susisieksime.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      userType: "student",
      inquiryType: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNavigation />
          <HomeButton />
        </div>

        <MainNavigation />

        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Prisijungti</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Registruotis</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Susisiekite su mumis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Turite klausimų ar atsiliepimų? Mums būtų malonu išgirsti nuo jūsų.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Parašykite mums</h3>
              <p className="text-muted-foreground mb-4">
                Bendriems klausimams ir pagalbai
              </p>
              <a
                href="mailto:support@mano10.com"
                className="text-primary hover:underline"
              >
                support@mano10.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Paskambinkite mums</h3>
              <p className="text-muted-foreground mb-4">
                Pirmadienis-Penktadienis, 9:00-17:00
              </p>
              <a
                href="tel:+18005551234"
                className="text-primary hover:underline"
              >
                1-800-555-1234
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                Apsilankykite pas mus
              </h3>
              <p className="text-muted-foreground mb-4">Mūsų būstinė</p>
              <address className="not-italic text-primary">
                123 Education Lane
                <br />
                San Francisco, CA 94107
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Susisiekite</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Vardas</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jūsų vardas"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">El. paštas</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jusu.elpastas@pavyzdys.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Aš esu:</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={handleRadioChange}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Mokinys</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Mokytojas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent">Tėvas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="administrator" id="administrator" />
                    <Label htmlFor="administrator">Administratorius</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiryType">Užklausos tipas</Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value) =>
                    handleSelectChange("inquiryType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pasirinkite užklausos tipą" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Bendras klausimas</SelectItem>
                    <SelectItem value="support">Techninė pagalba</SelectItem>
                    <SelectItem value="billing">
                      Apmokėjimas ir prenumerata
                    </SelectItem>
                    <SelectItem value="partnership">
                      Partnerystės galimybė
                    </SelectItem>
                    <SelectItem value="feedback">
                      Atsiliepimai ir pasiūlymai
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Tema</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Jūsų žinutės tema"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Žinutė</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Kaip galime jums padėti?"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Siunčiama..." : "Siųsti žinutę"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Dažnai užduodami klausimai
              </h2>
              <Tabs defaultValue="students">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="students">Mokiniams</TabsTrigger>
                  <TabsTrigger value="teachers">Mokytojams</TabsTrigger>
                  <TabsTrigger value="schools">Mokykloms</TabsTrigger>
                </TabsList>

                <TabsContent value="students" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Kaip pradėti naudotis mano10?
                    </h3>
                    <p className="text-muted-foreground">
                      Tiesiog užsiregistruokite nemokamai ir iškart gausite
                      prieigą prie mūsų AI mokymosi įrankių ir namų darbų
                      pagalbos funkcijų.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar yra klausimų skaičiaus limitas?
                    </h3>
                    <p className="text-muted-foreground">
                      Nemokamos paskyros turi mėnesinį limitą. Premium
                      prenumeratos siūlo neribotą klausimų skaičių ir papildomas
                      funkcijas.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar galiu naudoti mano10 egzaminų ruošimuisi?
                    </h3>
                    <p className="text-muted-foreground">
                      Taip! Mūsų platforma gali generuoti praktikos klausimus ir
                      mokymosi gidus, pritaikytus jūsų konkrečiams egzaminams ir
                      mokymosi poreikiams.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="teachers" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Kaip galiu stebėti savo mokinių naudojimąsi?
                    </h3>
                    <p className="text-muted-foreground">
                      Mokytojo skydelis pateikia detalią mokinių veiklos
                      analizę, įskaitant praleistą laiką, nagrinėtas temas ir
                      pasiektą pažangą.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar galiu kurti individualų turinį savo klasei?
                    </h3>
                    <p className="text-muted-foreground">
                      Taip! Mūsų turinio generatorius leidžia kurti darbalapius,
                      testus ir pamokų planus, atitinkančius jūsų mokymo
                      programą.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar yra profesinio tobulėjimo galimybių?
                    </h3>
                    <p className="text-muted-foreground">
                      Reguliariai rengiame seminarus ir dirbtuves, padedančias
                      mokytojams maksimaliai išnaudoti platformos potencialą
                      savo klasėse.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="schools" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar siūlote mokyklų licencijas?
                    </h3>
                    <p className="text-muted-foreground">
                      Taip, siūlome masinio licencijavimo galimybes mokykloms ir
                      rajonams su specialiomis administravimo funkcijomis.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Kaip mano10 tvarko mokinių duomenų privatumą?
                    </h3>
                    <p className="text-muted-foreground">
                      Esame visiškai COPPA ir FERPA atitinkantys, su griežta
                      duomenų apsaugos politika. Niekada neparduodame mokinių
                      duomenų.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Ar galime integruoti su esama mokymosi valdymo sistema?
                    </h3>
                    <p className="text-muted-foreground">
                      Taip, siūlome integracijas su populiariausiomis mokymosi
                      valdymo sistemomis, tokiomis kaip Google Classroom, Canvas
                      ir Schoology.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Gyvo pokalbio pagalba
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Reikia neatidėliotinos pagalbos? Mūsų pagalbos komanda
                      pasiekiama per gyvą pokalbį darbo valandomis.
                    </p>
                    <Button variant="outline">Pradėti pokalbį</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden h-[400px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948551!3d37.75781499229416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="mano10 vieta"
          ></iframe>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
