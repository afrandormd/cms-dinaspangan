// components/LogoBar.tsx
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const logos = [
  { src: "/img/logo-lampung.svg", alt: "Logo Lampung" },
  { src: "/img/logo-bandar-lampung.svg", alt: "Logo Bandar Lampung" },
  { src: "/img/logo-badan-pangan.svg", alt: "Logo Badan Pangan Nasional" },
  { src: "/img/logo-b2sa.svg", alt: "Logo B2SA" },
];

const LogoShowcase = () => {
  return (
    <div>
      <div className="w-full my-24 overflow-x-auto">
        <div className="flex flex-nowrap justify-center gap-12 md:gap-32 px-4 md:px-0">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="relative w-20 sm:w-24 md:w-28 lg:w-32 h-auto aspect-square"
              initial={{ opacity: 0, scale: 0.8}}
              animate={{ opacity: 1, scale: 1}}
              transition={{ duration: 0.5, delay: index * 0.2}}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 120px"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
