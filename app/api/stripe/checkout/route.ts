import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/utils/stripe";

const PRICE_IDS: Record<string, string | undefined> = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  founding: process.env.STRIPE_PRICE_FOUNDING,
};

const PLAN_FOR_PRICE: Record<string, string> = {
  pro_monthly: "pro",
  pro_annual: "pro",
  founding: "founding",
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const priceKey = body.priceKey as string;

  const priceId = PRICE_IDS[priceKey];

  if (!priceId) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  // Find or create the Stripe customer for this user
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle<{ stripe_customer_id: string | null }>();

  let customerId = profile?.stripe_customer_id ?? null;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myvaulterly.com";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/account?upgraded=1`,
    cancel_url: `${baseUrl}/pricing`,
    metadata: {
      supabase_user_id: user.id,
      plan: PLAN_FOR_PRICE[priceKey],
    },
    subscription_data: {
      metadata: {
        supabase_user_id: user.id,
        plan: PLAN_FOR_PRICE[priceKey],
      },
    },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
