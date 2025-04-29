import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/header.tsx", [
    index("routes/home.tsx"),
    route("player/:player", "routes/player.tsx"),
  ]),
] satisfies RouteConfig;
