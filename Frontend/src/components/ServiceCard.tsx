import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function ServiceCard({ title, description, icon: Icon, onClick }: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl p-4 border border-border shadow-soft
                 hover:shadow-card transition-all duration-300 cursor-pointer
                 hover:-translate-y-0.5 flex items-center gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
    </div>
  );
}
