import { SetStateAction, useState } from "react";

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value as SetStateAction<T>);
  };

  return { value, onChange: handleChange, setValue };
};

export default useInput;
