import UserInput from "../userInput";

export default function Drying({
  handleCheckBoxChange,
  selected,
  checked,
  duration,
}: any) {
  return (
    <div className="flex">
      <UserInput
        handleChange={handleCheckBoxChange}
        type={"checkbox"}
        name={"drying"}
        id={"drying"}
        placeholder={""}
        required={false}
        addStyle={"accent-red-500"}
        checked={checked}
      />
      <label htmlFor="drying" className="text-black text-2xl ml-2 my-auto">
        Drying
      </label>
      <UserInput
        width={"w-20"}
        addStyle={"ml-8"}
        name="dryingDuration"
        handleChange={handleCheckBoxChange}
        type="number"
        id="dryingDuration"
        placeholder="3"
        step="1"
        min={0}
        required={!selected}
        disabled={!selected}
        defaultValue={duration}
      />
    </div>
  );
}
