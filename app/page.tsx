import { Navbar } from '@/components/hackumass/navbar'
import { Hero } from '@/components/hackumass/hero'
import { Ticker } from '@/components/hackumass/ticker'
import { About } from '@/components/hackumass/about'
import { HallOfFame } from '@/components/hackumass/hall-of-fame'
import { Schedule } from '@/components/hackumass/schedule'
import { Sponsors } from '@/components/hackumass/sponsors'
import { WhySponsor } from '@/components/hackumass/why-sponsor'
import { BonusStages } from '@/components/hackumass/bonus-stages'
import { Faq } from '@/components/hackumass/faq'
import { GameplayFootage } from '@/components/hackumass/gameplay-footage'
import { Team } from '@/components/hackumass/team'
import { Footer } from '@/components/hackumass/footer'
import { LobsterNarrator } from '@/components/hackumass/lobster-narrator'
import { ArcadeFx } from '@/components/hackumass/arcade-fx'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <HallOfFame />
      <Schedule />
      <Sponsors />
      <WhySponsor />
      <BonusStages />
      <Faq />
      <GameplayFootage />
      <Team />
      <Footer />
      <LobsterNarrator />
      <ArcadeFx />
    </main>
  )
}
