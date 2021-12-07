import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAllReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();

  res.json(referrals);
};

export const getReferralById = async (req: Request, res: Response) => {
  const { id }: { id?: number } = req.params;
  const referral = await prisma.referral.findUnique({
    where: { id: Number(id) },
  });

  res.json(referral);
};

export const deleteReferralById = async (req: Request, res: Response) => {
  const deleted = await prisma.referral.delete({
    where: {
      id: req.body.id,
    },
  });

  if (deleted) {
    res.status(200);
    res.json(`The referral ${deleted.givenName} ${deleted.surName} is deleted.`);
  } else {
    res.status(404);
    res.json('Cannot find a referral.');
  }
};

export const updateReferral = async (req: Request, res: Response) => {
  const { id, givenName, surName, phone, email, addressLine, suburb, state, postCode, country } = req.body;

  const updated = await prisma.referral.update({
    where: {
      id,
    },
    data: {
      givenName,
      surName,
      phone,
      email,
      addressLine,
      suburb,
      state,
      postCode,
      country,
      updatedAt: new Date(),
    },
  });

  if (updated) {
    res.status(200);
    res.json(updated);
  } else {
    res.status(404);
    res.json('Cannot update the referral.');
  }
};

export const createReferral = async (req: Request, res: Response) => {
  const { givenName, surName, phone, email, addressLine, suburb, state, postCode, country } = req.body;
  const created = await prisma.referral.create({
    data: {
      givenName,
      surName,
      phone,
      email,
      addressLine,
      suburb,
      state,
      postCode,
      country,
      updatedAt: new Date(),
    },
  });
  if (created) {
    res.status(200);
    res.json(created);
  } else {
    res.status(404);
    res.json('Cannot create the referral.');
  }
};
