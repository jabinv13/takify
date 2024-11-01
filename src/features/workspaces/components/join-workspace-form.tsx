"use client";
import DottedSeparator from "@/components/dottes-seperator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JOinWorkspaceFormProps {
  initialvalues: {
    name: string;
  };
}

const JoinWorkspaceForm = ({ initialvalues }: JOinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const iniviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: iniviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invite to join <strong>{initialvalues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7">
          <div className="flex flex-col gap-y-2 lg:flex-row items-center justify-between">
            <Button
              type="button"
              size="lg"
              asChild
              variant="secondary"
              className="w-full lg:w-fit"
              disabled={isPending}
            >
              <Link href="/"> Cancel</Link>
            </Button>
            <Button
              type="button"
              size="lg"
              variant="secondary"
              className="w-full lg:w-fit"
              onClick={onSubmit}
              disabled={isPending}
            >
              Join Workspace
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default JoinWorkspaceForm;
