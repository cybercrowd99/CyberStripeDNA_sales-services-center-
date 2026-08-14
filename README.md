CyberStripeDNA — Sales & Services Center

IT REF: CC-MARKET-SALES-0001

This organ handles provider-side market movement inside CyberCrowd.

It connects providers, offers, sales, services, transactions, and redeemable value without owning or storing the underlying metadata.

Metadata Center manages the con-flux; this organ only performs market-side calculations.

What this organ does

Market pricing

Converts provider offers, asset amounts, and ratios into deterministic pricing.

Transaction fee calculation

Computes provider-side fees for sales and services.

Redeemable exchange value

Creates and returns redeemable exchange objects for offers and assets.

Provider-side revenue movement

Produces settlement-ready values for upstream organs.

This organ does not authorize payments, freeze accounts, mutate identity, or touch continuity.

It only performs market math.

Folder structure

/functions
    exchange-redeem.js        → POST handler for redeemable exchange value
    transaction-fee.js        → POST handler for fee calculation

/utils
    market-pricing.js         → shared pricing utilities

LICENSE                      → BSD 2-Clause

Design rules

- No identity logic
- No continuity logic
- No account restrictions
- No merchant restrictions
- No metadata ownership
- No cross-organ mutation

This organ stays pure:

It calculates market values, returns deterministic objects, and leaves all other decisions to adjacent organs.

Example: Redeemable Exchange

{
  "exchange": "CYBERCROWD-REDEEMABLE",
  "status": "REDEEMABLE",
  "redemption": {
    "provider": "provider_1",
    "offer": "offer_123",
    "asset": "asset_ABC",
    "redeemableMinor": 45000
  }
}

Purpose

This organ is part of the CyberStripeDNA market chain.

It enables CyberCrowd to generate sales-service revenue without owning metadata or performing financial authorization.

It is a market-movement organ, not a payment processor.
