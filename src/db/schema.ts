import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

// bunx drizzle-kit push
// Drizzle ORM의 데이터베이스 스키마 동기화 명령어

// users 테이블이
// 데이터베이스에 없으면 → 테이블 생성
// 있지만 구조가 다르면 → ALTER TABLE 실행
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_unique").on(t.clerkId)]
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("name_idx").on(t.name)]
);
