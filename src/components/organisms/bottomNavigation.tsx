import { CalendarDays, Home, Images, Plus, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
// Auf kleinen Displays ersetzt diese Leiste die große Navigation aus dem Header.
export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <Link to="/" activeProps={{ className: "active" }}>
        <Home />
        <span>Start</span>
      </Link>
      <Link to="/calendar" activeProps={{ className: "active" }}>
        <CalendarDays />
        <span>Kalender</span>
      </Link>
      <Link to="/new" className="new-mobile" aria-label="Neues PlayDate">
        <Plus />
      </Link>
      <Link to="/families" activeProps={{ className: "active" }}>
        <Users />
        <span>Familien</span>
      </Link>
      <Link to="/photos" activeProps={{ className: "active" }}>
        <Images />
        <span>Fotos</span>
      </Link>
    </nav>
  );
}
