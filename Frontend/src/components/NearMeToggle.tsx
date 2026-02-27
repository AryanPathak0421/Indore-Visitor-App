import { MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface NearMeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function NearMeToggle({ enabled, onToggle }: NearMeToggleProps) {
  return (
    <div className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border shadow-soft">
      <MapPin className={`w-5 h-5 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
      <span className="text-sm font-medium text-foreground">Near Me</span>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}
