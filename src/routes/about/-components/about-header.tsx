type AboutHeaderProps = {
  eyebrow: string
  title: string
}
export function AboutHeader({ eyebrow, title }: AboutHeaderProps) {
  return (
    <header className="border-b border-[rgba(17,17,15,0.18)] pb-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b7254]">
        {eyebrow}
      </p>
      <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-[#11110f]">
        {title}
      </h1>
    </header>
  )
}
