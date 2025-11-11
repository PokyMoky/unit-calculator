export function calculateResults(updatedData) {
   const { AU, CPC, CR1, CR2, AVP, COGS, Ret } = updatedData;

   const cr1Dec = CR1 / 100;
   const cr2Dec = CR2 / 100;

   const Leads = AU * cr1Dec;
   const Buyers = Leads * cr2Dec;
   const Budget = AU * CPC;

   const CPA = CPC / cr1Dec;
   const CPPU = -(CPC / cr1Dec / cr2Dec);

   const Margin = AVP - COGS;
   const APC = Ret;
   const ARPPU = Margin * Ret;
   const ARPU = ARPPU * cr1Dec * cr2Dec;
   const Revenue = ARPPU * Buyers;

   const LTV = Margin * Ret;
   const GP = Buyers * AVP * LTV;
   const Profit = GP - Budget;
   const OP = Margin - CPPU + Margin * (Ret - 1);

   const thresholdCPA = ARPPU * cr2Dec;
   const thresholdCPC = ARPU;
   const PPPU = CPPU + Margin * Ret;

   return {
      thresholdCPC: {title: "Пороговый CPC", value: thresholdCPC},
      thresholdCPA: {title: "Пороговый CPA", value: thresholdCPA},
      ARPPU: {title: "ARPPU", value: ARPPU},
      ARPU: {title: "ARPU", value: ARPU},
      CPA: {title: "CPA (Cost Per Acquisition)", value: CPA},
      CPPU: {title: "CPPU (Cost Per Paying User)", value: CPPU},
      Leads: {title: "Leads", value: Leads},
      Buyers: {title: "Buyers", value: Buyers},
      Budget: {title: "Budget", value: Budget},
      Margin: {title: "Margin", value: Margin},
      APC: {title: "Retention (APC)", value: APC},
      LTV: {title: "LTV (Life Time Value)", value: LTV},
      Revenue: {title: "Revenue (без вычета COGs)", value: Revenue},
      GP: {title: "Gross Profit", value: GP},
      PPPU: {title: "Profit Per Paying User", value: PPPU},
      Profit: {title: "Profit", value: Profit},
      OP: {title: "Operating Profit", value: OP}
   };
}
