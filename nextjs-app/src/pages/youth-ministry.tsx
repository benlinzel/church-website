import MinistryPage, { getMinistryStaticProps } from "@/components/MinistryPage";

const YouthMinistry = (props: any) => <MinistryPage {...props} />;

export const getStaticProps = getMinistryStaticProps("youthMinistry");

export default YouthMinistry;
