import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "وول ستريت إنجليش السعودية | دورات إنجليزي للتوظيف والعمل",
  description: "تعلم الإنجليزية للتوظيف والعمل مع وول ستريت إنجليش السعودية. دورات متخصصة للمهنيين ورجال الأعمال. مصطلحات تجارية وتقنية لتعزيز فرص النجاح المهني.",
  keywords: "انجليزي للتوظيف, دورات انجليزي للأعمال, تعلم الإنجليزية للمقابلات, انجليزي للتقدم الوظيفي, انجليزي للاعمال التجارية, كورس انجليزي للشركات, لغة انجليزية للسيرة الذاتية, وول ستريت انجليش السعودية"
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" 
        rel="stylesheet" 
      />
      {children}
    </>
  );
} 