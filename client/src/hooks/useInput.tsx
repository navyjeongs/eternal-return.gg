import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface UseInput<T> {
  (initialValue: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];
}

const useInput: UseInput<any> = (initialValue) => {
  const [value, setValue] = useState<any>(initialValue);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
