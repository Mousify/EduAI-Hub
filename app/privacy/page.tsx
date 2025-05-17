import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";
import {
  CheckCircle,
  HelpCircle,
  Building,
  Users,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPolicyPage() {
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
            Privatumo politika
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Atnaujinta: 2024 m. balandžio 29 d.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <h2>1. Įvadas</h2>
          <p>
            Sveiki atvykę į AI Tutoring & Classroom Hub. Mes gerbiame jūsų
            privatumą ir esame įsipareigoję apsaugoti jūsų asmeninius duomenis.
            Ši privatumo politika informuos jus apie tai, kaip mes saugome jūsų
            asmeninius duomenis lankantis mūsų svetainėje, ir pasakys apie jūsų
            privatumo teises bei kaip įstatymas jus apsaugo.
          </p>

          <h2>2. Duomenys, kuriuos renkame</h2>
          <p>
            Mes galime rinkti, naudoti, saugoti ir perduoti įvairius asmeninius
            duomenis apie jus, kuriuos sugrupavome taip:
          </p>
          <ul>
            <li>
              <strong>Tapatybės duomenys</strong> apima vardą, pavardę,
              vartotojo vardą ar panašų identifikatorių ir gimimo datą.
            </li>
            <li>
              <strong>Kontaktiniai duomenys</strong> apima el. pašto adresą ir
              telefono numerius.
            </li>
            <li>
              <strong>Techniniai duomenys</strong> apima interneto protokolo
              (IP) adresą, jūsų prisijungimo duomenis, naršyklės tipą ir
              versiją, laiko juostos nustatymą ir vietą, naršyklės įskiepių
              tipus ir versijas, operacinę sistemą ir platformą bei kitą
              technologiją įrenginiuose, kuriuos naudojate pasiekti šią
              svetainę.
            </li>
            <li>
              <strong>Naudojimo duomenys</strong> apima informaciją apie tai,
              kaip naudojate mūsų svetainę, produktus ir paslaugas.
            </li>
            <li>
              <strong>Mokymosi duomenys</strong> apima informaciją apie jūsų
              mokymosi veiklą, pažangą ir rezultatus.
            </li>
          </ul>

          <h2>3. Kaip naudojame jūsų duomenis</h2>
          <p>
            Mes naudosime jūsų asmeninius duomenis tik tada, kai įstatymas tai
            leidžia. Dažniausiai naudosime jūsų asmeninius duomenis šiomis
            aplinkybėmis:
          </p>
          <ul>
            <li>Registruoti jus kaip naują klientą.</li>
            <li>Teikti ir tobulinti mūsų paslaugas jums.</li>
            <li>Valdyti mūsų santykius su jumis.</li>
            <li>Administruoti ir apsaugoti mūsų verslą ir šią svetainę.</li>
            <li>Pateikti jums atitinkamą svetainės turinį ir reklamą.</li>
            <li>
              Naudoti duomenų analizę mūsų svetainės, produktų/paslaugų,
              rinkodaros, klientų santykių ir patirties tobulinti.
            </li>
          </ul>

          <h2>4. Duomenų saugumas</h2>
          <p>
            Įdiegėme tinkamas saugumo priemones, kad apsaugotume jūsų asmeninius
            duomenis nuo atsitiktinio praradimo, netinkamo naudojimo ar
            neautorizuotos prieigos, pakeitimo ar atskleidimo. Be to, ribojame
            prieigą prie jūsų asmeninių duomenų tik tiems darbuotojams,
            agentams, rangovams ir kitiems trečiosioms šalims, kurioms tai
            reikalinga verslo tikslais.
          </p>

          <h2>5. Duomenų saugojimas</h2>
          <p>
            Jūsų asmeninius duomenis saugosime tik tiek laiko, kiek reikia
            įgyvendinti tikslams, dėl kurių juos surinkome, įskaitant teisinių,
            apskaitos ar ataskaitų reikalavimų įvykdymą.
          </p>

          <h2>6. Jūsų teisinės teisės</h2>
          <p>
            Tam tikromis aplinkybėmis, pagal duomenų apsaugos įstatymus, turite
            teises susijusias su jūsų asmeniniais duomenimis, įskaitant teisę:
          </p>
          <ul>
            <li>Prašyti prieigos prie savo asmeninių duomenų.</li>
            <li>Prašyti savo asmeninių duomenų pataisymo.</li>
            <li>Prašyti savo asmeninių duomenų ištrynimo.</li>
            <li>Prieštarauti savo asmeninių duomenų apdorojimui.</li>
            <li>Prašyti savo asmeninių duomenų apdorojimo apribojimo.</li>
            <li>Prašyti savo asmeninių duomenų pervedimo.</li>
            <li>Teisę atšaukti sutikimą.</li>
          </ul>

          <h2>7. Trečiųjų šalių nuorodos</h2>
          <p>
            Šioje svetainėje gali būti nuorodų į trečiųjų šalių svetaines,
            įskiepius ir programas. Spaudžiant ant šių nuorodų ar įjungiant
            šiuos ryšius, trečiosios šalys gali rinkti ar bendrinti duomenis
            apie jus. Mes nekontroliuojame šių trečiųjų šalių svetainių ir
            neatsakome už jų privatumo pareiškimus.
          </p>

          <h2>8. Privatumo politikos pakeitimai</h2>
          <p>
            Galime atnaujinti savo privatumo politiką nuo laiko iki laiko. Apie
            bet kokius pakeitimus pranešime paskelbdami naują privatumo politiką
            šiame puslapyje ir atnaujindami "Atnaujinta" datą šios privatumo
            politikos viršuje.
          </p>

          <h2>9. Susisiekite su mumis</h2>
          <p>
            Jei turite klausimų apie šią privatumo politiką ar mūsų privatumo
            praktiką, susisiekite su mumis:
          </p>
          <p>
            El. paštas: privacy@aitutoringhub.com
            <br />
            Adresas: 123 Education Street, Learning City, LC 12345
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
