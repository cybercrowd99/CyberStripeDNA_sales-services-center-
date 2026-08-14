/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: functions/transaction-fee.js
 *
 * ONE JOB:
 * Return the provider-side transaction fee calculation.
 *
 * PRODUCES:
 * - MARKET.FEE
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
 * This endpoint calculates a market fee only.
 * It does not charge, collect, authorize, or move money.
 */

import { calculateFee } from "../utils/fee-math.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const fee = calculateFee({
      provider: body.provider,
      offer: body.offer,
      amountMinor: body.amountMinor
    });

    return Response.json({
      exchange: "CYBERCROWD-FEE",
      status: "CALCULATED",
      fee
    });
  } catch (error) {
    return Response.json(
      {
        exchange: "CYBERCROWD-FEE",
        status: "REJECTED",
        error: error instanceof Error
          ? error.message
          : "TRANSACTION_FEE_FAILED"
      },
      { status: 400 }
    );
  }
}
