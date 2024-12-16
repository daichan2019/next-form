import FormProvider from '@/components/form-provider';
import type { JSX, ReactNode } from 'react';
type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps): Promise<JSX.Element> {
  const defaultValues = {
    name: '',
    email: '',
    date: new Date(),
    startTime: '',
    endTime: '',
  };

  return <FormProvider defaultValues={defaultValues}>{children}</FormProvider>;
}
