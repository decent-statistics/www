import { Menu } from "lucide-react";
import {
	type Variants,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { useMediaQuery } from "~/hooks/media-query";

type HeaderState = "initial" | "desktop" | "mobile";

const variants: Variants = {
	initial: {
		top: "0rem",
		backgroundColor: "color-mix(in oklab, var(--accent) 0%, transparent)",
		borderColor: "color-mix(in oklab, var(--border) 0%, transparent)",
	},
	desktop: {
		top: "0.5rem",
		backgroundColor: "color-mix(in oklab, var(--accent) 25%, transparent)",
		borderColor: "color-mix(in oklab, var(--border) 100%, transparent)",
		transition: {
			borderColor: {
				delay: 0.1,
			},
		},
	},
	mobile: {
		top: "0.5rem",
		backgroundColor: "color-mix(in oklab, var(--accent) 25%, transparent)",
		borderColor: "color-mix(in oklab, var(--border) 100%, transparent)",
		transition: {
			borderColor: {
				delay: 0.1,
			},
		},
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
			className="sticky z-100 mx-auto flex h-14 w-full max-w-5xl items-center justify-between rounded-full border p-2 backdrop-blur-xs"
			variants={variants}
			animate={variant}
		>
			<div className="flex-1" />
			<Button
				className="rounded-full px-5 font-bold text-shadow text-xl"
				variant={"ghost"}
				size={"lg"}
				asChild
			>
				<Link to={"/"}>Decent Statistics</Link>
			</Button>
			<div className="flex-1" />
			{/* <div className="flex flex-1 justify-end">
				<NavigationMenu className="hidden items-end md:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="h-10 rounded-full">
								Leaderboards
							</NavigationMenuTrigger>
							<NavigationMenuContent className="rounded-xl">
								<NavigationMenuLink>Link</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Button
					className="size-10 rounded-full md:hidden"
					variant={"ghost"}
					size={"icon"}
				>
					<Menu className="size-5" />
				</Button>
			</div> */}
		</motion.header>
	);
}
