import Image from 'next/image';

export function HeroBanner() {
  return (
    <>
      {/* Banner 圖卡 */}
      <div className="rounded-2xl border border-[#d8d3f0] bg-white shadow-[0_10px_30px_rgba(61,55,142,0.08)]">
        <Image
          src="/images/250326_家庭幫傭.jpg"
          alt="外籍家庭幫傭申請資格說明橫幅"
          width={1100}
          height={305}
          className="h-auto w-full rounded-2xl"
          priority
        />
      </div>

      {/* 頁面主標題 */}
      <div className="mt-10">
        <h1 className="text-center text-[2rem] font-extrabold tracking-[-0.03em] text-[#3d378e] md:text-[2.35rem]">
          2026政府放寬新制！家有12歲以下如何申請外籍幫傭？
        </h1>
      </div>
    </>
  );
}
