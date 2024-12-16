import ConfirmReservationForm from '@/components/confirm-reservation-form';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { JSX } from 'react';

export default async function Page(): Promise<JSX.Element> {
  const headersList = await headers();
  const referer = headersList.get('referer');
  const host = headersList.get('host');

  // 直リンクで確認画面にアクセスされた場合は入力画面にリダイレクトさせる
  if (!referer || !referer.includes(host ?? '')) {
    redirect('/reservations/new');
  }

  return <ConfirmReservationForm />;
}
