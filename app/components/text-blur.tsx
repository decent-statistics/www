import { type TargetAndTransition, motion, useInView } from "motion/react";
import { useRef } from "react";

interface BlurTextProps {
	text: string;
	delay?: number;
	initialDelay?: number;
	className?: string;
	animateBy?: "words" | "letters";
	direction?: "top" | "bottom";
	threshold?: number;
	rootMargin?: string;
	animationFrom?: TargetAndTransition;
	animationTo?: TargetAndTransition[];
	easing?: string;
	onAnimationComplete?: () => void;
}

const defaultFrom: TargetAndTransition = {
	filter: "blur(10px)",
	opacity: 0,
	y: -50,
};

const defaultTo: TargetAndTransition[] = [
	{
		filter: "blur(5px)",
		opacity: 0.5,
		y: 5,
	},
	{
		filter: "blur(0px)",
		opacity: 1,
		y: 0,
	},
];

export function BlurText({
	text,
	delay = 0.2,
	initialDelay = 0,
	className = "",
	animateBy = "words",
	direction = "top",
	threshold = 0.1,
	rootMargin = "0px",
	animationFrom,
	animationTo,
	easing = "easeOut",
	onAnimationComplete,
}: BlurTextProps) {
	const ref = useRef<HTMLParagraphElement>(null);
	const isInView = useInView(ref, {
		amount: threshold,
		margin: rootMargin as `${number}px`,
		once: true,
	});

	const elements = animateBy === "words" ? text.split(" ") : text.split("");
	const from = animationFrom || defaultFrom;
	const to = animationTo || defaultTo;

	// Adjust y values based on direction
	const adjustedFrom: TargetAndTransition = {
		...from,
		y: direction === "top" ? from.y : -(from.y as number),
	};

	const adjustedTo: TargetAndTransition[] = to.map((step) => ({
		...step,
		y: direction === "top" ? step.y : -(step.y as number),
	}));

	return (
		<p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
			{elements.map((element, index) => (
				<motion.span
					key={`${element}-${index}-${text.length}`}
					initial={adjustedFrom}
					animate={isInView ? adjustedTo[1] : adjustedFrom}
					transition={{
						duration: 0.5,
						delay: initialDelay + index * delay,
						ease: easing,
					}}
					onAnimationComplete={() => {
						if (index === elements.length - 1 && onAnimationComplete) {
							onAnimationComplete();
						}
					}}
					className="inline-block will-change-[transform,filter,opacity]"
				>
					{element === " " ? "\u00A0" : element}
					{animateBy === "words" && index < elements.length - 1 && "\u00A0"}
				</motion.span>
			))}
		</p>
	);
}
