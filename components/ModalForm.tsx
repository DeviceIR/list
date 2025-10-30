"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useList } from "@/context/ListContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "./ui/TextArea";
import { motion } from "motion/react";

interface ModalFormProps {
  mode: "create" | "edit";
  itemId?: string;
  onClose: () => void;
}

export default function ModalForm({ mode, itemId, onClose }: ModalFormProps) {
  const { addItem, editItem, items } = useList();
  const itemToEdit = items.find((i) => i.id === itemId);

  const form = useForm({
    defaultValues: {
      title: itemToEdit?.title || "",
      subTitle: itemToEdit?.subTitle || "",
    },
  });

  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // same as clicking Cancel
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (mode === "create") addItem(data.title, data.subTitle);
    else if (mode === "edit" && itemId) editItem(itemId, data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm  flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="border-2 bg-background rounded-2xl p-6 w-96 shadow-xl animate-in fade-in duration-200"
      >
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {mode === "edit" ? "Edit Item" : "Create New Item"}
        </h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div>
            <Input
              {...form.register("title", {
                required: "Title cannot be empty",
                maxLength: { value: 50, message: "Title too long" },
              })}
              placeholder="Title"
            />
            <motion.div
              animate={{
                height: form.formState.errors.title ? "2rem" : 0,
                opacity: form.formState.errors.title ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.title?.message}
              </p>
            </motion.div>
          </div>

          <div>
            <TextArea
              label="Subtitle"
              {...form.register("subTitle", {
                required: "Subtitle cannot be empty",
                maxLength: {
                  value: 200,
                  message: "Max 200 characters allowed",
                },
              })}
              placeholder="Enter subtitle"
            />
            {form.formState.errors.subTitle && (
              <motion.div
                animate={{
                  height: form.formState.errors.subTitle ? "2rem" : 0,
                  opacity: form.formState.errors.subTitle ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.subTitle?.message}
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
