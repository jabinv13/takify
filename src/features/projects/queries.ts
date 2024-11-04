import { getMember } from "../members/utils";

import { createSessionClient } from "@/lib/appwrite";
import { DATABASE_ID, PROJECTS_ID, WORKSPACES_ID } from "@/config";
import { Project } from "./types";

export const getProject = async ({ projectId }: { projectId: string }) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    const project = await databases.getDocument<Project>(
      DATABASE_ID!,
      PROJECTS_ID!,
      projectId
    );

    if (!project) {
      throw new Error("No project found");
    }

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      return null;
    }

    console.log(project);

    return project;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getWorkspaceInfo = async ({
//   workspaceId,
// }: {
//   workspaceId: string;
// }) => {
//   try {
//     const { databases } = await createSessionClient();

//     const workspace = await databases.getDocument<Wrokspace>(
//       DATABASE_ID!,
//       WORKSPACES_ID!,
//       workspaceId
//     );
//     return {
//       name: workspace.name,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
