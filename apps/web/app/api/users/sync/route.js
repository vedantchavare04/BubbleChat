import { prisma } from "@repo/db";
export async function POST(req) {
    const body = await req.json();
    const { email, name } = body;
    if (!email) {
        return Response.json({ ok: false, reason: "No email" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({
        where: { email },
    });
    if (!existing) {
        await prisma.user.create({
            data: {
                email,
                name: name ?? "New User",
            },
        });
    }
    return Response.json({ ok: true });
}
