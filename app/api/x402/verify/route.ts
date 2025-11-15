// app/api/x402/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as `${string}://${string}`;

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  // aqui tu usas o x402-next pra validar
  // depende de como o pacote expõe a verificação; se ele só dá o middleware pronto,
  // tu pode chamar a lib interna ou reimplementar com o facilitator.
  // Vou deixar no formato genérico:
  const isValid = await validateWithFacilitator(token);

  if (!isValid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}

// exemplo bem simples: tu pode bater no facilitator
async function validateWithFacilitator(token: string) {
  const res = await fetch(`${facilitatorUrl}/api/x402/verify`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return res.ok;
}
