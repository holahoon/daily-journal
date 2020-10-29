import { useState, useCallback } from "react";

function useAuthState(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChangeHandler = useCallback((event) => {
    const {
      target: { name, value },
    } = event;

    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return [form, onChangeHandler];
}

export default useAuthState;
