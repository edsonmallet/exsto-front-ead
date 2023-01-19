import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";

export default function HomePage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <p>list courses</p>
        </>
      }
    />
  );
}
