import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-4  ">
      <Button size="lg">Primary</Button>
      <Button variant="destructive">Primary</Button>
      <Button variant="teritary">Primary</Button>
    </div>
  );
}
