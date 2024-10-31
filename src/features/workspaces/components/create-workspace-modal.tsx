"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import React from "react";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

const CreateWorkSpaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};
export default CreateWorkSpaceModal;
