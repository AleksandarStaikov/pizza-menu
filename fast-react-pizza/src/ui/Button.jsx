import { Link } from 'react-router-dom';

const base = `text-sm inline-block rounded-full bg-yellow-400 
 font-semibold uppercase tracking-wide text-stone-800
transition-colors hover:bg-yellow-300 focus:bg-yellow-300
focus:outline-none focus:ring focus:ring-yellow-300
focus:ring-offset-2 disabled:cursor-not-allowed `;

function Button({ children, disabled, to, type }) {
  const styles = {
    primary: base + `px-4 py-3 md:px-6 md:py-4`,
    small: base + `px-4 py-2 md:px-5 md:py-2.5 text-xs `,
    secondary: `text-sm px-4 py2.5 md:px-6 md:py-3.5 
    inline-block rounded-full border-2 border-stone-200
    font-semibold uppercase tracking-wide text-stone-400
    transition-colors hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300
    focus:outline-none focus:ring focus:ring-stone-300
    focus:ring-offset-2 disabled:cursor-not-allowed `,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} type="submit">
      {children}
    </button>
  );
}

export default Button;
