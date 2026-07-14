export default function BrandLogo({ brand, size = 'md' }) {
  const sizes = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-20 w-20',
  }

  const logos = {
    dropbox: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#0061FF" d="M6 2l6 4 6-4v5l-6 4-6-4V2zm12 7l6 4-6 4-6-4 6-4zm-6 9l6 4 6-4v-5l-6-4-6 4v5zM0 13l6-4 6 4-6 4-6-4z" />
      </svg>
    ),
    gitlab: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#FC6D26" d="m12 22 10-7.5L12 2 2 14.5 12 22z" />
        <path fill="#E24329" d="M12 22 2 14.5l3.2-9.8L12 22z" />
        <path fill="#FC6D26" d="M12 22 18.8 4.7 22 14.5 12 22z" />
        <path fill="#FCA326" d="M12 22 5.2 4.7 2 14.5 12 22z" />
      </svg>
    ),
    bitbucket: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#2684FF" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h17A1.5 1.5 0 0 1 22 3.5v3.8c0 .5-.3 1-.7 1.3L14.6 18.2a2 2 0 0 1-3.2 0L2.7 8.6A1.5 1.5 0 0 1 2 7.3V3.5z" />
        <path fill="#fff" d="M9.5 11.5h5l1.2 4.5h-7.4l1.2-4.5z" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#3776AB" d="M12 2c-3.2 0-3 .5-3 1.7v1.6h3v.5H7.2C4.8 5.8 3 7.4 3 10.2c0 1.8.9 3 2.4 3.6-.3.5-.4 1.1-.4 1.8 0 1.5.8 2.6 2.4 3.1V22h2.1v-3.1c3.2-.2 5.5-1.5 5.5-4.9 0-2.3-1.4-3.5-3.8-4.1.3-.5.4-1 .4-1.7C11.6 5.1 10.8 4 9.2 3.5V2H12zm-1.1 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
        <path fill="#FFD43B" d="M12 22c3.2 0 3-.5 3-1.7v-1.6h-3v-.5h4.8c2.4 0 4.2-1.6 4.2-4.4 0-1.8-.9-3-2.4-3.6.3-.5.4-1.1.4-1.8 0-1.5-.8-2.6-2.4-3.1V2h-2.1v3.1c-3.2.2-5.5 1.5-5.5 4.9 0 2.3 1.4 3.5 3.8 4.1-.3.5-.4 1 .4 1.7 0 1.5-.8 2.6-2.4 3.1V22H12zm1.1-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    ),
    slack: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#E01E5A" d="M5.5 14.5A2.5 2.5 0 1 1 3 12H5.5v2.5zM6 12a2.5 2.5 0 1 1 5 0v6a2.5 2.5 0 1 1-5 0V12z" />
        <path fill="#36C5F0" d="M9.5 5.5A2.5 2.5 0 1 1 12 3v2.5H9.5zM12 6a2.5 2.5 0 1 1 0 5H6a2.5 2.5 0 1 1 0-5h6z" />
        <path fill="#2EB67D" d="M18.5 9.5A2.5 2.5 0 1 1 21 12H18.5V9.5zM18 12a2.5 2.5 0 1 1-5 0V6a2.5 2.5 0 1 1 5 0v6z" />
        <path fill="#ECB22E" d="M14.5 18.5A2.5 2.5 0 1 1 12 21v-2.5h2.5zM12 18a2.5 2.5 0 1 1 0-5h6a2.5 2.5 0 1 1 0 5h-6z" />
      </svg>
    ),
    firebase: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#FFCA28" d="M5.5 20 12 4l3.2 6.8L12 20H5.5z" />
        <path fill="#FFA000" d="M12 4 18.5 20H12V4z" />
        <path fill="#F57C00" d="M5.5 20 12 10.8 18.5 20H5.5z" />
      </svg>
    ),
    angular: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#DD0031" d="M12 2 3 5.2l1.4 12.1L12 22l7.6-4.7L21 5.2 12 2z" />
        <path fill="#fff" d="M12 5.2 7.2 16.2h2l.8-2.2h3.2l.8 2.2h2L12 5.2zm-.4 7.2 1.4-3.8 1.4 3.8H11.6z" />
      </svg>
    ),
    vue: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path fill="#41B883" d="M12 3 3 20h4.5l4.5-7.8L16.5 20H21L12 3z" />
        <path fill="#35495E" d="M12 8.2 8.8 14.2h6.4L12 8.2z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="#0084FF"
          d="M12 2C6.5 2 2 6.1 2 11.4c0 4.7 3.5 8.6 8.1 9.3v-6.6H7.4V11h2.7V9.1c0-2.7 1.6-4.2 4-4.2 1.2 0 2.4.2 2.4.2v2.6h-1.3c-1.3 0-1.7.8-1.7 1.6V11h3l-.5 2.7H13v6.6c4.6-.7 8.1-4.6 8.1-9.3C21.1 6.1 16.6 2 12 2z"
        />
      </svg>
    ),
  }

  return (
    <div className={`flex shrink-0 items-center justify-center rounded-xl bg-ink-50 ${sizes[size] || sizes.md}`}>
      {logos[brand] || logos.dropbox}
    </div>
  )
}
