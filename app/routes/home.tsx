import BlurText from "~/components/text-blur";

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
	return (
		<main className="container mt-12 h-[200vh]">
			<section className="mx-6 mt-24 grid lg:grid-cols-2">
				<article>
					<fieldset className="relative">
						<p className=" font-black text-5xl md:text-6xl">
							Stalk like never before. Wherever, whenever.
						</p>
						{/* <p className="-rotate-10 -top-16 relative left-16 font-beauty text-8xl">
							Decen<span className="font-beauty-extra">t</span>
							<span className="relative top-4">
								Statistic
								<span className="font-beauty-extra">s</span>
							</span>
						</p> */}
					</fieldset>
				</article>
				<article></article>
			</section>
		</main>
	);
}
