"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
      <div
        className={cn(
        "transition-bg relative flex min-h-[90vh] flex-col items-center justify-center bg-background text-foreground",
          className,
        )}
        {...props}
      >
      {/* Dotted glow overlay (brillant + moderne). Kept subtle + masked to preserve readability */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-80 dark:opacity-60",
          "[background-image:radial-gradient(circle,rgba(16,185,129,0.35)_1px,transparent_1px)]",
          "[background-size:22px_22px]",
          "animate-dots-drift",
          // mask so dots fade out towards edges -> more premium + less noisy
          showRadialGradient
            ? "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
            : "",
        )}
      />

      {/* Soft highlight bloom */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15" />

        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
              "repeating-linear-gradient(100deg,#10b981_15%,#34d399_20%,#6ee7b7_25%,#a7f3d0_30%,#059669_35%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

            "--green-300": "#6ee7b7",
            "--green-400": "#34d399",
            "--green-500": "#10b981",
            "--green-600": "#059669",
            "--green-200": "#a7f3d0",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-80 blur-[8px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--green-500)_10%,var(--green-400)_15%,var(--green-300)_20%,var(--green-200)_25%,var(--green-600)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
  );
};
