export default function Layout({ children }: {children: any}) {
  return (
    <>
      <main className="bg-zinc-900 text-zinc-100 min-h-screen">{children}</main>
    </>
  )
}