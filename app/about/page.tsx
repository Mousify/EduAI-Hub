import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";

export default function AboutPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Apie mano10
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Mūsų misija - padaryti kokybišką išsilavinimą prieinamą visiems
            mokiniams naudojant dirbtinio intelekto galią
          </p>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Komanda dirba kartu"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white text-left">
                <h2 className="text-3xl font-bold mb-2">
                  Transformuojame švietimą per AI
                </h2>
                <p className="text-lg max-w-2xl">
                  Įsteigtas 2022 m., mano10 yra dedikuotas užpildyti švietimo
                  spragas ir įgalinti tiek mokinius, tiek mokytojus moderniais
                  AI įrankiais.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mūsų istorija</h2>
              <div className="space-y-4">
                <p>
                  mano10 prasidėjo nuo paprasto pastebėjimo: nors AI
                  transformavo pramonę visame pasaulyje, jo potencialas
                  revoliucionizuoti švietimą išliko daugiausia neišnaudotas.
                  Mūsų įkūrėjai, mokytojų ir technologų komanda, pamatė galimybę
                  sukurti platformą, kuri padarytų individualizuotą mokymąsi
                  prieinamą visiems mokiniams, nepriklausomai nuo aplinkos ar
                  išteklių.
                </p>
                <p>
                  Kas prasidėjo kaip mažas projektas padėti besistengiantiems
                  mokiniams su namų darbais, išsiplėtė į išsamų švietimo
                  platformą, kuri tarnauja tūkstančiams mokinių ir mokytojų
                  visoje šalyje. Mūsų AI pagrįsti įrankiai teikia
                  individualizuotą mokymą, generuoja individualius mokymosi
                  medžiagus ir padeda mokytojams kurti įdomų turinį savo
                  klasėms.
                </p>
                <p>
                  Šiandien mano10 yra švietimo technologijų pirmaujančioje
                  vietoje, nuolat inovuoja, kad užtikrintų, jog kiekvienas
                  mokinys turėtų prieigą prie reikalingos paramos sėkmei. Mes
                  tikime, kad AI turėtų stiprinti žmogaus mokymą, o ne pakeisti
                  jį, ir esame įsipareigoję kurti įrankius, kurie įgalina tiek
                  mokinius, tiek mokytojus.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Mūsų kelionė"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Mūsų misija ir vertybės
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mūsų misija</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Demokratizuoti švietimą teikiant AI pagrįstus mokymosi
                  įrankius, kurie pritaikomi prie kiekvieno mokinio unikalių
                  poreikių, todėl kokybiškas išsilavinimas tampa prieinamas
                  visiems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mūsų vizija</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Pasaulis, kuriame kiekvienas mokinys turi prieigą prie
                  individualizuotos, aukštos kokybės švietimo paramos, kuri
                  padeda jiems pasiekti savo pilną potencialą.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mūsų vertybės</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  Prieinamumas, inovacijos, sąžiningumas ir įsipareigojimas
                  stiprinti žmogaus mokymą, o ne pakeisti jį.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pagrindinės vertybės
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="bg-secondary/10">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Susipažinkite su mūsų komanda
          </h2>

          <Tabs defaultValue="leadership" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="leadership">Vadovybė</TabsTrigger>
              <TabsTrigger value="educators">Mokytojai</TabsTrigger>
              <TabsTrigger value="tech">Technologijų komanda</TabsTrigger>
            </TabsList>

            <TabsContent
              value="leadership"
              className="grid md:grid-cols-3 gap-6"
            >
              {leadershipTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </TabsContent>

            <TabsContent
              value="educators"
              className="grid md:grid-cols-3 gap-6"
            >
              {educatorTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </TabsContent>

            <TabsContent value="tech" className="grid md:grid-cols-3 gap-6">
              {techTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Mūsų poveikis</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-secondary/10 rounded-lg">
              <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
              <p className="text-muted-foreground">Padėtų mokinių</p>
            </div>
            <div className="text-center p-6 bg-secondary/10 rounded-lg">
              <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-muted-foreground">Įgalintų mokytojų</p>
            </div>
            <div className="text-center p-6 bg-secondary/10 rounded-lg">
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">
                Mokyklų naudojančių mūsų platformą
              </p>
            </div>
            <div className="text-center p-6 bg-secondary/10 rounded-lg">
              <p className="text-4xl font-bold text-primary mb-2">2M+</p>
              <p className="text-muted-foreground">Atsakytų klausimų</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Sėkmės istorijos</h3>
                  <div className="space-y-4">
                    <p>
                      "mano10 pakeitė, kaip aš remiu savo mokinius.
                      Individualizuotos praktikos medžiagos padėjo užpildyti
                      mokymosi spragas daugeliui mano besistengiančių mokinių."
                    </p>
                    <p className="font-medium">
                      — Sarah Johnson, 8 klasės matematikos mokytoja
                    </p>
                    <Separator />
                    <p>
                      "Kaip mokiniui su disleksija, visada kentėjau nuo skaitymo
                      suvokimo sunkumų. AI mokymas padėjo man suprasti
                      sudėtingus tekstus būdais, kurie veikia mano mokymosi
                      stiliui."
                    </p>
                    <p className="font-medium">
                      — Miguel Rodriguez, 11 klasės mokinys
                    </p>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="/testimonials">
                      Skaityti daugiau sėkmės istorijų{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Sėkmės istorijos"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Our Team */}
        <div className="mb-16">
          <div className="bg-secondary/20 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prisijunkite prie mūsų komandos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Visada ieškome aistringų mokytojų, kūrėjų ir AI specialistų, kurie
              padėtų mums transformuoti švietimą.
            </p>
            <Button size="lg" asChild>
              <Link href="/careers">Peržiūrėti atidarytas pozicijas</Link>
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Susisiekite</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Turite klausimų apie mano10? Mums būtų malonu išgirsti nuo jūsų.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Susisiekite su mumis</Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function TeamMemberCard({ member }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  );
}

const coreValues = [
  {
    title: "Prieinamumas",
    description:
      "Tikime, kad kokybiškas išsilavinimas turėtų būti prieinamas visiems mokiniams, nepriklausomai nuo aplinkos ar išteklių.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Inovacijos",
    description: "Nuolat stumiamės į priekį, kas įmanoma su AI švietime.",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Sąžiningumas",
    description:
      "Esame įsipareigoję etiniam AI naudojimui, duomenų privatumui ir skaidriai veiklai.",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Bendruomenė",
    description:
      "Tikime, kad reikia ugdyti paramos bendruomenę, susidedančią iš mokinių, mokytojų ir tėvų.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];

const leadershipTeam = [
  {
    name: "Dr. Emily Chen",
    role: "Bendrakūrėja ir CEO",
    bio: "Buvusi švietimo profesorė su 15+ metų patirtimi EdTech srityje. Aistringa dėl kokybiško išsilavinimo prieinamumo visiems.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Michael Rodriguez",
    role: "Bendrakūrėjas ir CTO",
    bio: "AI specialistas su patirtimi mašininiame mokymesi ir natūralios kalbos apdorojime. Anksčiau vadovavo AI komandoms didelėse technologijų įmonėse.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Dr. James Wilson",
    role: "Vyriausiasis švietimo vadovas",
    bio: "Buvęs vidurinės mokyklos direktorius ir rajonų vadovas su 20+ metų patirtimi švietimo administravime ir mokymo programų kūrime.",
    image: "/placeholder.svg?height=400&width=400",
  },
];

const educatorTeam = [
  {
    name: "Sarah Johnson",
    role: "Mokymo programų vadovė",
    bio: "Buvusi vidurinės mokyklos mokytoja su patirtimi kuriant standartus atitinkančią švietimo medžiagą įvairiose disciplinose.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "David Park",
    role: "Švietimo turinio direktorius",
    bio: "Specializuojasi kuriant įdomią, prieinamą mokymosi medžiagą įvairioms mokinių populiacijoms ir mokymosi stiliams.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Maria Gonzalez",
    role: "Specialiojo ugdymo specialistė",
    bio: "Sutelkia dėmesį į tai, kad mūsų platforma atitiktų mokinių su įvairiais mokymosi reikalavimais ir gebėjimais poreikius.",
    image: "/placeholder.svg?height=400&width=400",
  },
];

const techTeam = [
  {
    name: "Alex Thompson",
    role: "Vyr. AI inžinierius",
    bio: "Specializuojasi kuriant ir pritaikant didelius kalbos modelius švietimo programoms ir individualizuotam mokymuisi.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Priya Patel",
    role: "Produkto vadovė",
    bio: "Vadovauja mūsų produkto vystymui, sutelkdama dėmesį į intuityvius, prieinamus sąsajas mokiniams ir mokytojams.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Ryan Kim",
    role: "Duomenų mokslo vadovas",
    bio: "Analizuoja mokymosi modelius ir rezultatus, kad nuolat tobulintų mūsų AI mokymo ir turinio generavimo algoritmus.",
    image: "/placeholder.svg?height=400&width=400",
  },
];
