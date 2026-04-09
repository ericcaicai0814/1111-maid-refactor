/** Valid form submission data for happy path */
export const validFormData = {
  name: '王小明',
  title: '父' as const,
  childrenCount: 1,
  childAge: 5,
  childBirthday: '2020-03-15',
  familyStatus: 'multiple-children',
  address: '台北市信義區信義路五段7號',
  nationality: '菲律賓',
  phone: '0912345678',
  email: 'test@example.com',
  company: '測試公司',
  jobTitle: '工程師',
  contactTime: 'morning',
};

/** Minimal required fields (to verify submit button enablement) */
export const minimalFormData = {
  name: '李大華',
  title: '母' as const,
  childrenCount: 1,
  childAge: 3,
  childBirthday: '2022-06-01',
  familyStatus: 'rare-disease',
  address: '高雄市三民區',
  nationality: '泰國',
  phone: '0987654321',
  email: 'minimal@example.com',
  company: '最小公司',
  jobTitle: '會計師',
  contactTime: 'evening',
};
