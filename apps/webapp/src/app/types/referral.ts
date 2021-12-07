export interface Referral extends ReferralBase {
  id: number;
}

export interface ReferralBase {
  givenName: string;
  surName: string;
  email: string;
  phone: string;
  addressLine: string;
  suburb: string;
  state: string;
  postCode: string;
  country: string;
}
