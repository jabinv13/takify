"use client";
import { ResponsiveModal } from "@/components/responsive-modal";
import React from "react";
import { CreateProjectForm } from "./create-project-form";
import { useCreateProjectModal } from "../hook/use-create-project-modal";

const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
export default CreateProjectModal;
