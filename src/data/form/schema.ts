import { z } from 'zod';
import { OTHER_OPTION_VALUE } from './fields';

/** 申請表單 Zod Schema */
export const ApplicationFormSchema = z
  .object({
    /** 申請人大名 */
    name: z.string().min(1, '請輸入申請人大名'),

    /** 稱謂 */
    title: z.enum(['父', '母', '其他'], {
      message: '請選擇稱謂',
    }),

    /** 自訂稱謂（當 title 為「其他」時必填） */
    customTitle: z.string().optional(),

    /** 12 歲以下小朋友人數 */
    childrenCount: z
      .number({ message: '請輸入數字' })
      .int()
      .min(1, '至少 1 位'),

    /** 小朋友年齡 */
    childAge: z
      .number({ message: '請輸入數字' })
      .int()
      .min(0, '年齡不可為負數')
      .max(12, '須為 12 歲以下'),

    /** 小朋友出生年月日（repeater，至少 1 筆） */
    childBirthdays: z
      .array(z.string().min(1, '請選擇出生年月日'))
      .min(1, '至少填寫一位小朋友的出生年月日'),

    /** 家庭狀況（至少勾選 1 項） */
    familyStatus: z
      .array(z.string())
      .min(1, '請至少勾選一項家庭狀況'),

    /** 戶籍所在地或聯絡地址 */
    address: z.string().min(1, '請輸入地址'),

    /** 幫傭國籍偏好（至少勾選 1 項） */
    nationalityPreference: z
      .array(z.string())
      .min(1, '請至少勾選一項國籍偏好'),

    /** 自訂國籍（當勾選「其他」時必填） */
    customNationality: z.string().optional(),

    /** 手機號碼 */
    phone: z
      .string()
      .regex(/^09\d{8}$/, '請輸入有效的手機號碼（09 開頭，共 10 碼）'),

    /** Email */
    email: z.string().email('請輸入有效的 Email'),

    /** 服務單位 */
    company: z.string().min(1, '請輸入服務單位'),

    /** 職稱 */
    jobTitle: z.string().min(1, '請輸入職稱'),

    /** 方便聯絡時段（至少勾選 1 項） */
    contactTime: z
      .array(z.string())
      .min(1, '請至少勾選一項聯絡時段'),

    /** 自訂聯絡時段（當勾選「其他」時必填） */
    customContactTime: z.string().optional(),
  })
  .check((ctx) => {
    const data = ctx.value;

    /** 當選擇「其他」時，對應的自訂欄位為必填 */
    const requireCustom = (
      hasOther: boolean,
      value: string | undefined,
      path: string,
      message: string,
    ) => {
      if (hasOther && !value) {
        ctx.issues.push({ code: 'custom', path: [path], message, input: data });
      }
    };

    requireCustom(data.title === OTHER_OPTION_VALUE, data.customTitle, 'customTitle', '請輸入稱謂');
    requireCustom(data.nationalityPreference.includes(OTHER_OPTION_VALUE), data.customNationality, 'customNationality', '請輸入國籍');
    requireCustom(data.contactTime.includes(OTHER_OPTION_VALUE), data.customContactTime, 'customContactTime', '請輸入聯絡時段');

    /** childrenCount 與 childBirthdays.length 交叉驗證 */
    if (data.childBirthdays.length !== data.childrenCount) {
      ctx.issues.push({
        code: 'custom',
        path: ['childBirthdays'],
        message: `出生年月日筆數（${data.childBirthdays.length}）須與小朋友人數（${data.childrenCount}）相符`,
        input: data,
      });
    }
  });

/** 表單資料型別 */
export type ApplicationFormData = z.infer<typeof ApplicationFormSchema>;
