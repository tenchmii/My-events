import Navbar from "./components/Navbar"; 
import EventList from "./components/EventList";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#1E1E1E]">
        <Navbar />

        <main>
          <EventList />
        </main>

      </div>
    </>
  );
}