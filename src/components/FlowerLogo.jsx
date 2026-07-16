export default function FlowerLogo({ className = 'h-[30px] w-[30px] shrink-0', ...props }) {
  return (
    <img
      src="/flower-logo.svg"
      alt=""
      width={30}
      height={30}
      className={className}
      {...props}
    />
  )
}
