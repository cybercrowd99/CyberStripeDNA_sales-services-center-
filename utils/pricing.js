/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: utils/market-pricing.js
 *
 * ONE JOB:
 * Calculate deterministic provider-side market pricing.
 *
 * PRODUCES:
 * - MARKET.PRICE
 *
 * CONSUMES:
 * - PROVIDER.OFFER
 * - ASSET.VALUE
 * - marketRatio
 *
 * DOES NOT OWN:
 * - Identity
 * - Continuity
 * - Account restrictions
 * - Merchant restrictions
 * - Metadata ownership
 * - Payment authorization
 * - Settlement execution
 * - Cross-organ mutation
 *
 * BOUNDARY:
 * This utility performs market math only.
 * It does not authorize, charge, settle, or mutate
 * anything outside the calculation it returns.
 */

export function calculateMarketPrice({
  provider,
  offer,
  asset,
  assetAmount,
  marketRatio
}) {
  if (!provider || !offer || !asset) {
    throw new Error("provider_offer_asset_required");
  }

  const amount = Number(assetAmount);
  const ratio = Number(marketRatio);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("valid_asset_amount_required");
  }

  if (!Number.isFinite(ratio) || ratio < 0) {
    throw new Error("valid_market_ratio_required");
  }

  const totalMinor = Math.round(amount * ratio);

  return {
    provider,
    offer,
    asset,
    assetAmount: amount,
    marketRatio: ratio,
    totalMinor
  };
}
