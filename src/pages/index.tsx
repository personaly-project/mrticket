/** @format */
import SearchFeature from "@/components/SearchFeataure";
import { GetServerSideProps } from "next";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main>
        <Link href={`/ticket/05c4af58-389d-408b-a017-6725d4b97766`}>
          see ticket
        </Link>
      </main>
      <SearchFeature />
    </>
  );
}
