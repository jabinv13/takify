import { Hono } from "hono";
import { createTaskSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { TaskStatus } from "../types";
import { createAdminClient } from "@/lib/appwrite";
import { Project } from "@/features/projects/types";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeld: z.string().nullish(),
        status: z.nativeEnum(TaskStatus),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { status, workspaceId, projectId, dueDate, assigneeld, search } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "UnAuthorized" }, 400);
      }

      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];

      if (projectId) {
        console.log("projectId---", projectId);
        query.push(Query.equal("projectId", projectId));
      }

      if (projectId) {
        console.log("status---", status);
        query.push(Query.equal("status", status));
      }
      if (assigneeld) {
        console.log("assigneeld---", assigneeld);
        query.push(Query.equal("assigneeld", assigneeld));
      }

      if (dueDate) {
        console.log("dueDate---", dueDate);
        query.push(Query.equal("dueDate", dueDate));
      }

      if (search) {
        console.log("search---", search);
        query.push(Query.equal("search", search));
      }

      const tasks = await databases.listDocuments(
        DATABASE_ID!,
        TASKS_ID!,
        query
      );

      const projectIds = tasks.documents.map((task) => task.projectId);
      const assigneelds = tasks.documents.map((task) => task.asigneeId);

      const projects = await databases.listDocuments<Project>(
        DATABASE_ID!,
        PROJECTS_ID!,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const members = await databases.listDocuments(
        DATABASE_ID!,
        MEMBERS_ID!,
        assigneelds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find(
          (project) => project.$id === task.projectId
        );
        const assignee = assignees.find(
          (assignee) => assignee.$id === task.assigneeId
        );

        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )

  .post(
    "/",
    zValidator("json", createTaskSchema),
    sessionMiddleware,
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { name, status, workspaceId, projectId, dueDate, assigneeld } =
        c.req.valid("json");

      const memeber = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!memeber) {
        return c.json({ error: "UnAutorized" }, 401);
      }

      const hoghestPositionTask = await databases.listDocuments(
        DATABASE_ID!,
        TASKS_ID!,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      );

      const newPosition =
        hoghestPositionTask.documents.length > 0
          ? hoghestPositionTask.documents[0].psition + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID!,
        TASKS_ID!,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeld,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  );

export default app;