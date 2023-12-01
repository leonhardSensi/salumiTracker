import UserInput from "../userInput";

export default function Curing({ handleCheckBoxChange, selected }: any) {
  return (
    <div className="flex mb-4">
      <UserInput
        handleChange={handleCheckBoxChange}
        type={"checkbox"}
        name={"curing"}
        id={"curing"}
        placeholder={""}
        required={false}
        addStyle={"accent-red-500"}
      />
      <label htmlFor="curing" className="text-black text-2xl ml-2 my-auto">
        Curing
      </label>
      <UserInput
        width={"w-20"}
        addStyle={`ml-8`}
        name="curingDuration"
        handleChange={handleCheckBoxChange}
        type="number"
        id="curingDuration"
        placeholder="3"
        step="1"
        min={0}
        required={!selected}
        disabled={!selected}
      />
    </div>
  );
}
