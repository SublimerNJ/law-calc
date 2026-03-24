import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // court: stamp-fee, service-fee → lawsuit-cost
      { source: "/tools/court/stamp-fee", destination: "/tools/court/lawsuit-cost", permanent: true },
      { source: "/tools/court/service-fee", destination: "/tools/court/lawsuit-cost", permanent: true },
      // family: legal-inheritance → inheritance-order, gift-tax → inheritance-tax
      { source: "/tools/family/legal-inheritance", destination: "/tools/family/inheritance-order", permanent: true },
      { source: "/tools/family/gift-tax", destination: "/tools/family/inheritance-tax", permanent: true },
      // labor: ordinary-wage → overtime-pay, average-wage → severance-pay
      { source: "/tools/labor/ordinary-wage", destination: "/tools/labor/overtime-pay", permanent: true },
      { source: "/tools/labor/average-wage", destination: "/tools/labor/severance-pay", permanent: true },
      // tax: income-tax → year-end-tax, property-tax → comprehensive-property-tax
      { source: "/tools/tax/income-tax", destination: "/tools/tax/year-end-tax", permanent: true },
      { source: "/tools/tax/property-tax", destination: "/tools/tax/comprehensive-property-tax", permanent: true },
      // traffic: fault-ratio → accident-settlement, speeding-fine → fine-penalty
      { source: "/tools/traffic/fault-ratio", destination: "/tools/traffic/accident-settlement", permanent: true },
      { source: "/tools/traffic/speeding-fine", destination: "/tools/traffic/fine-penalty", permanent: true },
      // debt: legal-interest → late-payment
      { source: "/tools/debt/legal-interest", destination: "/tools/debt/late-payment", permanent: true },
      // damages: disability-compensation → industrial-accident(labor), product-liability → damages-general
      { source: "/tools/damages/disability-compensation", destination: "/tools/labor/industrial-accident", permanent: true },
      { source: "/tools/damages/product-liability", destination: "/tools/damages/damages-general", permanent: true },
    ];
  },
};

export default nextConfig;
