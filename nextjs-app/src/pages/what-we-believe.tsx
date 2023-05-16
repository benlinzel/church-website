import { PortableText } from '@portabletext/react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { client, myPortableTextComponents, urlFor } from '@/utils/SanityConfig';

const WhatWeBelieve = (props: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-stone-900 to-stone-800 font-Raleway text-white/90">
      <div className="h-full">
        <Navbar logoUrl={urlFor(props.siteSettings.logo).width(600).url()} />
      </div>
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 pb-16 text-white/80">
        <p className="pt-4 text-center text-4xl font-semibold text-white md:text-5xl">
          What We Believe
        </p>
        <div className="mx-auto max-w-[900px] space-y-4 px-8 pb-8">
          {/* <p className="pt-8 text-3xl text-white">Doctrinal Statement</p>
          <p className="text-base font-normal">
            <span className="text-2xl font-light text-amber-500">I</span>
            <p>
              God, who is Himself Truth and speaks truth only, has inspired Holy
              Scripture in order thereby to reveal Himself to lost mankind
              through Jesus Christ as Creator and Lord, Redeemer and Judge. Holy
              Scripture is God&apos;s witness to Himself.
            </p>
          </p>
          <p className="text-base font-normal">
            <span className="text-2xl font-light text-amber-500">II</span>
            <p>
              Holy Scripture, being God&apos;s own Word, written by men prepared
              and superintended by His Spirit, is of infallible divine authority
              in all matters upon which it touches: it is to be believed, as
              God&apos;s instruction, in all that it affirms, obeyed, as
              God&apos;s command, in all that it requires; embraced, as
              God&apos;s pledge, in all that it promises.
            </p>
          </p>
          <p className="text-base font-normal">
            <span className="text-2xl font-light text-amber-500">III</span>
            <p>
              The Holy Spirit, Scripture&apos;s divine Author, both
              authenticates it to us by His inward witness and opens our minds
              to understand its meaning.
            </p>
          </p>
          <p className="text-base font-normal">
            <span className="text-2xl font-light text-amber-500">IV</span>
            <p>
              Being wholly and verbally God-given, Scripture is without error or
              fault in all its teaching, no less in what it states about
              God&apos;s acts in creation, about the events of world history,
              and about its own literary origins under God, than in its witness
              to God&apos;s saving grace in individual lives.
            </p>
          </p>
          <p className="text-base font-normal">
            <span className="text-2xl font-light text-amber-500">V</span>
            <p>
              The authority of Scripture is inescapably impaired if this total
              divine inerrancy is in any way limited or disregarded, or made
              relative to a view of truth contrary to the Bible&apos;s own; and
              such lapses bring serious loss to both the individual and the
              Church.
            </p>
          </p> */}
          <p className="pt-8 text-3xl text-white">
            21 Articles of Faith and Doctrine
          </p>
          {props.faithArticles
            .filter((faithArticle: any) => faithArticle.title)
            .map((faithArticle: any, index: number) => {
              return (
                <div
                  key={`${faithArticle.order}-${faithArticle.title}`}
                  className="py-4"
                >
                  <p className="text-2xl font-light text-amber-500">
                    {faithArticle.title}
                  </p>
                  <PortableText
                    value={faithArticle.body}
                    components={myPortableTextComponents}
                  />
                  {index + 1 !== props.faithArticles.length && (
                    <hr className="mt-8 opacity-20" />
                  )}
                </div>
              );
            })}
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
  const faithArticles = await client.fetch(
    `*[_type == "faithArticle"] | order(order asc)`
  );
  return {
    props: {
      siteSettings,
      faithArticles,
    },
    revalidate: 60,
  };
}

export default WhatWeBelieve;
