import {
    BlockElementIcon,
    ComposeIcon,
    InlineElementIcon,
    InsertAboveIcon,
    SearchIcon,
  } from "@sanity/icons";
  import type { FieldGroupDefinition } from "sanity";
  
  export const GROUP = {
    META: "metadata",
    CONTENT: "content",
    CARD: "card",
    RELATED: "related",
    OG: "og",
  };
  
  export const GROUPS: FieldGroupDefinition[] = [
    // { name: CONST.MAIN_CONTENT, default: true },
    {
      name: GROUP.CONTENT,
      icon: ComposeIcon,
      title: "Content",
      default: true,
    },
    { name: GROUP.META, icon: SearchIcon, title: "Metadata" },
    {
      name: GROUP.OG,
      icon: InsertAboveIcon,
      title: "Open Graph",
    },
    {
      name: GROUP.CARD,
      icon: BlockElementIcon,
      title: "Card",
    },
    {
      name: GROUP.RELATED,
      icon: InlineElementIcon,
      title: "Related",
    },
  ];