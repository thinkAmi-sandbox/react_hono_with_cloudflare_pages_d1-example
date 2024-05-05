import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const colors = sqliteTable("colors", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
})