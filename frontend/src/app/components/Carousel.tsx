"use client";
import { motion } from "framer-motion";
export default function Carousel() {
  return (
    <div className=" bg-[#333232] h-[350px] m-10 rounded-3xl flex justify-between overflow-hidden pl-20 pr-20">
      <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white Bakbak">Plan Less, Enjoy More,<br/> Every Time You Go Out.</h1>
          <span>Best events at the best price.</span>
          <div>
            <button>Discover</button>
          </div>
      </div>
      <div className="flex justify-center relative">
        <motion.img src="two.png" className="h-[300px] mt-30 z-10" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0 }}/>
        <motion.img src="one.png" className="h-[300px mt-15 z-20]" initial={{ y:50, opacity:0}} animate={{ y:0, opacity: 1}} transition={{ duration: 0.4, delay: 0 }} />
        <motion.img src="three.png" className="h-[300px] mt-30 z-10" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0 }}/>
      </div>
    </div>
  );
}
