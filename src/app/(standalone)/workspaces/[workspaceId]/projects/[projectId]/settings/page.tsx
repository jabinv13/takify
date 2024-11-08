import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

import { redirect } from "next/navigation";
import React from "react";
import ProjectSettings from "./client";

const ProjectIdSettingsPage = async () => {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }
  return <ProjectSettings />;
};

export default ProjectIdSettingsPage;
