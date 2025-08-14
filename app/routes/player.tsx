import type { Route } from "+types/player";
import { format } from "date-fns";
import type { Guild } from "hypixel-api-reborn";
import { Eye, Scroll } from "lucide-react";
import { data } from "react-router";
import { MinecraftText } from "~/components/minecraft-text";
import { SkinViewer } from "~/components/skin-viewer";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { socials } from "~/lib/constants/socials";
import { hypixel } from "~/lib/hypixel-api";
import { getMojangPlayer } from "~/lib/mojang-api";
import { formatRank } from "~/lib/player-rank";
import { cn, formatNumber, hyphenateUuid } from "~/lib/utils";

const InGameCodes = {
	BLACK: "§0",
	DARK_BLUE: "§1",
	DARK_GREEN: "§2",
	DARK_AQUA: "§3",
	DARK_RED: "§4",
	DARK_PURPLE: "§5",
	GOLD: "§6",
	GRAY: "§7",
	DARK_GRAY: "§8",
	BLUE: "§9",
	GREEN: "§a",
	AQUA: "§b",
	RED: "§c",
	LIGHT_PURPLE: "§d",
	YELLOW: "§e",
	WHITE: "§f",
};

export function meta({ data }: Route.MetaArgs) {
	return [
		{ title: `"${data.mojang.username}" | Decent Statistics` },
		{
			property: "og:title",
			content: `"${data.mojang.username}" | Decent Statistics`,
		},
		{
			property: "og:description",
			content: `View statistics for the player "${data.mojang.username}".`,
		},
	];
}

export async function loader({ params }: Route.LoaderArgs) {
	try {
		const player = await hypixel.getPlayer(params.player, { guild: true });
		const mojang = await getMojangPlayer(player.uuid);

		if (!player || !mojang) {
			throw data("player not found", { status: 404 });
		}

		const result = { player, mojang };
		type Result = typeof result;

		return Response.json(result) as unknown as Result;
	} catch (error) {
		console.error(error);
		throw data(error);
	}
}

