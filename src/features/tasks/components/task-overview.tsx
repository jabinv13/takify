import { Button } from "@/components/ui/button";
import { Task } from "../types";
import { PencilIcon } from "lucide-react";
import DottedSeparator from "@/components/dottes-seperator";
import OverViewProperty from "./overview-property";
import MemberAvatar from "@/features/members/components/members-avatar";
import TaskDate from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeToTitleCase } from "@/lib/utils";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";

interface TaskOverViewProps {
  task: Task;
}

export const TaskOverView = ({ task }: TaskOverViewProps) => {
  const { open } = useUpdateTaskModal();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button size="sm" variant="secondary" onClick={() => open(task.$id)}>
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverViewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverViewProperty>
          <OverViewProperty label="Due date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverViewProperty>
          <OverViewProperty label="status">
            <Badge variant={task.status}>{snakeToTitleCase(task.status)}</Badge>
          </OverViewProperty>
        </div>
      </div>
    </div>
  );
};
