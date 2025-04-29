import type { Player } from "hypixel-api-reborn";

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

export function formatRank(player: Player) {
  let rank = "§7";

  switch (player.rank) {
    case "VIP":
      rank = "§a[VIP]";
      break;
    case "VIP+":
      rank = "§a[VIP§6+§a]";
      break;
    case "MVP":
      rank = "§b[MVP]";
      break;
    case "MVP+":
      rank = `§b[MVP${InGameCodes[player.plusColor.color ?? "RED"]}+§b]`;
      break;
    case "MVP++":
      rank = `${InGameCodes[player.prefixColor.color ?? "GOLD"]}[MVP${
        InGameCodes[player.plusColor.color ?? "RED"]
      }+${InGameCodes[player.prefixColor.color ?? "GOLD"]}]`;
      break;
    case "Admin":
      rank = "§c[ADMIN]";
      break;
    case "Game Master":
      rank = "§2[GM]";
      break;
    case "INNIT":
      rank = "§d[INNIT]";
      break;
    case "PIG+++":
      rank = "§d[PIG§c+++§d]";
      break;
    case "YouTube":
      rank = "§c[YOUTUBE]";
      break;
    default:
      break;
  }

  return rank;
}