export default function Player({ loaderData }: Route.ComponentProps) {
	const { player, mojang } = loaderData;

	return (
		<main className="container mt-6 mb-12 space-y-4">
			<Card className="mb-4 flex-row justify-between px-6 py-4 font-minecraft font-normal">
				<CardTitle className="font-normal text-xl leading-5">
					<MinecraftText content={`${formatRank(player)} ${mojang.username}`} />
				</CardTitle>
				{player.guild && (
					<CardTitle className="font-normal text-xl leading-5">
						<MinecraftText
							content={`${InGameCodes[player.guild.tagColor.color]}${player.guild.name}${player.guild.tag ? ` [${player.guild.tag}]` : ""}`}
						/>
					</CardTitle>
				)}
			</Card>
			<section className="grid grid-cols-1 gap-4 lg:grid-cols-[20rem_1fr]">
				<article className="space-y-4">
					<Card
						className="flex min-h-112.5 items-center justify-center bg-blend-overlay "
						style={{
							backgroundImage: "url('/pattern.svg')",
							backgroundRepeat: "repeat",
							backgroundSize: "4rem 4rem",
							backgroundColor:
								"color-mix(in oklab, var(--background) 50%, var(--card))",
						}}
					>
						<SkinViewer
							className="size-full"
							skinUrl={mojang.skin.url ?? ""}
							capeUrl={mojang.cape.url}
							height={320 * 1.25}
							width={320}
							onReady={({ viewer }) => {
								viewer.fov = 35;
								3.25;
								viewer.camera.position.x = 22 * Math.sin(0.01) - 20;
								viewer.camera.position.y = 22 * Math.sin(0.01) + 15;
								viewer.controls.enableZoom = false;
								viewer.controls.enablePan = false;
							}}
						/>
					</Card>
					<Card className="py-4">
						<CardContent>
							<fieldset className="flex items-center justify-between">
								<p className="font-semibold">Status</p>
								{player.isOnline ? (
									<p className="font-minecraft font-normal text-minecraft-green">
										Online
									</p>
								) : (
									<p className="font-minecraft font-normal text-minecraft-red">
										Offline
									</p>
								)}
							</fieldset>
							{player.recentlyPlayedGame?.found && (
								<fieldset className="flex items-center justify-between">
									<p className="font-semibold">Last seen playing</p>
									<p className="font-minecraft font-normal text-minecraft-yellow">
										{player.recentlyPlayedGame.name}
									</p>
								</fieldset>
							)}
							<fieldset className="mt-3 flex items-center justify-between">
								<p className="font-semibold">First Login</p>
								<p className="font-minecraft text-minecraft-dark-aqua">
									{player.firstLogin
										? format(player.firstLogin, "MM/dd/yyyy")
										: "Unknown"}
								</p>
							</fieldset>
							<fieldset
								className={cn("flex items-center justify-between", {
									"mt-2": player.firstLogin === undefined,
								})}
							>
								<p className="font-semibold">Last Login</p>
								<p className="font-minecraft text-minecraft-dark-aqua">
									{player.lastLogin
										? format(player.lastLogin, "MM/dd/yyyy")
										: "Unknown"}
								</p>
							</fieldset>
						</CardContent>
					</Card>
					{player.guild && (
						<Card className="py-4">
							<CardContent>
								<fieldset className="flex items-center justify-between">
									<p className="font-semibold">Guild</p>
									<p>
										<MinecraftText
											content={`${InGameCodes[player.guild.tagColor.color]}${player.guild.name}`}
										/>
									</p>
								</fieldset>
								<fieldset className="flex items-center justify-between">
									<p className="font-semibold">Rank</p>
									<p>
										<MinecraftText
											content={`${InGameCodes[player.guild.tagColor.color]}${player.guild.me?.rank}`}
										/>
									</p>
								</fieldset>
								<p className="mt-2 font-semibold">Guild Experience</p>
								<fieldset className="ml-2 flex flex-row items-center gap-x-2">
									<p className="font-medium">Daily</p>
									<p className="font-minecraft text-minecraft-dark-green">
										{formatNumber(player.guild.me?.expHistory[0].exp ?? 0)}
									</p>
								</fieldset>
								<fieldset className="ml-2">
									<fieldset className="flex flex-row items-center gap-x-2">
										<p className="font-medium">Weekly</p>
										<p className="font-minecraft text-minecraft-dark-green">
											{formatNumber(player.guild.me?.weeklyExperience ?? 0)}
										</p>
									</fieldset>
								</fieldset>
								<fieldset className="mt-3 flex items-center justify-between">
									<p className="font-semibold">Joined</p>
									<p className="font-minecraft text-minecraft-dark-aqua">
										{player.guild.me?.joinedAt
											? format(player.guild.me?.joinedAt, "MM/dd/yyyy")
											: "Unknown"}
									</p>
								</fieldset>
							</CardContent>
						</Card>
					)}
					{player.socialMedia.length > 0 && (
						<Card className="py-3">
							<CardContent className="px-3">
								{player.socialMedia.map((social) => (
									<Button
										key={social.id}
										className="size-10"
										size={"icon"}
										variant={"secondary"}
									>
										{socials[social.id]}
									</Button>
								))}
							</CardContent>
						</Card>
					)}
				</article>
				<article className="space-y-4">
					<Card className="py-4">
						<CardContent>
							<fieldset className="flex items-center justify-between">
								<p className="font-semibold">Username</p>
								<p className="font-mono">{player.nickname}</p>
							</fieldset>
							<fieldset className="flex items-start justify-between">
								<p className="font-semibold">UUID</p>
								<fieldset>
									<p className="text-end font-mono">
										{hyphenateUuid(player.uuid)}
									</p>
									<p className="text-end font-mono">{player.uuid}</p>
								</fieldset>
							</fieldset>
						</CardContent>
					</Card>
					<Card className="py-4">
						<CardContent>
							<fieldset className="flex items-center justify-between">
								<fieldset className="flex items-center gap-x-3">
									<p className="font-semibold">Level</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(Math.floor(player.level))}
									</p>
								</fieldset>
								<fieldset className="flex h-6 items-end font-medium font-minecraft text-minecraft-gray text-sm">
									{player.levelProgress.percent}%
									<span className="mx-2 text-minecraft-dark-gray">|</span>
									<span className="text-minecraft-dark-aqua">
										{formatNumber(player.levelProgress.currentXP)}
										<span className="text-minecraft-dark-gray">/</span>
										{formatNumber(player.levelProgress.xpToNext)}
									</span>
								</fieldset>
							</fieldset>
							<Progress
								className="mt-0.5 mb-2"
								value={player.levelProgress.percent}
							/>
							<fieldset className="flex items-start justify-start gap-x-2">
								<p className="font-semibold">Total Experience</p>
								<p className="font-minecraft text-minecraft-dark-aqua">
									{formatNumber(Math.floor(player.totalExperience))}
								</p>
							</fieldset>
							<fieldset className="flex items-center justify-start gap-x-2">
								<p className="font-semibold">Karma</p>
								<p className="font-minecraft text-minecraft-light-purple">
									{formatNumber(player.karma)}
								</p>
							</fieldset>
							<fieldset className="flex items-center justify-start gap-x-2">
								<p className="font-semibold">Achievement Points</p>
								<p className="font-minecraft text-minecraft-yellow">
									{formatNumber(player.achievementPoints)}
								</p>
							</fieldset>
						</CardContent>
					</Card>
					{player.stats && (
						<Card className="py-4">
							<CardContent>
								<Accordion type="single" collapsible>
									{Object.keys(player.stats).map((stat) => (
										<AccordionItem key={stat} value={stat}>
											<AccordionTrigger className="font-semibold text-base">
												{stat}
											</AccordionTrigger>
											<AccordionContent>content</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</CardContent>
						</Card>
					)}
				</article>
			</section>
			{player.guild && (
				<section>
					<Card className="py-4">
						<CardHeader className="gap-y-0 px-6">
							<CardTitle className="font-normal text-xl">
								<MinecraftText
									content={`${InGameCodes[player.guild.tagColor.color]}${player.guild.name}${player.guild.tag ? ` [${player.guild.tag}]` : ""}`}
								/>
							</CardTitle>
							<CardDescription className="flex items-center gap-x-2">
								<Scroll className="size-4" />
								{player.guild.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-y-2 px-6 md:grid-cols-2 md:gap-x-4">
							<article>
								<fieldset>
									<p className="font-semibold">Guild Master</p>
									{/* <p>
										<MinecraftText
											content={`${formatRank(player.guild.guildMaster)} ${mojang.username}`}
										/>
									</p> */}
								</fieldset>
								<fieldset className="mt-2 flex items-center gap-x-2">
									<p className="font-semibold">Level</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(Math.floor(player.guild.level))}
									</p>
								</fieldset>
								<fieldset className="flex items-center gap-x-2">
									<p className="font-semibold">Experience</p>
									<p className="font-minecraft text-minecraft-dark-aqua">
										{formatNumber(Math.floor(player.guild.experience))}
									</p>
								</fieldset>
								<fieldset className="flex items-center gap-x-2">
									<p className="font-semibold">Members</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(Math.floor(player.guild.members.length))}
									</p>
								</fieldset>
								<p className="mt-2 font-semibold">Guild Experience</p>
								<fieldset className="ml-2 flex flex-row items-center gap-x-2">
									<p className="font-medium">Daily</p>
									<p className="font-minecraft text-minecraft-dark-green">
										{formatNumber(player.guild.expHistory[0].exp ?? 0)}
									</p>
								</fieldset>
								<fieldset className="ml-2">
									<fieldset className="flex flex-row items-center gap-x-2">
										<p className="font-medium">Weekly</p>
										<p className="font-minecraft text-minecraft-dark-green">
											{formatNumber(player.guild.totalWeeklyGexp ?? 0)}
										</p>
									</fieldset>
								</fieldset>
								<fieldset className="mt-2 flex items-center gap-x-2">
									<p className="font-semibold">Created</p>
									<p className="font-minecraft text-minecraft-dark-aqua">
										{player.guild.createdAt
											? format(player.guild.createdAt, "MM/dd/yyyy")
											: "Unknown"}
									</p>
								</fieldset>
								<fieldset className="flex items-center gap-x-2">
									<p className="font-semibold">Public?</p>
									{player.guild.publiclyListed ? (
										<p className="font-minecraft text-minecraft-green">Yes</p>
									) : (
										<p className="font-minecraft text-minecraft-red">No</p>
									)}
								</fieldset>
								<fieldset className="flex flex-col">
									<p className="font-semibold">Preffered Games</p>
									<p className="ml-2 leading-5">
										{player.guild.preferredGames
											.map((game) => game.name)
											.join(", ")
											.replace(/, ([^,]*)$/, " and $1")}
									</p>
								</fieldset>
								<fieldset className="mt-2 flex items-center gap-x-2">
									<p className="font-semibold">Experience Kings</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(
											Math.floor(player.guild.achievements.experienceKings),
										)}
									</p>
								</fieldset>
								<fieldset className="flex items-center gap-x-2">
									<p className="font-semibold">Online Players</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(
											Math.floor(player.guild.achievements.onlinePlayers),
										)}
									</p>
								</fieldset>
								<fieldset className="flex items-center gap-x-2">
									<p className="font-semibold">Winners</p>
									<p className="font-minecraft text-minecraft-yellow">
										{formatNumber(
											Math.floor(player.guild.achievements.winners),
										)}
									</p>
								</fieldset>
							</article>
							<article>
								<h1 className="font-bold text-lg">Guild Experience History</h1>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Date</TableHead>
											<TableHead className="text-right">Experience</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{player.guild.expHistory.map((history) => (
											<TableRow key={history.day}>
												<TableCell className="py-1.5 font-medium">
													{format(history.date, "MM/dd/yyyy")}
												</TableCell>
												<TableCell className="py-1.5 text-right font-minecraft text-minecraft-dark-green">
													{formatNumber(Math.floor(history.exp))}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell>Total</TableCell>
											<TableCell className="text-right font-minecraft text-minecraft-dark-green">
												{formatNumber(Math.floor(player.guild.totalWeeklyGexp))}
											</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
							</article>
						</CardContent>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-40">Player</TableHead>
										<TableHead className="w-40">Rank</TableHead>
										<TableHead className="w-40">Quests</TableHead>
										<TableHead className="w-40">Muted?</TableHead>
										<TableHead className="text-right">Joined</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<MinecraftText
												content={`${formatRank(player)} ${player.nickname}`}
											/>
										</TableCell>
										<TableCell>
											<MinecraftText
												content={`${InGameCodes[player.guild.tagColor.color]}${player.guild.me?.rank}`}
											/>
										</TableCell>
										<TableCell className="font-minecraft text-minecraft-yellow">
											{player.guild.me?.questParticipation}
										</TableCell>
										{player.guild.me?.mutedUntilTimestamp ? (
											<TableCell className="font-minecraft text-minecraft-green">
												Yes
											</TableCell>
										) : (
											<TableCell className="font-minecraft text-minecraft-red">
												No
											</TableCell>
										)}
										<TableCell className="text-right font-minecraft text-minecraft-dark-aqua">
											{" "}
											{player.guild.me?.joinedAt
												? format(player.guild.me?.joinedAt, "MM/dd/yyyy")
												: "Unknown"}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</section>
			)}
		</main>
	);
}
