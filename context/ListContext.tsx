"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Item {
  id: string;
  title: string;
  subTitle: string;
  createdAt: string;
}

interface ListContextType {
  items: Item[];
  addItem: (title: string, subTitle: string) => void;
  editItem: (id: string, data: Partial<Item>) => void;
  deleteItem: (id: string) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("myListItems");
    if (stored) {
      setTimeout(() => {
        setItems(JSON.parse(stored));
      });
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("myListItems", JSON.stringify(items));
  }, [items]);

  const addItem = (title: string, subTitle: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      title,
      subTitle,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const editItem = (id: string, data: Partial<Item>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ListContext.Provider value={{ items, addItem, editItem, deleteItem }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) throw new Error("useList must be used within a ListProvider");
  return context;
};
