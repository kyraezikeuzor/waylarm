import Image from "next/image";
import HomePage from '@/components/home'

export default function Home() {
  return (
    <main className="flex flex-col p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HomePage/>
    </main>
  );
}
