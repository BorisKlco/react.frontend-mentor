export default function Checkbox({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-3 text-md">
      <div className="ring-2 ring-violet-400 h-5 hover:bg-violet-500">
        <input className="accent-black opacity-40 w-5 h-5" type="checkbox" />
      </div>
      {text}
    </span>
  );
}
