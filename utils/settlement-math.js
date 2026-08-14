/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: utils/settlement-math.js
 *
 * ONE JOB:
 * Calculate the provider-side settlement-ready market value.
 *
 * INPUTS:
 * - provider
 * - offer
 * - marketPrice
 * - redeemable
 * - fee
 *
 * OUTPUT:
 * - MARKET.SETTLEMENT
 *
 * DOES NOT OWN:
 * - Identity
 * - Continuity
 * - Payment authorization
 * - Account restrictions
 * - Merchant restrictions
 * - Metadata ownership
 * - Settlement execution
 *
 * BOUNDARY:
 * This utility calculates settlement values only.
 * It does not initiate, authorize, or execute payment.
 */

export function calculateSettlement({
  provider,
  offer,
  marketPrice,
  redeemable,
  fee
}) {
  if (!provider || !offer) {
    throw new Error("provider_offer_required");
  }

  if (!marketPrice || !fee || !redeemable) {
    throw new Error("settlement_inputs_required");
  }

  const grossMinor = Number(marketPrice.totalMinor);
  const feeMinor = Number(fee.feeMinor);

  if (!Number.isFinite(grossMinor) || grossMinor < 0) {
    throw new Error("valid_market_price_required");
  }

  if (!Number.isFinite(feeMinor) || feeMinor < 0) {
    throw new Error("valid_fee_required");
  }

  const netMinor = Math.max(0, grossMinor - feeMinor);

  return {
    provider,
    offer,
    grossMinor,
    feeMinor,
    netMinor,
    redeemable: redeemable.redemption
  };
}
