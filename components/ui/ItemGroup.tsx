import * as React from "react";
import { PlusIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const people = [
  {
    username: "balqis_dev",
    avatar: "https://i.pravatar.cc/150?img=32",
    email: "balqis.dev@example.com",
  },
  {
    username: "codewizard",
    avatar: "https://i.pravatar.cc/150?img=47",
    email: "wizard@codeschool.com",
  },
  {
    username: "tech_guru",
    avatar: "https://i.pravatar.cc/150?img=58",
    email: "guru@techworld.com",
  },
  {
    username: "pixel_artist",
    avatar: "https://i.pravatar.cc/150?img=66",
    email: "artist@creativestudio.com",
  },
];

export function List() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup>
        {people.map((person, index) => (
          <React.Fragment key={person.username}>
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.avatar} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
