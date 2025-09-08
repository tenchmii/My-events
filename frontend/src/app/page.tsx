import Navbar from "./Components/Navbar";
import AllEvents from "./events/page";
import Carousel from "./Components/Carousel";
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#1E1E1E]">
        <Navbar />
        <div className="max-w-7xl mx-auto">
          <Carousel/>
          <AllEvents/>
        </div>

      </div>

    </>
  )
}