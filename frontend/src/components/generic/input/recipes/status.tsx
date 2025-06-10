import UserInput from "../userInput";

export default function Status({
  handleCheckBoxChange,
  selected,
  checked,
  duration,
  statusName,
}: any) {
  return (
    <div className="flex mb-4 items-center">
      <div className="p-2">
        <UserInput
          handleChange={handleCheckBoxChange}
          type={"checkbox"}
          name={statusName}
          id={statusName}
          placeholder={""}
          required={false}
          addStyle={"accent-red-500 scale-150"}
          checked={checked}
        />
      </div>
      <label htmlFor={statusName} className="text-xl ml-2">
        {statusName} (Days)
      </label>
      <UserInput
        width={"w-20"}
        addStyle={`ml-2`}
        name={`${statusName}Duration`}
        handleChange={handleCheckBoxChange}
        type="number"
        id={`${statusName}Duration`}
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
