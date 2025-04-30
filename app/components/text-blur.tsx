import { animated, useSprings } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

export function BlurText({
	text,
	delay = 200,
	className,
	animateBy = "words", // 'words' or 'letters'
	direction = "top", // 'top' or 'bottom'
	threshold = 0.1,
	rootMargin = "0px",
	animationFrom,
	animationTo,
	easing = "easeOutCubic",
	onAnimationComplete,
}: {
	text: string;
	delay?: number;
	className?: string;
	animateBy?: "words" | "letters";
	direction?: "top" | "bottom";
	threshold?: number;
	rootMargin?: string;
	animationFrom?: unknown;
	animationTo?: unknown;
	easing?: string;
	onAnimationComplete?: () => unknown;
}) {
	const elements = animateBy === "words" ? text.split(" ") : text.split("");
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLParagraphElement>(null);
	const animatedCount = useRef(0);

	// Default animations based on direction
	const defaultFrom =
		direction === "top"
			? {
					filter: "blur(10px)",
					opacity: 0,
					transform: "translate3d(0,-50px,0)",
				}
			: {
					filter: "blur(10px)",
					opacity: 0,
					transform: "translate3d(0,50px,0)",
				};

	const defaultTo = [
		{
			filter: "blur(5px)",
			opacity: 0.5,
			transform:
				direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
		},
		{ filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					if (ref.current) {
						observer.unobserve(ref.current);
					}
				}
			},
			{ threshold, rootMargin },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	const springs = useSprings(
		elements.length,
		elements.map((_, i) => ({
			from: animationFrom || defaultFrom,
			to: inView
				? async (next) => {
						for (const step of animationTo || defaultTo) {
							await next(step);
						}
						animatedCount.current += 1;
						if (
							animatedCount.current === elements.length &&
							onAnimationComplete
						) {
							onAnimationComplete();
						}
					}
				: animationFrom || defaultFrom,
			delay: i * delay,
			config: { easing },
		})),
	);

	return (
		<p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
			{springs.map((props, index) => (
				<animated.span
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					style={props}
					className="inline-block will-change-[transform,filter,opacity]"
				>
					{elements[index] === " " ? "\u00A0" : elements[index]}
					{animateBy === "words" && index < elements.length - 1 && "\u00A0"}
				</animated.span>
			))}
		</p>
	);
}
