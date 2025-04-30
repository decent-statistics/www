import { Slot } from "@radix-ui/react-slot";
import { type Variants, motion } from "motion/react";

type Direction = "up" | "down" | "left" | "right";

const blur = "4px";
const variants: Variants = {
	up: {
		y: 64,
		opacity: 0,
		filter: `blur(${blur})`,
	},
	down: {
		y: -64,
		opacity: 0,
		filter: `blur(${blur})`,
	},
	left: {
		x: 64,
		opacity: 0,
		filter: `blur(${blur})`,
	},
	right: {
		x: -64,
		opacity: 0,
		filter: `blur(${blur})`,
	},
	done: {
		x: 0,
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
	},
};

const MotionSlot = motion.create(Slot);

export function EnterAnimation({
	children,
	direction = "up",
	duration = 200,
	delay = 150,
	...rest
}: {
	children: React.ReactNode;
	direction?: Direction;
	duration?: number;
	delay?: number;
}) {
	return (
		<MotionSlot
			initial={direction}
			animate="done"
			variants={variants}
			transition={{
				type: "spring",
				damping: 15,
				duration: duration / 1000,
				delay: delay / 1000,
				filter: { type: "tween", damping: 15, duration: 0.2 },
			}}
			{...rest}
		>
			{children}
		</MotionSlot>
	);
}
