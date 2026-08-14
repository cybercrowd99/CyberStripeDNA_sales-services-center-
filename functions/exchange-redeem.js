/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: functions/exchange-redeem.js
 *
 * ONE JOB:
 * Return a provider-side redeemable exchange value.
 *
 * PRODUCES:
 * - MARKET.REDEEMABLE
 *
 * DOES NOT OWN:
 * - Identity
 * - Continuity
 * - Payment authorization
 * - Account restrictions
 * - Merchant restrictions
 * - Metadata ownership
 * - Cross-organ mutation
 *
 * BOUNDARY:
 * This endpoint calculates and returns a redeemable
 * market object. It does not perform redemption,
 * payment authorization, or settlement execution.
 */

import { getRedeemableValue } from "../utils/exchange.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const redeemable = getRedeemableValue({
      provider: body.provider,
      offer: body.offer,
      asset: body.asset,
      assetAmount: body.assetAmount,
      marketRatio: body.marketRatio
    });

    return Response.json(redeemable);
  } catch (error) {
    return Response.json(
      {
        exchange: "CYBERCROWD-REDEEMABLE",
        status: "REJECTED",
        error: error instanceof Error
          ? error.message
          : "REDEEMABLE_EXCHANGE_FAILED"
      },
      { status: 400 }
    );
  }
}
