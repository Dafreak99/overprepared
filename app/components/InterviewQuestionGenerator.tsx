'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2, Moon, Sun, Bookmark } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';
import { saveQuestion } from '@/lib/actions/question.actions';

const InterviewQuestionsGenerator = () => {
  const [input, setInput] = useState('');
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, openSignIn } = useClerk();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await generateQuestionsAndAnswers(input);
    setQuestionsAndAnswers(result);
    setIsLoading(false);
    console.log('Generated questions:', result);
  };

  const handleSaveAll = () => {
    if (isLoggedIn) {
      setSavedQuestions([...savedQuestions, ...questionsAndAnswers]);
    } else {
      alert('Please log in to save questions');
    }
  };

  const handleSaveQuestion = async (question: {
    question: string;
    answer: string;
  }) => {
    // TODO: Persist user questions before login in
    if (user) {
      await saveQuestion({
        userId: user.id,
        question: question.question,
        answer: question.answer,
      });
    } else {
      openSignIn();
    }
  };

  const generateQuestionsAndAnswers = async (input: string) => {
    console.log('Generating questions for:', input);

    const response = await fetch('/api/completion', {
      method: 'POST',
      body: JSON.stringify({
        prompt: input,
      }),
    });

    const result = await response.json();

    return result;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className='container mx-auto p-4 max-w-2xl bg-background text-foreground'>
        <div className='flex justify-end mb-4'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className='h-[1.2rem] w-[1.2rem]' />
            ) : (
              <Moon className='h-[1.2rem] w-[1.2rem]' />
            )}
          </Button>
        </div>
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>AI Interview Questions Generator</CardTitle>
            <CardDescription>
              Enter a job description or role name to generate interview
              questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className='flex space-x-2'>
              <Input
                placeholder='E.g., Senior React Developer'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  'Generate'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {questionsAndAnswers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Questions</CardTitle>
              <CardDescription>
                Click on a question to view the answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type='single' collapsible className='w-full'>
                {questionsAndAnswers.map((qa, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{qa.question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{qa.answer}</p>
                      <Button
                        variant='outline'
                        size='sm'
                        className='mt-2'
                        onClick={() => handleSaveQuestion(qa)}
                      >
                        <Bookmark className='h-4 w-4' />
                        Save Question
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button className='mt-4' onClick={handleSaveAll}>
                <Bookmark className='h-4 w-4' />
                Save All Questions
              </Button>
            </CardContent>
          </Card>
        )}

        <div className='mt-6 flex justify-between items-center'>
          <Button variant='outline' onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </Button>
          {isLoggedIn && <p>Logged In</p>}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsGenerator;
