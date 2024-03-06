"use client";
import React from "react";

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			// entry.target.classList.toggle("show", entry.isIntersecting);
			entry.target.classList.toggle("out-of-screen", !entry.isIntersecting);
			//if (entry.isIntersecting) observer.unobserve(entry.target);
		});
	},
	{
		//threshold: 0.5,
		rootMargin: "200px 0px -100px 0px",
	}
);

export default function ScriptClient() {
	if (typeof window !== "undefined") {
		setTimeout(() => {
			const cards = document.querySelectorAll(".post-card");
			cards.forEach((card) => {
				observer.observe(card);
			});
		}, 1000);
	}
	return <></>;
}
