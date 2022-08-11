import Banner from "components/Banner";
import CardList from "components/card/CardList";
import FilterMenu from "components/filter/Filter";
import LayoutMain from "components/layout/LayoutMain";
import useFetchCards from "hooks/useFetchCards";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CodingUI - Get your free UI components with single click</title>
      </Head>
      <LayoutMain>
        <FilterMenu></FilterMenu>
        <CardList></CardList>
      </LayoutMain>
    </>
  );
}
