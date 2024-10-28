import { Button } from "@/components/ui/button";

import { createAdminClient } from "@/lib/appwrite";

export default function Home() {
  console.log(createAdminClient);
  return (
    <div className="flex gap-4  ">
      <Button size="lg">Primary</Button>
      <Button variant="destructive">Primary</Button>
      <Button variant="teritary">Primary</Button>
    </div>
  );
}
