/**
 * CyberStripeDNA — Sales & Services Center
 * IT REF: CC-MARKET-SALES-0001
 *
 * FILE: utils/exchange.js
 *
 * ONE JOB:
 * Create the deterministic redeemable exchange value for a provider offer.
 *
 * INPUTS:
 * - provider
 * - offer
 * - asset
 * - assetAmount
 * - marketRatio
 *
 * OUTPUT:
 * - MARKET.REDEEMABLE
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
 * This utility creates a market-side redeemable object.
 * It does not perform redemption or move funds.
 */

export function getRedeemableValue({
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

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("valid_asset_amount_required");
  }

  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new Error("valid_market_ratio_required");
  }

  const redeemableMinor = Math.round(amount * ratio);

  return {
    exchange: "CYBERCROWD-REDEEMABLE",
    status: "REDEEMABLE",
    redemption: {
      provider,
      offer,
      asset,
      redeemableMinor
    }
  };
}
