import { Slot } from "@radix-ui/react-slot";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

type ColorType =
	| "black"
	| "dark_blue"
	| "dark_green"
	| "dark_aqua"
	| "dark_red"
	| "dark_purple"
	| "gold"
	| "gray"
	| "dark_gray"
	| "blue"
	| "green"
	| "aqua"
	| "red"
	| "light_purple"
	| "yellow"
	| "white";

export type ColorMap = { [key in ColorType]: string };

const colors: ColorMap = {
	black: "text-minecraft-black",
	dark_blue: "text-minecraft-dark-blue",
	dark_green: "text-minecraft-dark-green",
	dark_aqua: "text-minecraft-dark-aqua",
	dark_red: "text-minecraft-dark-red",
	dark_purple: "text-minecraft-dark-purple",
	gold: "text-minecraft-gold",
	gray: "text-minecraft-gray",
	dark_gray: "text-minecraft-dark-gray",
	blue: "text-minecraft-blue",
	green: "text-minecraft-green",
	aqua: "text-minecraft-aqua",
	red: "text-minecraft-red",
	light_purple: "text-minecraft-light-purple",
	yellow: "text-minecraft-yellow",
	white: "text-minecraft-white",
};

type ColorLetter =
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 0;

const letterMap: { [key in ColorLetter]: keyof ColorMap } = {
	0: "black",
	1: "dark_blue",
	2: "dark_green",
	3: "dark_aqua",
	4: "dark_red",
	5: "dark_purple",
	6: "gold",
	7: "gray",
	8: "dark_gray",
	9: "blue",
	a: "green",
	b: "aqua",
	c: "red",
	d: "light_purple",
	e: "yellow",
	f: "white",
};

export function MinecraftText({
	prefix = "§",
	content,
}: { prefix?: string; content: string }) {
	const props = { prefix, content };

	const segments = (`${prefix}r${content}` || `${prefix}r`).split(
		new RegExp(`(?=${prefix}r)`, "g"),
	);

	return (
		<span className="font-minecraft">
			{segments.map((segment, index) => (
				<MinecraftInnerText key={segment} {...props} />
			))}
		</span>
	);
}

function MinecraftInnerText({
	prefix = "§",
	content,
}: { prefix?: string; content: string }) {
	const props = { prefix, content };

	const segments = content.split(new RegExp(`(?=${prefix})`, "g"));

	const color = new RegExp(`^${prefix}[0-9a-f].*`);
	const obfustcated = new RegExp(`^${prefix}[k].*`);
	const bold = new RegExp(`^${prefix}[l].*`);
	const italic = new RegExp(`^${prefix}[o].*`);
	const underline = new RegExp(`^${prefix}[n].*`);
	const strikethrough = new RegExp(`^${prefix}[m].*`);
	const reset = new RegExp(`^${prefix}[r].*`);

	const segment = segments[0];

	if (color.test(segment)) {
		return (
			<>
				<span className={cn(colors[letterMap[segment[1] as ColorLetter]])}>
					{segment.substring(2)}
				</span>
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</>
		); // biome-ignore lint/style/noUselessElse: <explanation>
	} else if (obfustcated.test(segment)) {
		return (
			<span>
				<ObfuscatedText text={segment.substring(2)} />
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		); // biome-ignore lint/style/noUselessElse: <explanation>
	} else if (bold.test(segment)) {
		return (
			<span
				style={{
					fontWeight: "bold",
				}}
			>
				{segment.substring(2)}
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		); // biome-ignore lint/style/noUselessElse: <explanation>
	} else if (italic.test(segment)) {
		return (
			<span
				style={{
					fontStyle: "italic",
				}}
			>
				{segment.substring(2)}
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		); // biome-ignore lint/style/noUselessElse: <explanation>
	} else if (underline.test(segment)) {
		return (
			<span
				style={{
					textDecoration: "underline",
				}}
			>
				{segment.substring(2)}
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		); // biome-ignore lint/style/noUselessElse: <explanation>
	} else if (strikethrough.test(segment)) {
		return (
			<span
				style={{
					textDecoration: "line-through",
				}}
			>
				{segment.substring(2)}
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (reset.test(segment)) {
		return (
			<span
				style={{
					fontStyle: "initial",
					textDecoration: "none",
					color: "white",
					fontWeight: "initial",
				}}
			>
				{segment.substring(2)}
				<MinecraftInnerText {...props} content={segments.slice(1).join("")} />
			</span>
		);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return <span>{segment}</span>;
	}
}

function ObfuscatedText(props: { text: string }) {
	const [time, setTime] = useState(-1);
	const ref = useRef<HTMLElement>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const newChars = () => {
			const chars =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!§$%&?#";
			const newText = props.text
				.split("")
				.map(() => chars[Math.floor(Math.random() * chars.length)])
				.join("");
			if (ref.current) {
				ref.current.innerHTML = newText;
			}
		};

		const step = (t: number) => {
			if (time === -1) {
				setTime(t);
			}
			newChars();

			requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}, [props.text]);

	return <span ref={ref} />;
}
