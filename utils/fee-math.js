/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: utils/fee-math.js
 *
 * ONE JOB:
 * Calculate the provider-side transaction fee.
 *
 * INPUTS:
 * - provider
 * - offer
 * - amountMinor
 *
 * OUTPUT:
 * - MARKET.FEE
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
 * This utility performs fee mathematics only.
 * It does not charge, collect, or move money.
 */

export function calculateFee({
  provider,
  offer,
  amountMinor
}) {
  if (!provider || !offer) {
    throw new Error("provider_offer_required");
  }

  const amount = Number(amountMinor);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("valid_amount_minor_required");
  }

  const feeRate = 0.029;
  const fixedMinor = 30;

  const feeMinor = Math.round(
    amount * feeRate + fixedMinor
  );

  return {
    provider,
    offer,
    amountMinor: amount,
    feeRate,
    fixedMinor,
    feeMinor
  };
}
