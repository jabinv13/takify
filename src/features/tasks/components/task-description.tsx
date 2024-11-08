import React, { useState } from "react";
import { Task } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DottedSeparator from "@/components/dottes-seperator";
import { useUpdateTask } from "../api/use-update-task";

interface TaskDescriptionProps {
  task: Task;
}

const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setvalue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="tex-lg font-semibold">Overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setvalue(e.target.value)}
            disabled={isPending}
          />
          <Button
            onClick={handleSave}
            disabled={isPending}
            size="sm"
            className="w-fit ml-auto"
          >
            {isPending ? "Saving" : "Save chnages"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description ?? (
            <span className="text-muted-foreground">no description</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
