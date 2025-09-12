"use client";
import { motion } from "framer-motion";

export default function Carousel() {
  return (
    <div className="bg-gradient-to-r from-[#292828] to-[#525252] h-[350px] ml-30 mr-30 mt-20 rounded-3xl flex justify-between gap-10 overflow-hidden pl-20 pr-20 shadow-lg">
      <div className="flex flex-col justify-center max-w-lg space-y-4">
        <h1 className="text-4xl font-bold text-white Bakbak">
          Découvrez des Événements,<br/> Sortez & Profitez.
        </h1>
        <span className="text-gray-300">
          Les meilleures soirées, concerts et sorties près de chez vous, <br/> toujours au meilleur prix.
        </span>
        <div className="flex gap-4 mt-4">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-500 text-white font-semibold shadow hover:from-gray-600 hover:to-gray-400 transition duration-300">
            Discover
          </button>
          <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-200 font-semibold hover:bg-gray-600 hover:text-white transition duration-300">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex justify-center relative">
        <motion.img
          src="two.png"
          className="h-[300px] mt-30 z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0 }}
        />
        <motion.img
          src="one.png"
          className="h-[300px] mt-15 z-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0 }}
        />
        <motion.img
          src="three.png"
          className="h-[300px] mt-30 z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0 }}
        />
      </div>
    </div>
  );
}
