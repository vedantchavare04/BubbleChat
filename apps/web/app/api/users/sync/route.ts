import { prisma } from "@repo/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = body;

  if (!email) {
    return Response.json({ ok: false, reason: "No email" }, { status: 400 });
  }

  // 1️⃣ Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  // 2️⃣ If not found → create
  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        name: name ?? "New User",
      },
    });
  }

  // 3️⃣ Always return success
  return Response.json({ ok: true });
}
