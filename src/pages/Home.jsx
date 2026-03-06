import Hero from '../components/home/Hero'
import CategorySelector from '../components/home/CategorySelector'
import EmailForm from '../components/home/EmailForm'

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full relative">
            <Hero />
            <CategorySelector />
            <EmailForm />
        </div>
    )
}
