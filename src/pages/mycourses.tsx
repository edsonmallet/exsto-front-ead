import { Header } from "../components/Header";
import { PrivatePageTemplate } from "../components/PrivatePageTemplate";

export default function MyCoursePage() {
  return (
    <PrivatePageTemplate
      header={<Header />}
      main={
        <>
          <p>my courses</p>
        </>
      }
    />
  );
}
