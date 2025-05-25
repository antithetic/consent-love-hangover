import { defineArrayMember, defineType } from "sanity";
import { pageBuilderBlocks } from "../blocks";

export const pageBuilder = defineType({
  name: "pageBuilder",
  type: "array",
  of: pageBuilderBlocks.map((block) => defineArrayMember(block as any)),
});