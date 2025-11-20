import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("CLERK_SIGNING_SECRET is not set");
  }

  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayoad = await headers();
  const svix_id = headerPayoad.get("svix-id");
  const svix_timestamp = headerPayoad.get("svix-timestamp");
  const svix_signature = headerPayoad.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (e) {
    console.error(e);
    return new Response("Error: Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;

  // 유저 생성
  if (eventType === "user.created") {
    const { data } = evt;

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  // 유저 삭제
  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("Error: User ID is required", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  // 유저 업데이트
  if (eventType === "user.updated") {
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
