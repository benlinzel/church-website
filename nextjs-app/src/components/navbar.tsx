import Link from 'next/link';

const Navbar = (props: any) => {
  return (
    <div className="mx-auto flex h-16 max-w-[1200px] flex-row items-center justify-between p-4 sm:h-28">
      {props.logoUrl && (
        <Link href="/">
          <img src={props.logoUrl} alt="logo" className="w-16 sm:w-28"></img>
        </Link>
      )}
      <ul className="z-20 flex flex-row">
        {' '}
        {/* <li className="group relative">
          <p>About</p>
          <div className="absolute -right-6 hidden w-28 rounded-lg bg-black/40 p-2 group-hover:block">
            <ul className="top-0 space-y-2">
              <li>
                <Link href="/our-values" className="text-white">
                  Our Values
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-white">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="group relative">
          <p>Ministries</p>
          <div className="absolute -right-6 hidden w-28 rounded-lg bg-black/40 p-2 group-hover:block">
            <ul className="top-0 space-y-2">
              <li>
                <Link
                  href="small-groups"
                  className="whitespace-nowrap text-white"
                >
                  Small Groups
                </Link>
              </li>
              <li>
                <Link href="missions" className="whitespace-nowrap text-white">
                  Missions
                </Link>
              </li>
              <li>
                <Link
                  href="https://wgc-library.vercel.app/"
                  className="text-white"
                >
                  Library
                </Link>
              </li>
              <li>
                <Link href="/giving" className="text-white">
                  Giving
                </Link>
              </li>
            </ul>
          </div>
        </li> */}
        <li>
          <span className="group relative inline-block text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.7)]">
            <button className="inline-flex items-center rounded px-4 font-normal group-hover:text-amber-500">
              About
            </button>
            <ul className="absolute left-0 hidden w-48 pt-1 group-hover:block ">
              <li className="">
                <Link
                  className="whitespace-no-wrap block rounded-t-md bg-stone-800 px-4 py-2 text-white hover:bg-stone-700  hover:text-amber-500"
                  href="/about-us"
                >
                  About WGC
                </Link>
              </li>
              {/* <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 py-2 px-4 text-white hover:to-stone-600 hover:text-amber-500"
                  href="/our-values"
                >
                  Our Values (remove)
                </Link>
              </li> */}
              <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 px-4 py-2 text-white hover:bg-stone-700  hover:text-amber-500"
                  href="/what-we-believe"
                >
                  What We Believe
                </Link>
              </li>
              <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 px-4 py-2 text-white hover:bg-stone-700  hover:text-amber-500"
                  href="/our-team"
                >
                  Our Team
                </Link>
              </li>
              <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 px-4 py-2 text-white hover:bg-stone-700   hover:text-amber-500"
                  href="/giving"
                >
                  Giving
                </Link>
              </li>
              <li className="">
                <Link
                  className="whitespace-no-wrap block rounded-b-md border-t border-white/20 bg-stone-800 px-4 py-2 text-right text-white hover:bg-stone-700   hover:text-amber-500"
                  href="https://agcofcanada.com/"
                >
                  Denomination →
                </Link>
              </li>
            </ul>
          </span>
        </li>
        <li>
          <span className="group relative inline-block text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.7)]">
            <button className="inline-flex items-center rounded px-4 font-normal group-hover:text-amber-500">
              Ministries
            </button>
            <ul className="absolute right-0 hidden w-48 pt-1 text-base group-hover:block">
              <li className="">
                <Link
                  className="whitespace-no-wrap block rounded-t-md bg-stone-800 px-4 py-2 text-white hover:bg-stone-700   hover:text-amber-500"
                  href="/youth-ministry"
                >
                  Youth Ministry
                </Link>
              </li>
              <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 px-4 py-2 text-white hover:bg-stone-700   hover:text-amber-500"
                  href="/childrens-ministry"
                >
                  Children&apos;s Ministry
                </Link>
              </li>
              <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 px-4 py-2 text-white hover:bg-stone-700   hover:text-amber-500"
                  href="/small-groups"
                >
                  Small Groups
                </Link>
              </li>
              {/* <li className="">
                <Link
                  className="whitespace-no-wrap block bg-stone-800 py-2 px-4 text-white hover:bg-stone-700   hover:text-amber-500"
                  href="/missions"
                >
                  Missions
                </Link>
              </li> */}
              <li className="">
                <Link
                  className="whitespace-no-wrap block rounded-b-md border-t border-white/20 bg-stone-800 px-4 py-2 text-right text-white hover:bg-stone-700   hover:text-amber-500"
                  href="https://wgc-library.vercel.app/"
                >
                  Library →
                </Link>
              </li>
            </ul>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
