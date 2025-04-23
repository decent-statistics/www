import { SearchIcon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export function SearchBar({
	input,
	className,
}: { input: React.ReactNode; className?: string }) {
	return (
		<Card
			className={cn(
				"flex h-7 flex-row items-center gap-x-1.5 rounded-full bg-card bg-rounded-lg p-0 pl-2",
				className,
			)}
		>
			<SearchIcon className="size-4 shrink-0 stroke-muted-foreground" />
			{input}
		</Card>
	);
}
