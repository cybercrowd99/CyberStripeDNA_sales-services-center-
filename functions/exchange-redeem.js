import {
  createExchangeRedemption,
  getRedeemableValue,
} from "../utils/exchange.js";

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const redemption = createExchangeRedemption({
      provider: body.provider,
      offer: body.offer,
      asset: body.asset,
      assetAmount: body.assetAmount,
      marketRatio: body.marketRatio,
    });

    return Response.json({
      exchange: "CYBERCROWD-REDEEMABLE",
      status: "REDEEMABLE",
      redemption: getRedeemableValue(redemption),
    });
  } catch (error) {
    return Response.json(
      {
        exchange: "CYBERCROWD-REDEEMABLE",
        status: "REJECTED",
        error: error instanceof Error
          ? error.message
          : "EXCHANGE_REDEMPTION_FAILED",
      },
      { status: 400 },
    );
  }
}
