CREATE TYPE "public"."product_color" AS ENUM('black', 'white', 'neutral', 'brown', 'red', 'pink', 'blue', 'yellow', 'gold', 'multi');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price_cents" integer NOT NULL,
	"image_url" text NOT NULL,
	"category_id" integer NOT NULL,
	"color" "product_color" NOT NULL,
	"badge" text,
	"stock" integer DEFAULT 0 NOT NULL,
	"added_at" date NOT NULL,
	CONSTRAINT "products_code_unique" UNIQUE("code"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug"),
	CONSTRAINT "products_price_nonneg" CHECK ("products"."price_cents" >= 0),
	CONSTRAINT "products_stock_nonneg" CHECK ("products"."stock" >= 0)
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "products_category_id_idx" ON "products" USING btree ("category_id");