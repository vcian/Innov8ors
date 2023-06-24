import { FormControl } from "@angular/forms";
import { DurationTypeEnum } from '@constants/app.constants';
import { ActionToolbar } from "@models/common.model";

export interface CreatePartner {
  isActive: boolean;
  email: string;
  companyName: string;
  address: Partial<Address>;
  name: string;
  phoneNo: string;
  webAddress: string;
  currency: string;
  locale: string;
  uuid: string;
}

export interface Address {
  city: string;
  zip: string;
  country: string;
  street: string;
}

export interface CreateScheduleForm {
  topic: FormControl<string>;
  durationType: FormControl<DurationTypeEnum>;
  duration: FormControl<number>;
  timeAvailability: FormControl<number>; // hours based
  timePreference: FormControl<Array<string>>; //(morning/noon/night)
  dayPreference: FormControl<Array<string>>; //(days)
  currentKnowledgeLevel: FormControl<string>; // beginner/intermediate/expert
  desiredKnowledgeLevel: FormControl<string>;// beginner/intermediate/expert
  learningStyle: FormControl<Array<string>>; // (e.g., visual, auditory, hands-on). - multi selection dropdown
  learningPace?: FormControl<string>;// ( more intensive or gradual approach)
}

export interface PartnerAddress {
  street: FormControl<string>,
  zip: FormControl<string>,
  city: FormControl<string>,
  country: FormControl<string>,
}

export interface PartnerListQueryParams {
  sort: string;
  page: number;
  pageSize: number;
  search: string;
}

export interface PartnerList {
  records: PartnerDetail[] | null;
  totalCount: number;
}
export interface PartnerDetail {
  partnerId: number;
  email: string;
  isActive: boolean;
  uuid: string;
  companyName: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  phoneNo: string;
  partnerAction: ActionToolbar[];
}

export interface CardCodeList {
  records: CardCodeDetail[] | null;
  totalCount: number;
}

export interface CardCodeDetail {
  partnerId: number;
  created: string;
  cardCode: string;
  initialCost: number;
  costPerRedeem: number;
  status: string;
  uuid: string;
}

export interface GenerateCards {
  noOfCards: number;
  initialCost: number;
  costPerRedeem: number;
  partnerSellingPrice: number;
  userId: string;
  totalCostOfCard: number;
  totalProfitOfCard: number;
}

export interface GenerateCardsForm {
  noOfCards: FormControl<number>;
  initialCost: FormControl<number>;
  costPerRedeem: FormControl<number>;
  partnerSellingPrice: FormControl<number>;
  totalCostOfCard: FormControl<number>;
  totalProfitOfCard: FormControl<number>;
}

export interface BuyingRedeemList {
  records: BuyingRedeemDetail[] | null;
  totalCount: number;
}
export interface BuyingRedeemDetail {
  uuid: string;
  _id: string;
  createdAt: string;
  initialCost: number;
  totalGeneratedCodes: number;
  averagePricePerRedeem: number;
  totalActivated: number;
  billable: number;
  status: string;
}

export interface CardAccountingStats {
  activated: number;
  cardsTotal: number;
  redeemed: number;
  totalRevenue: number;
  totalGrossProfit: number;
  openPayment: OpenPayment;
}

export interface OpenPayment {
  value: number;
  createdAt: string;
}
