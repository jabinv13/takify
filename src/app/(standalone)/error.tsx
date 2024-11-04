"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex gap-y-2 flex-col items-center justify-center ">
      <AlertTriangle />
      <p
        className="text-sm text-muted-foreground
       "
      >
        Something went wrong ..
      </p>
      <Button variant="secondary" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
