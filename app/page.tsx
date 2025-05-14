"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNavigation } from "@/components/main-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, ArrowRight, GraduationCap, School, Check, X, Star, Clock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeButton } from "@/components/home-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroImage } from "@/components/hero-image"
import { FadeIn, AnimateOnHover, AnimatePresence } from "@/components/animations"

export default function Home() {
  const studentPricingRef = useRef<HTMLDivElement>(null)
  const teacherPricingRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const scrollToStudentPricing = () => {
    if (studentPricingRef.current) {
      studentPricingRef.current.scrollIntoView({ behavior: "smooth" })
      highlightElement(studentPricingRef.current)
    }
  }

  const scrollToTeacherPricing = () => {
    if (teacherPricingRef.current) {
      teacherPricingRef.current.scrollIntoView({ behavior: "smooth" })
      highlightElement(teacherPricingRef.current)
    }
  }

  const highlightElement = (element: HTMLElement) => {
    element.classList.add("scale-105")
    element.classList.add("ring-4")
    element.classList.add("ring-primary")
    element.classList.add("ring-opacity-50")

    setTimeout(() => {
      element.classList.remove("scale-105")
      element.classList.remove("ring-4")
      element.classList.remove("ring-primary")
      element.classList.remove("ring-opacity-50")
    }, 1500)
  }

  return (
    <AnimatePresence>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
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
            <AnimateOnHover>
              <Button asChild>
                <Link href="/signup">Registruotis</Link>
              </Button>
            </AnimateOnHover>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
            <div className="container relative z-10 mx-auto px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
                <FadeIn direction="left" delay={0.2}>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        Dirbtinio intelekto įrankiai kiekvienam
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        mano10 siūlo galingus dirbtinio intelekto įrankius, kurie padidina jūsų produktyvumą ir
                        kūrybiškumą.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <AnimateOnHover>
                        <Link
                          href="/signup"
                          className={cn(
                            buttonVariants({ size: "lg" }),
                            "bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto",
                          )}
                        >
                          Pradėti nemokamai
                        </Link>
                      </AnimateOnHover>
                      <AnimateOnHover>
                        <Link
                          href="#pricing"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "border-primary text-primary hover:bg-primary/10 w-full sm:w-auto",
                          )}
                        >
                          Peržiūrėti kainas
                        </Link>
                      </AnimateOnHover>
                    </div>
                  </div>
                </FadeIn>
                <FadeIn direction="right" delay={0.4}>
                  <div className="flex items-center justify-center mt-8 lg:mt-0">
                    <HeroImage />
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Student/Teacher Section */}
          <section className="py-16 md:py-20">
            <div className="container px-4 md:px-6">
              <FadeIn direction="up" delay={0.2}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                      Pasirinkite savo kelią
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Pritaikyta jūsų poreikiams
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Nesvarbu, ar esate mokinys, norintis mokytis, ar mokytojas, norintis pagerinti savo klasę, mes
                      turime jums tinkamus įrankius.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Student Option */}
                <FadeIn direction="left" delay={0.3}>
                  <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 md:p-8 shadow-md transition-all hover:shadow-lg dark:border-blue-900 dark:from-blue-950 dark:to-gray-900">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 dark:bg-blue-900"></div>
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 dark:bg-blue-900"></div>

                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>

                      <h3 className="mb-3 text-2xl font-bold text-blue-600 dark:text-blue-300">Mokiniams</h3>
                      <p className="mb-6 text-muted-foreground">
                        Naudokitės galingais mokymosi įrankiais, gaukite pagalbą namų darbams ir praktikuokitės su
                        asmeninėmis užduotimis.
                      </p>

                      <ul className="mb-8 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span>24/7 dirbtinio intelekto pagalba namų darbams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span>Asmeninės praktikos užduotys</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span>Mokymosi gidai ir egzaminų pasiruošimas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span>Pažangos sekimas</span>
                        </li>
                      </ul>

                      <div className="mb-6">
                        <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">Nemokamai</span>
                        <span className="ml-1 text-muted-foreground">pradžiai</span>
                      </div>

                      <AnimateOnHover>
                        <Button
                          onClick={scrollToStudentPricing}
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                          Peržiūrėti mokinių planus
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </AnimateOnHover>
                    </div>
                  </div>
                </FadeIn>

                {/* Teacher Option */}
                <FadeIn direction="right" delay={0.4}>
                  <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-b from-green-50 to-white p-6 md:p-8 shadow-md transition-all hover:shadow-lg dark:border-green-900 dark:from-green-950 dark:to-gray-900">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-100 opacity-50 dark:bg-green-900"></div>
                    <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-green-100 opacity-50 dark:bg-green-900"></div>

                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                        <School className="h-6 w-6" />
                      </div>

                      <h3 className="mb-3 text-2xl font-bold text-green-600 dark:text-green-300">Mokytojams</h3>
                      <p className="mb-6 text-muted-foreground">
                        Kurkite įdomų turinį, stebėkite mokinių pažangą ir taupykite laiką naudodami dirbtinio intelekto
                        įrankius.
                      </p>

                      <ul className="mb-8 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                          <span>Automatizuotas turinio kūrimas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                          <span>Mokinių rezultatų analizė</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                          <span>Pamokų planavimo pagalba</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 shrink-0" />
                          <span>Klasės valdymo įrankiai</span>
                        </li>
                      </ul>

                      <div className="mb-6">
                        <span className="text-3xl font-bold text-green-600 dark:text-green-300">Nemokamai</span>
                        <span className="ml-1 text-muted-foreground">pradžiai</span>
                      </div>

                      <AnimateOnHover>
                        <Button
                          onClick={scrollToTeacherPricing}
                          className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                        >
                          Peržiūrėti mokytojų planus
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </AnimateOnHover>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* Testimonials Section (Coming Soon) */}
          <section id="testimonials" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900" ref={testimonialsRef}>
            <div className="container px-4 md:px-6">
              <FadeIn direction="up" delay={0.2}>
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                  <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Netrukus</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Vartotojų atsiliepimai</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Šis skyrius bus atnaujintas netrukus su tikrais vartotojų atsiliepimais apie mano10 platformą.
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 opacity-60">
                {/* Placeholder Testimonial Cards */}
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground">
                  Norite pasidalinti savo patirtimi?{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
                    Susisiekite su mumis
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 md:py-20">
            <div className="container px-4 md:px-6">
              <FadeIn direction="up" delay={0.2}>
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Kainos</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Paprastos, skaidrios kainos</h2>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Pasirinkite jums tinkamą planą su lanksčiomis galimybėmis asmenims ir komandoms.
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                {/* Free Plan */}
                <FadeIn direction="up" delay={0.3}>
                  <Card
                    className="group relative overflow-hidden flex flex-col border-primary/10 transition-all duration-300 dark:border-gray-800"
                    ref={studentPricingRef}
                  >
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100/30 opacity-50 group-hover:opacity-70 transition-opacity dark:bg-blue-900/20"></div>
                    <CardHeader>
                      <CardTitle>Nemokamas</CardTitle>
                      <div className="mt-4 flex items-baseline text-5xl font-bold">
                        0€
                        <span className="ml-1 text-lg font-medium text-muted-foreground">/mėn.</span>
                      </div>
                      <CardDescription className="mt-4">
                        Puikiai tinka išbandyti platformą ir retkarčiais naudotis.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        <PricingItem included>
                          <strong>50</strong> DI žetonų per mėnesį
                        </PricingItem>
                        <PricingItem included>Bazinis turinio kūrimas</PricingItem>
                        <PricingItem included>Ribota analitika</PricingItem>
                        <PricingItem included>Standartinė pagalba</PricingItem>
                        <PricingItem>Pažangios funkcijos</PricingItem>
                        <PricingItem>Prioritetinė pagalba</PricingItem>
                        <PricingItem>Individualios integracijos</PricingItem>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <AnimateOnHover className="w-full">
                        <Button asChild className="w-full" variant="outline">
                          <Link href="/signup">Pradėti</Link>
                        </Button>
                      </AnimateOnHover>
                    </CardFooter>
                  </Card>
                </FadeIn>

                {/* Pro Plan */}
                <FadeIn direction="up" delay={0.4}>
                  <Card
                    className="group relative overflow-hidden flex flex-col border-primary/20 shadow-lg transition-all duration-300 dark:border-gray-800"
                    ref={teacherPricingRef}
                  >
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100/30 opacity-50 group-hover:opacity-70 transition-opacity dark:bg-blue-900/20"></div>
                    <CardHeader className="bg-primary/5 dark:bg-primary/10">
                      <div className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit dark:bg-primary/20">
                        POPULIARIAUSIAS
                      </div>
                      <CardTitle className="mt-2">Pro</CardTitle>
                      <div className="mt-4 flex items-baseline text-5xl font-bold">
                        19.99€
                        <span className="ml-1 text-lg font-medium text-muted-foreground">/mėn.</span>
                      </div>
                      <CardDescription className="mt-4">Viskas, ko reikia profesionaliam naudojimui.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        <PricingItem included>
                          <strong>500</strong> DI žetonų per mėnesį
                        </PricingItem>
                        <PricingItem included>Pažangus turinio kūrimas</PricingItem>
                        <PricingItem included>Pilnas analitikos rinkinys</PricingItem>
                        <PricingItem included>Prioritetinė pagalba</PricingItem>
                        <PricingItem included>Pažangios funkcijos</PricingItem>
                        <PricingItem included>API prieiga (ribota)</PricingItem>
                        <PricingItem>Individualios integracijos</PricingItem>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <AnimateOnHover className="w-full">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                        >
                          <Link href="/signup?plan=pro">Užsisakyti dabar</Link>
                        </Button>
                      </AnimateOnHover>
                    </CardFooter>
                  </Card>
                </FadeIn>

                {/* Enterprise Plan */}
                <FadeIn direction="up" delay={0.5}>
                  <Card className="group relative overflow-hidden flex flex-col border-primary/10 transition-all duration-300 dark:border-gray-800">
                    <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100/30 opacity-50 group-hover:opacity-70 transition-opacity dark:bg-blue-900/20"></div>
                    <CardHeader>
                      <CardTitle>Įmonėms</CardTitle>
                      <div className="mt-4 flex items-baseline text-5xl font-bold">
                        49.99€
                        <span className="ml-1 text-lg font-medium text-muted-foreground">/mėn.</span>
                      </div>
                      <CardDescription className="mt-4">Pažangūs įrankiai komandoms ir verslui.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        <PricingItem included>
                          <strong>2,000</strong> DI žetonų per mėnesį
                        </PricingItem>
                        <PricingItem included>Premium turinio kūrimas</PricingItem>
                        <PricingItem included>Pažangi analitika su įžvalgomis</PricingItem>
                        <PricingItem included>24/7 prioritetinė pagalba</PricingItem>
                        <PricingItem included>Visos pažangios funkcijos</PricingItem>
                        <PricingItem included>Pilna API prieiga</PricingItem>
                        <PricingItem included>Individualios integracijos</PricingItem>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <AnimateOnHover className="w-full">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                        >
                          <Link href="/signup?plan=enterprise">Užsisakyti dabar</Link>
                        </Button>
                      </AnimateOnHover>
                    </CardFooter>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <FadeIn direction="up" delay={0.2}>
            <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pasiruošę pradėti?</h2>
                  <p className="max-w-[600px] text-white/90 md:text-xl">
                    Prisijunkite prie tūkstančių vartotojų, kurie jau naudojasi mano10 dirbtinio intelekto įrankiais,
                    kad padidintų savo produktyvumą.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row pt-4">
                    <AnimateOnHover>
                      <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                        <Link href="/signup">
                          Registruotis nemokamai
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </AnimateOnHover>
                    <AnimateOnHover>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="border-white text-black bg-white hover:bg-white/90 dark:text-black dark:bg-white dark:hover:bg-white/90 w-full sm:w-auto"
                      >
                        <Link href="/login">Prisijungti</Link>
                      </Button>
                    </AnimateOnHover>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
        </main>

        <SiteFooter />
      </div>
    </AnimatePresence>
  )
}

function PricingItem({ children, included = false }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mt-0.5 shrink-0 dark:text-gray-600" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>{children}</span>
    </li>
  )
}
