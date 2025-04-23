import { LogIn, Menu } from "lucide-react";
import {
	type Variants,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { SearchBar } from "~/components/search-bar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useMediaQuery } from "~/hooks/media-query";

type HeaderState = "initial" | "desktop" | "mobile";

const variants: Variants = {
	initial: {
		top: 0,
		backgroundColor: "color-mix(in oklab, var(--accent) 0%, transparent)",
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
		borderColor: "color-mix(in oklab, var(--border) 0%, transparent)",
	},
	desktop: {
		top: "1rem",
		backgroundColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
		paddingLeft: "2rem",
		paddingRight: "2rem",
		borderColor: "color-mix(in oklab, var(--border) 100%, transparent)",
		transition: {
			borderColor: {
				delay: 0.2,
			},
		},
	},
	mobile: {
		top: 0,
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
		backgroundColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
		borderColor: "color-mix(in oklab, var(--border) 0%, transparent)",
	},
};

export function Header() {
	const [variant, setVariant] = useState<HeaderState>("initial");
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setVariant(latest >= 24 ? (isDesktop ? "desktop" : "mobile") : "initial");
	});

	return (
		<motion.header
			className="sticky mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-none border py-2 backdrop-blur-xs md:rounded-full"
			variants={variants}
			animate={variant}
		>
			<Link to={"/"}>
				<h1 className="font-bold text-xl">Decent Statistics</h1>
			</Link>
			<nav className=" hidden items-center gap-x-4 md:flex">
				<Button size={"sm"} variant={"link"} asChild>
					<Link to={"/"}>leaderboards</Link>
				</Button>
				{true ? (
					<Link to={"/player/liqw"} className="ml-2 flex items-center gap-x-2">
						<fieldset className="flex flex-col">
							<p className="text-end text-foreground/75 text-xs leading-3">
								logged in as
							</p>
							<h2 className="text-end font-bold text-sm leading-4">liqw</h2>
						</fieldset>
						<img
							src="images/fallback/head.png"
							className="size-8 rounded-sm"
							alt="player head"
						/>
					</Link>
				) : (
					<Button size={"sm"} variant={"secondary"} asChild>
						<Link to={"/login"}>
							link account
							<LogIn />
						</Link>
					</Button>
				)}
			</nav>
			<Button
				className="size-12 rounded-full md:hidden"
				variant={"ghost"}
				size={"icon"}
			>
				<Menu className="size-6" />
			</Button>
		</motion.header>
	);
}
