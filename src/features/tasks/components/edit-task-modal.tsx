"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";
import { EditTaskWrapper } from "./edit-task-form-wrapper";

const EditTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};

export default EditTaskModal;
