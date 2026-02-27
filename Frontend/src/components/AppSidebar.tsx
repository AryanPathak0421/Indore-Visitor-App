import { Home, Compass, UtensilsCrossed, Hotel, Car, Calendar, Map, Settings, User, Menu, LogIn } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import logo from "@/assets/Logo.png";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  {
  title: "Trip Planner",
  url: "/planner",
  icon: Calendar,
},

  { title: "Discover", url: "/discover", icon: Compass },
  { title: "Food", url: "/food", icon: UtensilsCrossed },
  {
  title: "Hotels",
  url: "/hotels",
  icon: Hotel,
},
{
  title: "Transport",
  url: "/transport",
  icon: Car,
},
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Maps", url: "/maps", icon: Map },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out sticky top-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm">IMC</h1>
              <p className="text-xs text-muted-foreground">Visitors</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-muted-foreground text-center">
              Explore the heart of Madhya Pradesh
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
