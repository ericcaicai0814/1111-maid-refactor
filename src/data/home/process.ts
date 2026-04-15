/** 申請流程步驟 */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  emphasis?: string;
}

/** 申請流程（6 步驟） */
export const applicationSteps: ProcessStep[] = [
  {
    step: 1,
    title: '符合申請條件資格',
    description: '家中有 1 名未滿 12 歲兒童',
  },
  {
    step: 2,
    title: '辦理國內求才登記',
    description: '無法聘雇到本國籍幫傭',
  },
  {
    step: 3,
    title: '向公立就服機構申請開具求才證明',
    description: '求才證明有效期為 90 天。',
  },
  {
    step: 4,
    title: '向勞動部申請並取得招募許可',
    description: '資格審核約 7 天，招募效期為 9 個月。',
  },
  {
    step: 5,
    title: '自國外引進或接續聘僱移工',
    description: '自入境日起 3 日內辦理通報，或承接移工日起 3 日內。',
  },
  {
    step: 6,
    title: '向勞動部申請並取得聘僱許可',
    description: '自入境或接續日起 15 日內辦理聘僱許可。',
  },
];
