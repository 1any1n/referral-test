import { Referral, ReferralBase } from '../types/referral';

const API_URL = 'http://localhost:3333';

export const deleteReferralById = async (id: number) => {
  return await fetch(`${API_URL}/referrals/delete`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  });
};

export const getAllReferrals = async () => {
  return await fetch(`${API_URL}/referrals`).then((r) => r.json());
};

export const updateReferral = async (referral: Referral) => {
  return await fetch(`${API_URL}/referrals/update`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(referral),
  });
};

export const createReferral = async (referral: ReferralBase): Promise<Referral> => {
  return await fetch(`${API_URL}/referrals/create`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(referral),
  }).then((res) => res.json());
};
