import UserInput from "../userInput";
import { motion, AnimatePresence } from "framer-motion";

export default function Status({
  handleCheckBoxChange,
  selected,
  checked,
  duration,
  statusName,
}: any) {
  return (
    <div className="flex items-center gap-3 py-2">
      <UserInput
        handleChange={handleCheckBoxChange}
        type={"checkbox"}
        name={statusName}
        id={statusName}
        placeholder={""}
        required={false}
        addStyle={
          "w-5 h-5 rounded-md border-2 border-wetSand accent-wetSand cursor-pointer"
        }
        checked={checked}
      />
      <label
        htmlFor={statusName}
        className="text-lg font-medium text-stone cursor-pointer"
      >
        {statusName} (Days)
      </label>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 max-w-md"
          >
            <UserInput
              width={"w-1/2"}
              addStyle={
                "text-center py-2 px-3 rounded-lg border-2 border-wetSand/30 focus:border-wetSand focus:ring-2 focus:ring-wetSand/20 transition-all"
              }
              name={`${statusName}Duration`}
              handleChange={handleCheckBoxChange}
              type="number"
              id={`${statusName}Duration`}
              placeholder="3"
              step="1"
              min={0}
              required={selected}
              disabled={false}
              defaultValue={duration}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
