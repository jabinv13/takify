"use client";
import React, { Fragment } from "react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import DottedSeparator from "@/components/dottes-seperator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import MemberAvatar from "@/features/members/components/members-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import useConfirm from "@/hooks/use-confirm";

const MemberList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const [UpdateRole, confirmUpdation] = useConfirm(
    "Update Member",
    "Member action will be updated",
    "destructive"
  );

  const [Dialog, confirm] = useConfirm(
    "Delete Member",
    "Member  will be deleted",
    "destructive"
  );

  const handleUpdateMember = async (memberId: string, role: MemberRole) => {
    const ok = await confirmUpdation();

    if (!ok) return;
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();

    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  console.log(data);
  return (
    <Card className="w-full h-full border-none shadow-none">
      <UpdateRole />
      <Dialog />
      <CardHeader className="flex flex-row items-center p-7 gap-x-4 space-y-0">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent>
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm text-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="ml-auto">
                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => {
                      handleUpdateMember(member.$id, MemberRole.ADMIN);
                    }}
                    disabled={isUpdatingMember}
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => {
                      handleUpdateMember(member.$id, MemberRole.MEMBER);
                    }}
                    disabled={isUpdatingMember}
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => {
                      handleDeleteMember(member.$id);
                    }}
                    disabled={isDeletingMember}
                  >
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5 s" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberList;
