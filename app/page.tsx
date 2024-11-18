'use client';

import * as React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronDown,
  Hash,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewQuestionsGenerator from './components/InterviewQuestionGenerator';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='flex h-screen bg-background'>
      {/* Sidebar */}
      <div className='w-20 border-r flex flex-col p-4 items-center'>
        <div className='flex-1'>
          <Image src='/logo.png' alt='Logo' width={32} height={32} />
          <div>Menu</div>
        </div>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className='w-80 border-r flex flex-col'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center'>
              <Hash className='h-4 w-4' />
            </div>
            <h2 className='font-semibold'>Conversation</h2>
            <Search className='h-4 w-4 ml-auto text-muted-foreground' />
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <LayoutGrid className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <ScrollArea className='flex-1'>
          <div className='p-4 space-y-4'>
            <div className='text-sm font-medium text-muted-foreground'>
              Recent
            </div>
            <div className='space-y-1'>
              <Button
                variant='ghost'
                className='w-full justify-start text-left font-normal'
              >
                Debugging Code Errors
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start text-left font-normal'
              >
                High Converting Financial Landing...
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start text-left font-normal'
              >
                Freelancer Payment Tracking Sol...
              </Button>
            </div>
            <div className='pt-4'>
              <div className='text-sm font-medium text-muted-foreground'>
                Collections
              </div>
              <div className='space-y-1 pt-2'>
                <Button
                  variant='ghost'
                  className='w-full justify-start text-left font-normal'
                >
                  Marketing
                </Button>
                <Button
                  variant='ghost'
                  className='w-full justify-start text-left font-normal group'
                >
                  <span>Branding</span>
                  <ChevronDown className='h-4 w-4 ml-auto opacity-0 group-hover:opacity-100' />
                </Button>
                <Button
                  variant='ghost'
                  className='w-full justify-start text-left font-normal'
                >
                  Website Design
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className='p-4 border-t'>
          <Button className='w-full justify-start gap-2' variant='ghost'>
            <MessageSquare className='h-4 w-4' />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        <div className='flex items-center gap-2 p-4 border-b'>
          <div className='ml-auto flex items-center gap-2'>
            <Button variant='ghost' size='sm'>
              CentralAI 2.0
              <ChevronDown className='h-4 w-4 ml-2' />
            </Button>
            <Button variant='default' size='sm' className='gap-2'>
              <Plus className='h-4 w-4' />
              New Chat
            </Button>
          </div>
        </div>
        <ScrollArea className='flex-1 p-4'>
          <InterviewQuestionsGenerator />
          {/* <div className='space-y-4 max-w-4xl mx-auto'> */}
          {/* Error Message */}
          {/* <div className='bg-black text-white p-4 rounded-lg'>
              I am getting the error: Cannot get strings.key_one because
              property key_one is missing in undefined[1]. [1] strings?:
              [string_key: string]: string; Tell me how to fix this
            </div> */}

          {/* Response */}
          {/* <div className='flex gap-4'>
              <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Hash className='h-4 w-4' />
              </div>
              <div className='space-y-4 flex-1'>
                <p>
                  This error occurs because you&apos;re trying to access the
                  property <code className='text-sm'>key_one</code> on an object
                  that is <code className='text-sm'>undefined</code>.
                </p>
                <p>
                  To fix this, you need to ensure that the object where{' '}
                  <code className='text-sm'>key_one</code> is supposed to exist
                  is defined before attempting to access the property.
                  Here&apos;s how you can debug and fix this:
                </p>
                <div>
                  <div className='font-medium'>Step to fix:</div>
                  <p>
                    1. Check if the object is defined: You need to ensure that
                    the object is not <code className='text-sm'>undefined</code>{' '}
                    before accessing its properties.
                  </p>
                </div>
                <div className='bg-muted rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='text-sm text-muted-foreground'>js</div>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Share className='h-4 w-4' />
                    </Button>
                  </div>
                  <pre className='text-sm'>
                    <code>{`if (strings && strings.key_one) {
  console.log(strings.key_one);  //Safely access key_one
} else {
  console.log("key_one is missing or strings is undefined");
}`}</code>
                  </pre>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </ScrollArea>
        {/* <div className='p-4 border-t'>
          <div className='max-w-4xl mx-auto flex gap-2'>
            <Input placeholder='Ask me anything...' className='flex-1' />
            <Button>Send</Button>
          </div>
          <div className='max-w-4xl mx-auto mt-2'>
            <p className='text-xs text-muted-foreground'>
              Centra may display inaccurate info, so please double check the
              response.{' '}
              <a href='#' className='underline'>
                Your Privacy & Centra AI
              </a>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
