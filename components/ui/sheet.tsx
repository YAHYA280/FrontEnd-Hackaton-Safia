'use client';

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined)

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet = ({ open = false, onOpenChange, children }: SheetProps) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    if (!context) {
      throw new Error("SheetContent must be used within a Sheet")
    }

    const [isOpen, setIsOpen] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      if (context.open) {
        setIsMounted(true);
        // Delay to trigger animation after mount
        const timer = setTimeout(() => setIsOpen(true), 10);
        return () => clearTimeout(timer);
      } else {
        setIsOpen(false);
        // Unmount after animation completes
        const timer = setTimeout(() => setIsMounted(false), 300);
        return () => clearTimeout(timer);
      }
    }, [context.open]);

    if (!isMounted) {
      return null;
    }

    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            context.open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => context.onOpenChange(false)}
        />

        {/* Sheet Panel */}
        <div
          ref={ref}
          className={cn(
            "fixed right-0 top-0 z-50 h-full w-full shadow-lg transition-transform duration-300 ease-out sm:max-w-xl",
            "bg-white",
            context.open && isOpen ? "translate-x-0" : "translate-x-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
SheetContent.displayName = "SheetContent"

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SheetHeader = ({ children, className, ...props }: SheetHeaderProps) => {
  return (
    <div
      className={cn("flex flex-col space-y-2 px-6 py-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SheetTitle = ({ children, className, ...props }: SheetTitleProps) => {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export { Sheet, SheetContent, SheetHeader, SheetTitle }
