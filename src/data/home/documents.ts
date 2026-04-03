/** 申請文件項目 */
export interface DocumentItem {
  category: string;
  content: string;
  subItems?: string[];
}

/** 必備申請文件 */
export const requiredDocuments: DocumentItem[] = [
  {
    category: '基本身分證明',
    content: '雇主身分證影本、含被看護者（子女）之戶口名簿影本。',
  },
  {
    category: '國內求才證明',
    content:
      '需先向公立就業服務機構辦理國內招募（招募期約 7 天），確認無合適本國保母或管家後，取得「求才證明書」。',
  },
  {
    category: '特殊身分證明（若欲申請就安費減免）',
    content: '',
    subItems: [
      '身心障礙手冊影本（子女或家長）。',
      '醫院開立之發展遲緩證明或罕見疾病證明。',
      '單親家庭相關證明文件。',
    ],
  },
  {
    category: '審查費收據',
    content: '繳交給勞動部的 200 元審查費收據。',
  },
];
