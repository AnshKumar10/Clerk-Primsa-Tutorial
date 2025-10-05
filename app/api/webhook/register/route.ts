import prisma from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();

  const svixHeaders: { [key: string]: string } = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let event: WebhookEvent;

  const webhook = new Webhook(WEBHOOK_SECRET);

  try {
    event = webhook.verify(body, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const { email_addresses, primary_email_address_id } = event.data;

    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id
    );

    if (!primaryEmail) {
      return new Response("Primary email not found", { status: 400 });
    }

    await prisma.user.create({
      data: {
        id: event.data.id,
        email: primaryEmail.email_address,
        isSubscribed: false,
      },
    });
    console.log(`User created: ${primaryEmail.email_address}`);
  }

  return new Response("Webhook received", { status: 200 });
}
