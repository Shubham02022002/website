import { Achievements } from './components/Achievements'
import { Activity } from './components/Activity'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Work } from './components/Work'

export default function App() {
  return (
    <>
      <Header />
      <main className="relative z-1 mx-auto max-w-page px-6">
        <Hero />
        <Work />
        <Skills />
        <Projects />
        <Activity />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
