// Inline SVG icons — zero bundle cost
export const IconReact = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.5" fill={color}/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(120 12 12)"/>
  </svg>
);
export const IconJavascript = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><rect width="24" height="24" fill="#F7DF1E" rx="2"/><path d="M6 17.5c.6 1 1.4 1.5 2.6 1.5 1.4 0 2.4-.7 2.4-2V10H9v7c0 .5-.3.8-.8.8-.5 0-.8-.3-1.1-.8L6 17.5zm7.5-.2c.7 1.1 1.7 1.7 3.2 1.7 1.7 0 2.8-.9 2.8-2.1 0-1.3-.8-1.8-2.1-2.4l-.7-.3c-.7-.3-1-.5-1-.9 0-.4.3-.6.8-.6.5 0 .8.2 1.1.7l1.4-.9C18.3 11.5 17.4 11 16.2 11c-1.6 0-2.6.9-2.6 2.1 0 1.2.8 1.8 1.9 2.3l.7.3c.7.3 1.1.5 1.1 1 0 .5-.4.8-1 .8-.8 0-1.2-.4-1.6-1l-1.2.8z" fill="#000"/></svg>
);
export const IconTypescript = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><rect width="24" height="24" fill="#3178C6" rx="2"/><path d="M14 10h-2.5v7H10v-7H7.5V8.5H14V10zm1.5 4.5c.2.5.7.8 1.3.8.6 0 1-.3 1-.7 0-.5-.4-.7-1.1-.9l-.4-.2c-1-.4-1.6-.9-1.6-1.9 0-1.1.9-1.8 2.1-1.8.9 0 1.6.4 2 1l-1 .7c-.2-.4-.5-.6-1-.6-.5 0-.8.2-.8.6 0 .4.3.6.9.8l.4.2c1.1.4 1.7.9 1.7 2 0 1.2-.9 1.9-2.2 1.9-1.1 0-1.9-.5-2.3-1.3l1-.6z" fill="#fff"/></svg>
);
export const IconHtml = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16.5L12 21l-6.5-1.5L4 3z" fill="#E34F26"/><path d="M12 5.5v13l4.5-1.3 1.3-14.2H12z" fill="#EF652A"/><path d="M12 11H9l-.2-2.5H12V6H8.5l.5 6h3v2.5l-2.5-.8-.2-1.7H7l.4 4 4.6 1.3V11zm.5-5v2.5h2.7l-.2 3.3H12V14l3.5-1 .5-7H12z" fill="#fff"/></svg>
);
export const IconCss = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16.5L12 21l-6.5-1.5L4 3z" fill="#1572B6"/><path d="M12 5.5v13l4.5-1.3 1.3-14.2H12z" fill="#33A9DC"/><path d="M8.5 13.5l.2 2 3.3.9 3.3-.9.4-4H12v2h2.3l-.2 1.8-2.1.6-2.1-.6-.1-1.8H8.5zm.4-3.5H16l.2-2.5H8.8L9 10z" fill="#fff"/></svg>
);
export const IconTailwind = ({ size = 20, color = "#06B6D4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.44 10.9 14.6 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.56 7.1 14.4 6 12 6zM7 12C4.33 12 2.67 13.33 2 16c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.44 16.9 9.6 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.56 13.1 9.4 12 7 12z"/></svg>
);
export const IconPhp = ({ size = 20, color = "#777BB4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6" fill="none" stroke={color} strokeWidth="1.5"/><path d="M8 10h2.5c1 0 1.5.5 1.5 1.5S11.5 13 10.5 13H9v2H8v-5zm1 2h1.3c.4 0 .7-.2.7-.5s-.3-.5-.7-.5H9v1zm4-2h2.5c1 0 1.5.5 1.5 1.5S16.5 13 15.5 13H14v2h-1v-5zm1 2h1.3c.4 0 .7-.2.7-.5s-.3-.5-.7-.5H14v1z" fill={color}/></svg>
);
export const IconLaravel = ({ size = 20, color = "#FF2D20" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M22.6 7.3L17.5 4a1 1 0 00-1 0L12 7l-4.5-3a1 1 0 00-1 0L1.4 7.3a1 1 0 00-.4.9v7a1 1 0 00.5.9L7 19.4v2.9a1 1 0 001.5.9L12 21l3.5 2.2a1 1 0 001.5-.9v-2.9l5.5-3.3a1 1 0 00.5-.9v-7a1 1 0 00-.4-.8z"/></svg>
);
export const IconApi = ({ size = 20, color = "#06B6D4" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M8 9l3 3-3 3M13 15h3"/><rect x="3" y="4" width="18" height="16" rx="2"/></svg>
);
export const IconMysql = ({ size = 20, color = "#4479A1" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C7 2 3 4.7 3 8v8c0 3.3 4 6 9 6s9-2.7 9-6V8c0-3.3-4-6-9-6zm0 2c4.4 0 7 2 7 4s-2.6 4-7 4-7-2-7-4 2.6-4 7-4zm0 16c-4.4 0-7-2-7-4v-2c1.6 1.3 4 2 7 2s5.4-.7 7-2v2c0 2-2.6 4-7 4z"/></svg>
);
export const IconMongodb = ({ size = 20, color = "#47A248" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C9 2 6 6 6 10c0 3 1.5 5.5 3.5 7l.5 5h4l.5-5C16.5 15.5 18 13 18 10c0-4-3-8-6-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>
);
export const IconPostgres = ({ size = 20, color = "#336791" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 12c-2.7 0-5-1.3-6.5-3.3C7 14.5 9.3 14 12 14s5 .5 6.5 1.7C17 17.7 14.7 19 12 19z"/></svg>
);
export const IconGit = ({ size = 20, color = "#F05032" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.1 10.9L13.1.9a2.9 2.9 0 00-4.1 0L6.9 3l2.6 2.6c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.5 2.5c.6-.2 1.3-.1 1.8.4a1.9 1.9 0 010 2.7 1.9 1.9 0 01-2.7 0c-.5-.5-.6-1.3-.4-1.9L10.4 9v6.2c.2.1.4.2.5.4a1.9 1.9 0 010 2.7 1.9 1.9 0 01-2.7 0 1.9 1.9 0 010-2.7c.2-.2.4-.3.6-.4V8.9a2 2 0 01-.6-.4 1.9 1.9 0 01-.4-2L5.3 4 .9 8.4a2.9 2.9 0 000 4.1l10 10c1.1 1.1 2.9 1.1 4.1 0l8.1-8.1c1.1-1.1 1.1-2.9 0-4.1z"/></svg>
);
export const IconGithub = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
);
export const IconLinkedin = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
export const IconInstagram = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke={color} strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill={color}/></svg>
);
export const IconFacebook = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
export const IconWhatsapp = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);
export const IconEmail = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
);
export const IconFigma = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/><path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/><path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/><path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/><path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/></svg>
);
export const IconDocker = ({ size = 20, color = "#2496ED" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M13.5 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7.5zm3-3h2v2h-2zm3 0h2v2h-2zM22 11c-.2-1.3-1-2-1.8-2.4-.8-.4-1.8-.5-2.7-.3-.4-1.3-1.4-2.3-2.8-2.3H5.3C3.4 6 2 7.4 2 9.3v2.2c0 .3 0 .5.1.8C1.5 13 1 14.2 1 15.5 1 18 3 20 5.5 20h13c3 0 5-1.8 5-4.5 0-1.8-1-3.3-1.5-4.5z"/></svg>
);
export const IconPostman = ({ size = 20, color = "#FF6C37" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 7.5l-5 5-2-2 1.5-1.5.5.5 3.5-3.5 1.5 1.5z"/></svg>
);
export const IconFramer = ({ size = 20, color = "#0055FF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>
);
export const IconVite = ({ size = 20, color = "#646CFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M21 3L13 21l-2-8-8-2 18-8z"/></svg>
);
export const IconVercel = ({ size = 20, color = "#000000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2L2 19.5h20L12 2z"/></svg>
);
export const IconNodejs = ({ size = 20, color = "#339933" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l7 3.9v7.6l-7 3.9-7-3.9V8.2l7-3.9z"/></svg>
);
export const IconExpress = ({ size = 20, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M24 18.6c-2.3.5-3.7-.3-4.9-2L15 11.4l-.6-.8-4.8 6.4c-1.2 1.6-2.5 2.3-4.6 2l6.2-8.3L5.5 3h2.3l3.9 5.3 4-5.3H18l-5.8 7.6 6.3 8z"/></svg>
);
