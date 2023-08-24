interface SettingsSubtitleProps {
  className: string
  children: string
}

export const SettingsSubtitle = ({ className, children }: SettingsSubtitleProps) => {
  return (
    <h3 className={`${className} text-center text-[12px] uppercase tracking-[4px] md:text-left md:text-[13px]`}>
      {children}
    </h3>
  )
}
