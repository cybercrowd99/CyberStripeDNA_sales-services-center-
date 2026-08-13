/**
 * CyberStripeDNA Sales & Services Center
 * File: functions/transaction-fee.js
 *
 * ONE JOB:
 * Calculate the transaction fee for a CyberCrowd sale or service.
 *
 * This module does not define market ratios.
 * It does not process payment.
 * It does not perform exchange.
 * It does not create identity, continuity, structure, or capability.
 * It only calculates the transaction fee from supplied pricing data.
 */

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    if (
      body.amount === undefined ||
      body.amount === null ||
      Number(body.amount) <= 0
    ) {
      throw new Error("TRANSACTION_AMOUNT_REQUIRED");
    }

    if (
      body.feeRate === undefined ||
      body.feeRate === null ||
      Number(body.feeRate) < 0
    ) {
      throw new Error("TRANSACTION_FEE_RATE_REQUIRED");
    }

    const amount = Number(body.amount);
    const feeRate = Number(body.feeRate);
    const fee = amount * feeRate;

    return Response.json({
      transaction: "CYBERCROWD-TRANSACTION",
      status: "CALCULATED",
      amount,
      feeRate,
      fee,
      total: amount + fee,
    });
  } catch (error) {
    return Response.json(
      {
        transaction: "CYBERCROWD-TRANSACTION",
        status: "REJECTED",
        error:
          error instanceof Error
            ? error.message
            : "TRANSACTION_FEE_FAILED",
      },
      { status: 400 },
    );
  }
}
