import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  date: z.date({ required_error: '日付を選択してください' }),
  startTime: z.string().min(1, { message: '開始時間を選択してください' }),
  endTime: z.string().min(1, { message: '終了時間を選択してください' }),
});

export type FormData = z.infer<typeof schema>;
