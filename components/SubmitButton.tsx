'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from './ui/button';

type SubmitButtonProps = {} & ButtonProps;
export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : props.children}
    </Button>
  );
};
