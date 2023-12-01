import UserInput from "../userInput";

export default function Salting({ handleCheckBoxChange, selected }: any) {
  return (
    <div className="flex mb-4">
      <UserInput
        handleChange={handleCheckBoxChange}
        type={"checkbox"}
        name={"salting"}
        id={"salting"}
        placeholder={""}
        required={false}
        addStyle={"accent-red-500"}
      />
      <label htmlFor="salting" className="text-black text-2xl ml-2 my-auto">
        Salting
      </label>
      <UserInput
        width={"w-20"}
        addStyle={"ml-8"}
        name="saltingDuration"
        handleChange={handleCheckBoxChange}
        type="number"
        id="saltingDuration"
        placeholder="3"
        step="1"
        min={0}
        required={!selected}
        disabled={!selected}
      />
    </div>
  );
}
