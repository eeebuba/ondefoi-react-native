import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>;
};

export default function RHFProvider({ children, methods }: Props) {
  return <FormProvider {...methods}>{children}</FormProvider>;
}
