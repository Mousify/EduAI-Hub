import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";
import Link from "next/link";

export const metadata = {
  title: "Paslaugų teikimo sąlygos | AI Tutoring & Classroom Hub",
  description:
    "Sąlygos ir nuostatos naudojantis mūsų AI pagrįsta mokymosi platforma.",
};

export default function TermsPage() {
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

      <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Paslaugų teikimo sąlygos
          </h1>
          <p className="text-muted-foreground">
            Atnaujinta: 2024 m. balandžio 29 d.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Įvadas</h2>
          <p>
            Sveiki atvykę į AI Tutoring & Classroom Hub. Šios Paslaugų teikimo
            sąlygos ("Sąlygos") reglamentuoja jūsų prieigą prie mūsų svetainės,
            produktų ir paslaugų ("Paslaugos"). Naudodamiesi mūsų Paslaugomis,
            sutinkate laikytis šių Sąlygų ir mūsų Privatumo politikos.
          </p>

          <h2>2. Mūsų paslaugų naudojimas</h2>
          <h3>2.1 Paskyros registracija</h3>
          <p>
            Norėdami pasiekti tam tikras mūsų Paslaugų funkcijas, gali būti
            reikalaujama užsiregistruoti paskyroje. Sutinkate pateikti tikslų,
            dabartinį ir išsamų informaciją registracijos metu ir atnaujinti
            tokią informaciją, kad ji išliktų tikslia, dabartine ir išsamia.
          </p>

          <h3>2.2 Paskyros saugumas</h3>
          <p>
            Jūs esate atsakingi už savo slaptažodžio saugumą ir už visus
            veiksmus, kurie vyksta jūsų paskyroje. Sutinkate nedelsiant pranešti
            mums apie bet kokį neautorizuotą jūsų paskyros naudojimą.
          </p>

          <h3>2.3 Amžiaus apribojimai</h3>
          <p>
            Mūsų Paslaugos skirtos vartotojams, kuriems yra bent 13 metų. Jei
            jums nėra 13 metų, negalite naudotis mūsų Paslaugomis be tėvų
            sutikimo.
          </p>

          <h2>3. Turinys ir elgesys</h2>
          <h3>3.1 Vartotojo turinys</h3>
          <p>
            Mūsų Paslaugos gali leisti jums įkelti, pateikti, saugoti, siųsti
            arba gauti turinį. Jūs išlaikote bet kokių intelektinės nuosavybės
            teisių, kurias turite tame turinyje, nuosavybę.
          </p>

          <h3>3.2 Draudžiamas elgesys</h3>
          <p>Sutinkate nenaudoti mūsų Paslaugų netinkamai. Tai apima:</p>
          <ul>
            <li>
              Paslaugų naudojimą bet kokiais neteisėtais tikslais arba
              pažeidžiant įstatymus
            </li>
            <li>
              Kitų asmenų teisių, įskaitant intelektinės nuosavybės teises,
              pažeidimą
            </li>
            <li>
              Netinkamo, įžeidžiančio arba kenksmingo turinio įkėlimą ar
              bendrinimą
            </li>
            <li>
              Bandymus trukdyti ar pažeisti sistemos vientisumą ar saugumą
            </li>
            <li>Paslaugų naudojimą akademiniam nešvankumui ar sukčiavimui</li>
          </ul>

          <h2>4. Prenumerata ir mokėjimai</h2>
          <h3>4.1 Atsiskaitymas</h3>
          <p>
            Kai kurioms mūsų Paslaugoms reikalingas mokėjimas. Prenumeruodami
            mokamą planą, sutinkate mokėti su pasirinktu planu susijusius
            mokesčius. Visi mokesčiai yra be mokesčių, nebent nurodyta kitaip.
          </p>

          <h3>4.2 Atšaukimas</h3>
          <p>
            Galite bet kada atšaukti savo prenumeratą. Atšaukus, jūsų
            prenumerata išliks aktyvi iki einamojo atsiskaitymo laikotarpio
            pabaigos.
          </p>

          <h2>5. Intelektinė nuosavybė</h2>
          <p>
            Paslaugos ir jų originalus turinys, funkcijos ir funkcionalumas
            priklauso AI Tutoring & Classroom Hub ir yra apsaugoti
            tarptautinėmis autorių teisių, prekės ženklų, patentų, verslo
            paslapčių ir kitų intelektinės nuosavybės ar nuosavybinių teisių
            įstatymais.
          </p>

          <h2>6. Nutraukimas</h2>
          <p>
            Galime nutraukti arba sustabdyti jūsų paskyrą ir prieigą prie
            Paslaugų iškart, be išankstinio įspėjimo ar atsakomybės, dėl bet
            kokios priežasties, įskaitant šių Sąlygų pažeidimą.
          </p>

          <h2>7. Garantijų atsisakymas</h2>
          <p>
            Mūsų Paslaugos teikiamos "kaip yra" be jokių garantijų, išreikštų ar
            numanomų. Negarantuojame, kad mūsų Paslaugos visada bus prieinamos,
            nepertraukiamos ar be klaidų.
          </p>

          <h2>8. Atsakomybės apribojimas</h2>
          <p>
            Maksimaliai leistinu mastu, AI Tutoring & Classroom Hub neprisiima
            atsakomybės už bet kokius netiesioginius, atsitiktinius, ypatingus,
            pasekmių arba baudžiamuosius nuostolius, arba bet kokius pelno ar
            pajamų nuostolius.
          </p>

          <h2>9. Sąlygų pakeitimai</h2>
          <p>
            Galime bet kada modifikuoti šias Sąlygas. Jei atliekame pakeitimus,
            pranešime apie juos, pavyzdžiui, išsiųsdami el. laiško pranešimą
            arba pateikdami pranešimą per mūsų Paslaugas. Tęsdami naudotis mūsų
            Paslaugomis po pakeistų Sąlygų įsigaliojimo datos, sutinkate su
            sąlygomis.
          </p>

          <h2>10. Susisiekite su mumis</h2>
          <p>
            Jei turite klausimų apie šias Sąlygas, susisiekite su mumis el.
            paštu support@aitutoringhub.com.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
