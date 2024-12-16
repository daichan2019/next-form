'use client';
import { schema, type FormData } from '@/actions/reservations/create/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX, ReactNode } from 'react';
import { FormProvider as RhfFormProvider, useForm } from 'react-hook-form';

export type FormProviderProps = {
  children: ReactNode;
  defaultValues: FormData;
};

export default function FormProvider({ children, defaultValues }: FormProviderProps): JSX.Element {
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  return <RhfFormProvider {...methods}>{children}</RhfFormProvider>;
}
