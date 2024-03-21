"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

export default function Discovery() {
	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
	};

	let ref = useRef(null);

	let { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start center", "end start"],
	});

	let y = useTransform(scrollYProgress, [0, 1], ["-40px", "-300px"]);

	return (
		<section className="relative min-h-[600px] 2xl:min-h-[700px] overflow-hidden" ref={ref}>
			<motion.div
				className="min-h-[900px] 2xl:min-h-[1000px] w-full absolute z-10 top-0 left-0"
				style={{ y }}
				// transition={{ type: "linear" }}
			>
				<Image
					src="/images/pexels-thinh-la-city.jpg"
					fill
					alt="City"
					sizes="(max-width: 768px) 1200px, 1920px"
					className="disco-image w-full object-cover"
				/>
			</motion.div>
			<div className="image-shadow absolute z-20 top-0 left-0 right-0 bottom-0 bg-black/30">
				<span className="absolute top-5 border-t-2 border-gray-400 left-0 right-0"></span>
				<span className="absolute bottom-5 border-b-2 border-gray-400 left-0 right-0"></span>
			</div>
			<div
				className="container text-center w-[80%] !max-w-4xl p-5 text-white 
                absolute z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
                flex flex-col gap-8 justify-center items-center"
			>
				<h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">Discovery</h2>
				<p className="text-lg lg:text-2xl">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos fugiat ullam nostrum tempore ab vero magni amet
					doloremque quae, modi deleniti. Minima aspernatur quos, autem recusandae explicabo dolore perferendis
					necessitatibus?
				</p>
				<a
					href="/about"
					className="button border-2 border-white rounded-full px-10 py-3 
                text-xl uppercase text-white hover:bg-white text-sky-500 font-semibold"
				>
					View more
				</a>
			</div>
		</section>
	);
}
