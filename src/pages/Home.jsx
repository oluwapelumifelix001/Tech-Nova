import Hero from '../components/home/Hero'
import CategorySelector from '../components/home/CategorySelector'
import EmailForm from '../components/home/EmailForm'
import About from '../components/home/About'

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full relative">
            <Hero />
            <CategorySelector />
            <About />
         
        </div>
    )
}
