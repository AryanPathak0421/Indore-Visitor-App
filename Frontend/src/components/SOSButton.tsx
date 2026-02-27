import { Phone } from "lucide-react";
import { useState } from "react";

export function SOSButton() {
  const [isPressed, setIsPressed] = useState(false);

  const handleSOS = () => {
    setIsPressed(true);
    // In a real app, this would trigger emergency services
    alert("Emergency SOS activated! Contacting local emergency services...");
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <button
      onClick={handleSOS}
      className={`
        fixed bottom-6 right-6 z-50
        w-16 h-16 rounded-full
        bg-destructive text-destructive-foreground
        flex items-center justify-center
        shadow-sos hover:shadow-lg
        transition-all duration-200
        hover:scale-110 active:scale-95
        ${isPressed ? "animate-pulse-soft" : ""}
      `}
      aria-label="Emergency SOS"
    >
      <div className="flex flex-col items-center">
        <Phone className="w-6 h-6" />
        <span className="text-[10px] font-bold mt-0.5">SOS</span>
      </div>
    </button>
  );
}
