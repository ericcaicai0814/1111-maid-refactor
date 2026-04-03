/** 「其他」選項的值 — schema 與 fields 共用 */
export const OTHER_OPTION_VALUE = '其他' as const;

/** 表單欄位定義 */
export interface FormField {
  name: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'radio' | 'checkbox' | 'date';
  label: string;
  required: boolean;
  placeholder?: string;
}

/** 選項定義（Radio / Checkbox 共用） */
export interface SelectOption {
  value: string;
  label: string;
  hasCustomInput?: boolean;
}

export type RadioOption = SelectOption;
export type CheckboxOption = SelectOption;

/** 稱謂 radio 選項 */
export const titleOptions: RadioOption[] = [
  { value: '父', label: '父' },
  { value: '母', label: '母' },
  { value: OTHER_OPTION_VALUE, label: OTHER_OPTION_VALUE, hasCustomInput: true },
];

/** 家庭狀況 checkbox 選項 */
export const familyStatusOptions: CheckboxOption[] = [
  {
    value: 'rare-disease',
    label:
      '家中育有 1 名未滿 12 歲之罕見疾病兒童、身心障礙兒童、或具特殊境遇之兒童。',
  },
  {
    value: 'developmental-delay',
    label: '家中育有 1 名未滿 6 歲之發展遲緩兒童。',
  },
  {
    value: 'disabled-parent-or-single',
    label:
      '家中 1 名未滿 12 歲兒童，且家長為領有身心障礙證明或為單親家庭。',
  },
  {
    value: 'multiple-children',
    label:
      '2 名未滿 12 歲兒童中含 1 名未滿 6 歲者，或 3 名以上未滿 12 歲兒童。',
  },
  { value: 'none', label: '都沒有' },
];

/** 國籍偏好 checkbox 選項 */
export const nationalityOptions: CheckboxOption[] = [
  { value: '泰國', label: '泰國' },
  { value: '菲律賓', label: '菲律賓' },
  { value: '印尼', label: '印尼' },
  { value: '不指定', label: '不指定' },
  { value: OTHER_OPTION_VALUE, label: OTHER_OPTION_VALUE, hasCustomInput: true },
];

/** 聯絡時段 checkbox 選項 */
export const contactTimeOptions: CheckboxOption[] = [
  { value: 'morning', label: '平日上午(09:00-12:00)' },
  { value: 'noon', label: '平日中午(12:00-13:30)' },
  { value: 'evening', label: '平日晚上(19:00-22:00)' },
  { value: OTHER_OPTION_VALUE, label: OTHER_OPTION_VALUE, hasCustomInput: true },
];

/** 完整表單欄位定義 */
export const formFields: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: '申請人大名',
    required: true,
  },
  {
    name: 'title',
    type: 'radio',
    label: '稱謂',
    required: true,
  },
  {
    name: 'childrenCount',
    type: 'number',
    label: '有幾位12歲以下小朋友？',
    required: true,
  },
  {
    name: 'childAge',
    type: 'number',
    label: '小朋友的年齡',
    required: true,
  },
  {
    name: 'childBirthdays',
    type: 'date',
    label: '小朋友出生年月日',
    required: true,
    placeholder: '請選擇出生年月日',
  },
  {
    name: 'familyStatus',
    type: 'checkbox',
    label: '家庭狀況',
    required: true,
  },
  {
    name: 'address',
    type: 'text',
    label: '戶籍所在地或是聯絡地址',
    required: true,
  },
  {
    name: 'nationalityPreference',
    type: 'checkbox',
    label: '幫傭國籍偏好',
    required: true,
  },
  {
    name: 'phone',
    type: 'tel',
    label: '手機號碼',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    name: 'company',
    type: 'text',
    label: '服務單位',
    required: true,
  },
  {
    name: 'jobTitle',
    type: 'text',
    label: '職稱',
    required: true,
  },
  {
    name: 'contactTime',
    type: 'checkbox',
    label: '方便聯絡時段',
    required: true,
  },
];
