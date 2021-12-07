import { getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Referral } from '../../types/referral';
import { ReferralTable } from './ReferralTable';

describe('ReferralTable', () => {

  const testReferrals: Referral[] = [
    {
      id: 1,
      givenName: 'John',
      surName: 'Doe',
      phone: '0456 123123',
      email: 'testing@brighte.com.au',
      addressLine: '',
      suburb: 'CBD',
      state: 'QLD',
      postCode: '4000',
      country: 'Australia'
    },
    {
      id: 2,
      givenName: 'Another',
      surName: 'Referral',
      phone: '0456 345345',
      email: 'referral@gmail.com',
      addressLine: '111 Adelaide St',
      suburb: 'South Bank',
      state: 'QLD',
      postCode: '4101',
      country: 'Australia'
    },
  ];

  it('should render headers correctly', async () => {
    const { baseElement } = render(<ReferralTable referrals={[]} />);
    await waitFor(() => getByText(baseElement as HTMLElement, 'Given Name'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Surname'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Email'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Phone'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Actions'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Address'));
  });

  it('should render referral fields', async () => {
    const { baseElement } = render(<ReferralTable referrals={testReferrals} />);
    await waitFor(() => getByText(baseElement as HTMLElement, 'John'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Doe'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 123123'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'testing@brighte.com.au'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'CBD QLD 4000 Australia'));

    await waitFor(() => getByText(baseElement as HTMLElement, 'Another'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'Referral'));
    await waitFor(() => getByText(baseElement as HTMLElement, '0456 345345'));
    await waitFor(() => getByText(baseElement as HTMLElement, 'referral@gmail.com'));
    await waitFor(() => getByText(baseElement as HTMLElement, '111 Adelaide St South Bank QLD 4101 Australia'));
  });
});
