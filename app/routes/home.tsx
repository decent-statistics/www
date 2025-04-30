import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { EnterAnimation } from "~/components/enter-animation";
import { BlurText } from "~/components/text-blur";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function meta() {
	return [
		{ title: "Decent Statistics" },
		{
			name: "description",
			content: "Statistics Tracker for the Minecraft server, Hypixel.",
		},
		{
			property: "og:title",
			content: "Decent Statistics",
		},
	];
}

export default function Home() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/player/${searchQuery.trim()}`);
		}
	};

	return (
		<main className="container h-[200vh]">
			<section className="mx-6 mt-24 grid gap-x-0 lg:grid-cols-2">
				<article className="mt-12 hidden sm:block">
					<fieldset className="relative">
						<BlurText
							className="font-black text-5xl md:text-6xl"
							text="Stalk like never before. Wherever, whenever."
						/>
						<EnterAnimation delay={1900} direction="right">
							<p className="-rotate-10 -top-16 relative left-18 font-beauty text-8xl text-blue-400 text-shadow-blue-600/65 text-shadow-lg">
								Decen<span className="font-beauty-extra">t</span>
								<span className="relative top-4">
									Statistic
									<span className="font-beauty-extra">s</span>
								</span>
							</p>
						</EnterAnimation>
					</fieldset>
				</article>
				<article className="row-span-2 flex justify-center sm:hidden">
					<EnterAnimation>
						<p className="-rotate-10 relative font-beauty text-6xl text-blue-400 text-shadow-blue-600/65 text-shadow-lg">
							Decen<span className="font-beauty-extra">t</span>
							<span className="relative top-4">
								Statistic
								<span className="font-beauty-extra">s</span>
							</span>
						</p>
					</EnterAnimation>
				</article>
			</section>
			<section className="mt-24">
				<form onSubmit={handleSearch}>
					<fieldset className="mx-auto flex max-w-148 gap-x-2">
						<Input
							className="w-full"
							placeholder="Search for a player, guild or ..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Button type="submit">
							<Search />
							Search
						</Button>
					</fieldset>
				</form>
			</section>
		</main>
	);
}
