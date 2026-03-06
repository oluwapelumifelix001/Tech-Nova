import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Feed from './pages/Feed'
import AskNova from './pages/AskNova'

function App() {
  return (
    <div className="flex flex-col min-h-screen text-slate-100 bg-transparent">
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative z-10 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/ask" element={<AskNova />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
