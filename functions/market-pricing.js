/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: functions/market-pricing.js
 *
 * ONE JOB:
 * Expose provider-side market pricing calculation.
 *
 * PRODUCES:
 * - MARKET.PRICE
 *
 * CONSUMES:
 * - PROVIDER.OFFER
 * - ASSET.VALUE
 *
 * DOES NOT OWN:
 * - Identity
 * - Continuity
 * - Payment authorization
 * - Account restrictions
 * - Merchant restrictions
 * - Metadata ownership
 * - Settlement execution
 * - Cross-organ mutation
 *
 * BOUNDARY:
 * This endpoint performs market pricing only.
 * It does not authorize, charge, collect, or settle payment.
 */

import { calculateMarketPrice } from "../utils/market-pricing.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const marketPrice = calculateMarketPrice({
      provider: body.provider,
      offer: body.offer,
      asset: body.asset,
      assetAmount: body.assetAmount,
      marketRatio: body.marketRatio
    });

    return Response.json({
      exchange: "CYBERCROWD-MARKET-PRICE",
      status: "CALCULATED",
      marketPrice
    });
  } catch (error) {
    return Response.json(
      {
        exchange: "CYBERCROWD-MARKET-PRICE",
        status: "REJECTED",
        error: error instanceof Error
          ? error.message
          : "MARKET_PRICING_FAILED"
      },
      { status: 400 }
    );
  }
}
