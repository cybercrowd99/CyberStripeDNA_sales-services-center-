/**
 * CyberStripeDNA Sales & Services Center
 * File: utils/exchange.js
 *
 * ONE JOB:
 * Handle redeemable exchange value for CyberCrowd sales and services.
 *
 * The market ratio already exists elsewhere.
 * This module consumes that established ratio.
 *
 * Exchange is not a bank.
 * Exchange is not a broker.
 * Exchange is not a lender.
 * Exchange is not an investment service.
 */

export function createExchangeRedemption({
  provider,
  offer,
  asset,
  assetAmount,
  marketRatio,
}) {
  if (!provider) {
    throw new Error("EXCHANGE_PROVIDER_REQUIRED");
  }

  if (!offer) {
    throw new Error("EXCHANGE_OFFER_REQUIRED");
  }

  if (!asset) {
    throw new Error("EXCHANGE_ASSET_REQUIRED");
  }

  if (!assetAmount || Number(assetAmount) <= 0) {
    throw new Error("EXCHANGE_AMOUNT_REQUIRED");
  }

  if (!marketRatio) {
    throw new Error("EXCHANGE_MARKET_RATIO_REQUIRED");
  }

  return {
    exchange: "CYBERCROWD-REDEEMABLE",
    provider,
    offer,
    asset,
    assetAmount: Number(assetAmount),
    marketRatio,
    status: "REDEEMABLE",
    custody: false,
    brokerage: false,
    banking: false,
    createdAt: new Date().toISOString(),
  };
}

export function getRedeemableValue(redemption) {
  if (!redemption) {
    throw new Error("EXCHANGE_REDEMPTION_REQUIRED");
  }

  return {
    exchange: "CYBERCROWD-REDEEMABLE",
    provider: redemption.provider,
    offer: redemption.offer,
    asset: redemption.asset,
    assetAmount: redemption.assetAmount,
    marketRatio: redemption.marketRatio,
    status: redemption.status,
  };
}
