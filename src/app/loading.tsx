"use client";

import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex gap-y-2 flex-col items-center justify-center ">
      <Loader className="size-6 animate-spin" />
    </div>
  );
};

export default LoadingPage;