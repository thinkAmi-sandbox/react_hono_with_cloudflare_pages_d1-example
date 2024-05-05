import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {colors} from "./colors";

export const apples = sqliteTable("apples", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  colorId: integer("color_id").references(() => colors.id),
  quantity: integer("quantity")
})