import Header from "./components/ui/Organisms/Header"
import Footer from "./components/ui/Organisms/Footer"
import ProfileBuilder from "./components/ProfileBuilder"
import SectionButton from "./components/SectionButton"
export default function App() {
  return (
    <>
      <Header/>
      <main className="min-h-screen h-full w-full flex flex-col items-center gap-5 py-5 sm:p-2 lg:py-6 lg:p-26  bg-linear-to-b from-amber-50 to-amber-100">
        <SectionButton />
        <ProfileBuilder />
      </main>
      <Footer/>
    </>
  )
}

