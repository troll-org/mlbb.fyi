import Footer from "@/components/footer";
import HomeBanner from "@/components/home-banner";
import HomeBento from "@/components/home-bento";

export default async function Home() {
  return (
    <>
      <HomeBanner />
      <Footer />
      <HomeBento />
    </>
  );
}
