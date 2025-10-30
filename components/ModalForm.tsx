"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useList } from "@/context/ListContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "./ui/TextArea";

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
            {/* <label className="block text-sm font-medium mb-1 text-foreground tracking-wider">
              Title
            </label> */}
            <Input
              {...form.register("title", { required: true })}
              placeholder="Title"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-xs mt-1">Title is required</p>
            )}
          </div>

          <div>
            {/* <label className="block text-sm font-medium mb-1 text-foreground tracking-wider">
              Subtitle
            </label> */}
            <TextArea
              label="Subtitle" // ✅ required for floating label
              {...form.register("subTitle", { required: true })}
              placeholder="Enter subtitle" // optional, mainly for accessibility
            />
            {form.formState.errors.subTitle && (
              <p className="text-red-500 text-xs mt-1">Subtitle is required</p>
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
