"use client";

import * as React from "react";
import { Edit3, Trash2, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

import { useList } from "@/context/ListContext";
import ModalForm from "../ModalForm";

export function List() {
  const { items, deleteItem } = useList();
  const [isOpen, setIsOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);

  const openCreate = () => {
    setEditId(null);
    setIsOpen(true);
  };

  const openEdit = (id: string) => {
    setEditId(id);
    setIsOpen(true);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">List Manager</h2>
        <Button
          variant="default"
          size="sm"
          onClick={openCreate}
          className=" text-foreground bg-background hover:text-background rounded-full"
        >
          <PlusIcon size={16} />
        </Button>
      </div>

      {/* Items */}
      <ItemGroup>
        {items.length === 0 ? (
          <p className="text-foreground italic text-center py-10">
            No items yet — click “Create” to add one.
          </p>
        ) : (
          items.map((person, index) => (
            <React.Fragment key={person.id}>
              <Item
                className="
  rounded-xl
  border border-transparent       
  hover:border-x-foreground     
  hover:scale-105                 
  transition-transform transition-colors duration-1000
"
              >
                <ItemMedia>
                  <Avatar className="border shadow-sm bg-gray-50">
                    <AvatarFallback className="text-red-600 font-semibold bg-background">
                      {person.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>

                <ItemContent className="gap-1">
                  <ItemTitle className="font-bold text-foreground tracking-wide text-lg">
                    {person.title}
                  </ItemTitle>
                  <ItemDescription className="text-foreground">
                    {person.subTitle}
                  </ItemDescription>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created:{" "}
                    {new Date(person.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </ItemContent>

                <ItemActions className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-yellow-100 hover:text-yellow-700"
                    onClick={() => openEdit(person.id)}
                  >
                    <Edit3 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-red-100 hover:text-red-700"
                    onClick={() => deleteItem(person.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </ItemActions>
              </Item>
              {index !== items.length - 1 && <ItemSeparator />}
            </React.Fragment>
          ))
        )}
      </ItemGroup>

      {/* Modal */}
      {isOpen && (
        <ModalForm
          mode={editId ? "edit" : "create"}
          itemId={editId || undefined}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
