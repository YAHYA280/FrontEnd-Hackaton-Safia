import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-bold mb-4">
              Hello, World! 👋
            </CardTitle>
            <CardDescription className="text-lg">
              Welcome to your Next.js 14 application with the App Router
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              This application is built with:
            </p>
            <ul className="space-y-2 text-center">
              <li className="flex items-center justify-center gap-2">
                <span className="font-semibold">Next.js 14</span> - React Framework
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="font-semibold">App Router</span> - Modern routing
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="font-semibold">Tailwind CSS</span> - Styling
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="font-semibold">shadcn/ui</span> - UI Components
              </li>
            </ul>
            <div className="flex gap-4 justify-center pt-6">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
