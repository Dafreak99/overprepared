import { groq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  try {
    const { object } = await generateObject({
      model: groq('llama-3.1-70b-versatile'),
      system:
        'You are a helpful assistant. Your job is to take the input, either can be a detailed job description or a role name, and generate interview questions and it answer for the role. Return an array of questions with its answer. Please be careful about failed to generate JSON object.',
      prompt,
      output: 'array',
      schema: z.object({
        question: z.string(),
        answer: z.string(),
      }),
    });

    return Response.json(object);
  } catch (error) {
    console.error('Error generating JSON:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate JSON. Please adjust your prompt.',
      }),
      { status: 500 },
    );
  }
}
