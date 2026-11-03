import MinistryPage, { getMinistryStaticProps } from "@/components/MinistryPage";

const ChildrensMinistry = (props: any) => <MinistryPage {...props} />;

export const getStaticProps = getMinistryStaticProps("childrensMinistry");

export default ChildrensMinistry;
