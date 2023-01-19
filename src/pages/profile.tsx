import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";

export default function ProfilePage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <p>profile</p>
        </>
      }
    />
  );
}
