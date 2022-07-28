import Banner from "components/Banner";
import CardList from "components/card/CardList";
import FilterMenu from "components/filter/Filter";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CodingUI - Get your free UI components with single click</title>
      </Head>
      <main className="px-5 mx-auto max-w-7xl">
        <Banner></Banner>
        <FilterMenu></FilterMenu>
        <CardList></CardList>
      </main>
    </>
  );
}
