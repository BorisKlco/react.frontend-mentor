import { SettingType } from "./psw";

type CheckboxType = {
  text: string;
  checkType: string;
  checkState: SettingType;
  checkSetter: React.Dispatch<React.SetStateAction<SettingType>>;
};

export default function Checkbox({
  text,
  checkType,
  checkState,
  checkSetter,
}: CheckboxType) {
  const handleCheck = () => {
    checkSetter({ ...checkState, [checkType]: !checkState[checkType] });
  };
  return (
    <span className="flex items-center gap-3 text-md">
      <div className="ring-2 ring-violet-400 h-5 hover:bg-violet-500">
        <input
          checked={checkState[checkType]}
          onChange={handleCheck}
          className="accent-black opacity-40 w-5 h-5"
          type="checkbox"
          name={checkType}
        />
      </div>
      {text}
    </span>
  );
}
