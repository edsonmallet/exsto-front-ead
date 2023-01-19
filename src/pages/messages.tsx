import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";

export default function MyMessagesPage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <p>messages</p>
        </>
      }
    />
  );
}
