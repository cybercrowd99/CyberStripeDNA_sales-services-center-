/**
 * CyberStripeDNA Sales & Services Center
 * File: utils/pricing.js
 *
 * ONE JOB:
 * Provide the established market pricing value to
 * CyberCrowd sales and services.
 *
 * This module does not create market ratios.
 * It does not define exchange policy.
 * It does not perform payment processing.
 * It only exposes pricing information already supplied
 * by the market.
 */

export function getPricing({
  offer,
  amount,
  marketRatio,
}) {
  if (!offer) {
    throw new Error("PRICING_OFFER_REQUIRED");
  }

  if (amount === undefined || amount === null || Number(amount) <= 0) {
    throw new Error("PRICING_AMOUNT_REQUIRED");
  }

  if (!marketRatio) {
    throw new Error("PRICING_MARKET_RATIO_REQUIRED");
  }

  return {
    offer,
    amount: Number(amount),
    marketRatio,
  };
}

export function getRedeemablePricing({
  offer,
  asset,
  assetAmount,
  marketRatio,
}) {
  if (!offer) {
    throw new Error("PRICING_OFFER_REQUIRED");
  }

  if (!asset) {
    throw new Error("PRICING_ASSET_REQUIRED");
  }

  if (
    assetAmount === undefined ||
    assetAmount === null ||
    Number(assetAmount) <= 0
  ) {
    throw new Error("PRICING_ASSET_AMOUNT_REQUIRED");
  }

  if (!marketRatio) {
    throw new Error("PRICING_MARKET_RATIO_REQUIRED");
  }

  return {
    offer,
    asset,
    assetAmount: Number(assetAmount),
    marketRatio,
    status: "REDEEMABLE",
  };
}
