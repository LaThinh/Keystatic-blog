// "use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function Banner({ props }: { props: any }) {
	//Config Setting in link https://react-slick.neostack.com/docs/api
	const settings = {
		dots: true,
		arrows: false,
		autoplay: false,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className="slider-container w-full max-w-[1920px] m-auto relative">
			<Slider {...settings} className="flex flex-col">
				{props.map((item: any, index: number) => (
					<div className="banner-item flex flex-col relative" key={index}>
						<div className="banner-image  overflow-hidden">
							<Image
								src={item?.image || "/"}
								alt={item?.title || "title"}
								width={1920}
								height={800}
								className="w-full aspect-[16/9] object-cover"
							/>
						</div>
						<div
							className="banner-info flex flex-col gap-5 p-5 items-start w-full 
                                md:absolute md:left-[4%] md:top-[50%] md:translate-y-[-50%] md:z-10 md:w-[92%] md:max-w-[800px] 
                                md:rounded-xl text-white bg-slate-600/70"
						>
							<h2 className="banner-title font-bold text-3xl lg:text-5xl lg:leading-normal">{item?.title}</h2>
							<p className="banner-desc leading-relaxed">{item?.description}</p>
							{item?.link && (
								<Link className="px-10 py-2 rounded-md bg-sky-500 hover:bg-sky-600 !text-white" href={item.link}>
									{"View more"}
								</Link>
							)}
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
}
