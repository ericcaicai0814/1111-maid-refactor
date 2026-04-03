/** 政策亮點項目 */
export interface PolicyHighlight {
  icon: 'check' | 'clock';
  text: string;
  highlight: string;
}

/** 新制政策亮點資料 */
export const newPolicyItems: PolicyHighlight[] = [
  {
    icon: 'check',
    text: '只要家中有1 名未滿 12 歲兒童即可申請。',
    highlight: '1 名未滿 12 歲兒童',
  },
  {
    icon: 'check',
    text: '每月須繳交就業安定費5,000 元。',
    highlight: '5,000 元',
  },
  {
    icon: 'check',
    text: '罕病或特殊境遇家庭或單親/身障家長可降為2,000 元。',
    highlight: '2,000 元',
  },
  {
    icon: 'clock',
    text: '115 年 4 月 13 日起正式開放申請。',
    highlight: '115 年 4 月 13 日起',
  },
];
