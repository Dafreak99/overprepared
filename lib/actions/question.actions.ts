'use server';

import prisma from '@/lib/database';
import { handleError } from '@/lib/utils';
import { SavedQuestion } from '@prisma/client';

// CREATE
export async function saveQuestion(
  data: Pick<SavedQuestion, 'userId' | 'question' | 'answer'>,
) {
  try {
    console.log('Saving question:', data);
    const newQuestion = await prisma.savedQuestion.create({
      data: {
        ...data,
      },
    });

    return JSON.parse(JSON.stringify(newQuestion));
  } catch (error) {
    handleError(error);
  }
}
