/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: functions/provider-settlement.js
 *
 * ONE JOB:
 * Calculate provider-side market settlement readiness.
 *
 * FLOW:
 *   PROVIDER.OFFER
 *        ↓
 *   MARKET.PRICE
 *        ↓
 *   MARKET.REDEEMABLE
 *        ↓
 *   MARKET.FEE
 *        ↓
 *   MARKET.SETTLEMENT
 *
 * OWNERSHIP:
 * - Market pricing
 * - Redeemable exchange calculation
 * - Provider-side fee calculation
 * - Settlement-ready revenue math
 *
 * DOES NOT OWN:
 * - Identity
 * - Continuity
 * - Account restrictions
 * - Merchant restrictions
 * - Metadata ownership
 * - Financial authorization
 *
 * INPUTS:
 * - provider
 * - offer
 * - asset
 * - assetAmount
 * - marketRatio
 *
 * OUTPUT:
 * - CYBERCROWD-SETTLEMENT
 * - SETTLEMENT_READY
 *
 * DEPENDENCIES:
 * - utils/exchange.js
 * - utils/market-pricing.js
 * - utils/fee-math.js
 * - utils/settlement-math.js
 *
 * BOUNDARY:
 * This file calculates market-side settlement values.
 * It does not authorize, execute, or move money.
 */

import { getRedeemableValue } from "../utils/exchange.js";
import { calculateMarketPrice } from "../utils/market-pricing.js";
import { calculateFee } from "../utils/fee-math.js";
import { calculateSettlement } from "../utils/settlement-math.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    // 1. Market price (provider → offer → asset → ratio)
    const marketPrice = calculateMarketPrice({
      provider: body.provider,
      offer: body.offer,
      asset: body.asset,
      assetAmount: body.assetAmount,
      marketRatio: body.marketRatio
    });

    // 2. Redeemable exchange value
    const redeemable = getRedeemableValue({
      provider: body.provider,
      offer: body.offer,
      asset: body.asset,
      assetAmount: body.assetAmount,
      marketRatio: body.marketRatio
    });

    // 3. Transaction fee (provider-side)
    const fee = calculateFee({
      provider: body.provider,
      offer: body.offer,
      amountMinor: marketPrice.totalMinor
    });

    // 4. Provider settlement (revenue ready)
    const settlement = calculateSettlement({
      provider: body.provider,
      offer: body.offer,
      marketPrice,
      redeemable,
      fee
    });

    return Response.json({
      exchange: "CYBERCROWD-SETTLEMENT",
      status: "SETTLEMENT_READY",
      settlement
    });
  } catch (error) {
    return Response.json(
      {
        exchange: "CYBERCROWD-SETTLEMENT",
        status: "REJECTED",
        error: error instanceof Error
          ? error.message
          : "PROVIDER_SETTLEMENT_FAILED"
      },
      { status: 400 }
    );
  }
}
