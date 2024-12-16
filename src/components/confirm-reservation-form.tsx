'use client';
import createReservation from '@/actions/reservations/create/create-reservation';
import type { FormData } from '@/actions/reservations/create/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, type JSX } from 'react';
import { useFormContext } from 'react-hook-form';
export default function ConfirmReservationForm(): JSX.Element {
  const form = useFormContext<FormData>();
  const values = form.getValues();
  const router = useRouter();

  const onSubmit = form.handleSubmit(async (data) => {
    await createReservation(data);
  });

  useEffect(() => {
    if (Object.keys(values).length === 0) {
      router.push('/reservations/new');
    }
  }, [values, router]);

  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle>予約内容の確認</CardTitle>
        <CardDescription>入力した内容をご確認ください</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 items-center">
          <div className="font-medium">お名前</div>
          <div className="col-span-3">{values.name}</div>
        </div>
        <div className="grid grid-cols-4 items-center">
          <div className="font-medium">メールアドレス</div>
          <div className="col-span-3">{values.email}</div>
        </div>
        <div className="grid grid-cols-4 items-center">
          <div className="font-medium">予約日</div>
          <div className="col-span-3">{values.date ? format(values.date, 'yyyy年MM月dd日') : ''}</div>
        </div>
        <div className="grid grid-cols-4 items-center">
          <div className="font-medium">時間</div>
          <div className="col-span-3">
            {values.startTime} 〜 {values.endTime}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          戻る
        </Button>
        <Button onClick={() => onSubmit()}>予約を確定する</Button>
      </CardFooter>
    </Card>
  );
}
