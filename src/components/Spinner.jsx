export default function Spinner({ small = false }) {
  return <span className={`${small ? 'h-4 w-4' : 'h-8 w-8'} inline-block animate-spin rounded-full border-2 border-teal-500 border-t-transparent`} />;
}
