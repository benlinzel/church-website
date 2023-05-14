/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { client, urlFor } from '@/utils/SanityConfig';

const AboutUs = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          About Us
        </p>
        <div className="text-md mx-auto max-w-[900px] p-8 sm:text-lg">
          <p className="justify-center pb-8">
            Winona Gospel Church holds to the following statements:
          </p>
          <Link
            href="https://www.etsjets.org/files/documents/Chicago_Statement.pdf"
            className="text-2xl font-light text-amber-500 hover:underline"
          >
            1. The Chicago Statement on Biblical Inerrancy (1978)
          </Link>
          <p className="text-base font-normal italic">
            The following Statement affirms this inerrancy of Scripture afresh,
            making clear our understanding of it and warning against its denial.
            We are persuaded that to deny it is to set aside the witness of
            Jesus Christ and of the Holy Spirit and to refuse that submission to
            the claims of God's own Word which marks true Christian faith. We
            see it as our timely duty to make this affirmation in the face of
            current lapses from the truth of inerrancy among our fellow
            Christians and misunderstanding of this doctrine in the world at
            large.
          </p>
          <hr className="my-4 opacity-20" />
          <Link
            href="https://cbmw.org/about/danvers-statement/"
            className="text-2xl font-light text-amber-500 hover:underline"
          >
            2. The Danvers Statement (1988)
          </Link>
          <p className="text-base font-normal italic">
            The Danvers Statement summarizes the need for the Council on
            Biblical Manhood and Womanhood (CBMW) and serves as an overview of
            our core beliefs. This statement was prepared by several evangelical
            leaders at a CBMW meeting in Danvers, Massachusetts, in December of
            1987. It was first published in final form by the CBMW in Wheaton,
            Illinois in November of 1988.
          </p>
          <hr className="my-4 opacity-20" />
          <Link
            href="https://cbmw.org/nashville-statement/#preamble"
            className="text-2xl font-light text-amber-500 hover:underline"
          >
            3. The Nashville Statement (2017)
          </Link>
          <p className="text-base font-normal italic">
            We believe that God's design for his creation and his way of
            salvation serve to bring him the greatest glory and bring us the
            greatest good. God's good plan provides us with the greatest
            freedom. Jesus said he came that we might have life and have it in
            overflowing measure. He is for us and not against us. Therefore, in
            the hope of serving Christ's church and witnessing publicly to the
            good purposes of God for human sexuality revealed in Christian
            Scripture, we offer the following affirmations and denials.
          </p>
          <hr className="my-4 opacity-20" />
          <Link
            href="https://statementonsocialjustice.com/"
            className="text-2xl font-light text-amber-500 hover:underline"
          >
            4. The Statement on Social Justice & the Gospel (2018)
          </Link>
          <p className="text-base font-normal italic">
            In view of questionable sociological, psychological, and political
            theories presently permeating our culture and making inroads into
            Christ's church, we wish to clarify certain key Christian doctrines
            and ethical principles prescribed in God's Word. Clarity on these
            issues will fortify believers and churches to withstand an onslaught
            of dangerous and false teachings that threaten the gospel,
            misrepresent Scripture, and lead people away from the grace of God
            in Jesus Christ.
          </p>
          <p className="pt-1 text-base font-normal italic">
            Specifically, we are deeply concerned that values borrowed from
            secular culture are currently undermining Scripture in the areas of
            race and ethnicity, manhood and womanhood, and human sexuality. The
            Bible's teaching on each of these subjects is being challenged under
            the broad and somewhat nebulous rubric of concern for “social
            justice.” If the doctrines of God's Word are not uncompromisingly
            reasserted and defended at these points, there is every reason to
            anticipate that these dangerous ideas and corrupted moral values
            will spread their influence into other realms of biblical doctrines
            and principles.
          </p>
          {/* <p className="justify-center pt-12">
            Winona Gospel Church is affiliated with the{' '}
            <Link
              href="https://agcofcanada.com/"
              className="text-amber-500 hover:underline"
            >
              Association of Gospel Churches of Canada
            </Link>
          </p> */}
        </div>
      </div>
      <Footer siteSettings={props.siteSettings} />
    </div>
  );
};

export async function getStaticProps() {
  const siteSettings = await client
    .fetch(`*[_id == "siteSettings"]`)
    .then((settings) => {
      return settings[0];
    });

  return {
    props: {
      siteSettings,
    },
    revalidate: 60,
  };
}

export default AboutUs;
