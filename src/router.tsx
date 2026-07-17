import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppShell } from "./components/templates/appShell";
import { DashboardPage } from "./components/pages/dashboardPage";
import { PlayDateEditorPage } from "./components/pages/playDateEditorPage";
import { SettingsPage } from "./components/pages/settingsPage";
import { FamiliesPage } from "./components/pages/familiesPage";
import { CalendarPage } from "./components/pages/calendarPage";

// Jede Route verbindet eine URL mit genau einer Page-Komponente.
// Wenn später eine neue Seite dazukommt, wird sie hier eingetragen.
const rootRoute = createRootRoute({ component: AppShell });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});
const datesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/playdates",
  component: () => <DashboardPage showAll />,
});
const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CalendarPage,
});
const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new",
  component: PlayDateEditorPage,
});
const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit/$playDateId",
  component: () => (
    <PlayDateEditorPage editId={Number(location.pathname.split("/").pop())} />
  ),
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});
const familiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/families",
  component: FamiliesPage,
});
// Der Route-Tree fasst alle Seiten zusammen, die innerhalb unseres AppShell laufen.
const routeTree = rootRoute.addChildren([
  indexRoute,
  datesRoute,
  calendarRoute,
  newRoute,
  editRoute,
  settingsRoute,
  familiesRoute,
]);
export const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
