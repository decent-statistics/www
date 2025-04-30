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
		<main className="container">
			<section className="mx-6 grid h-[calc(100vh-3.5rem)] content-center">
				<article className="mb-32 h-fit">
					<article className="flex justify-center">
						<EnterAnimation direction="down">
							<p className="-rotate-8 relative font-beauty text-6xl text-blue-400 text-shadow-blue-600/65 text-shadow-lg sm:text-8xl md:text-9xl">
								Decen<span className="font-beauty-extra">t</span>
								<span className="relative top-4">
									Statistic
									<span className="font-beauty-extra">s</span>
								</span>
							</p>
						</EnterAnimation>
					</article>
					<form onSubmit={handleSearch}>
						<fieldset className="mx-auto mt-18 flex max-w-148 gap-x-2">
							<Input
								className="w-full"
								placeholder="Search for a player..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Button type="submit">
								<Search />
								Search
							</Button>
						</fieldset>
					</form>
				</article>
			</section>
		</main>
	);
}
