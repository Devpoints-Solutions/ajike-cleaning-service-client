import { useState, type ChangeEvent, useEffect } from "react";
import { Schema } from "yup";

type FormDataType = Record<string, any>;
type ErrorType = {
  field: string;
  message: string;
};

export function useForm(validatorSchema: Schema) {
  const [data, setData] = useState<FormDataType>({});
  const [error, setError] = useState<ErrorType | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  function getFormInput(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    return setData({
      ...data,
      [name]: value,
    });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        if (!validatorSchema) return;
        setIsValid(false);
        try {
          await validatorSchema.validate(data, { abortEarly: false });

          setError({ message: "", field: "" });
          setIsValid(true);
        } catch (error: unknown) {
          const err = error as any;
          if (err?.inner?.length > 0) {
            setError({
              message: err.inner[0].message,
              field: err.inner[0].path,
            });
          }
          setIsValid(false);
        }
      })();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  return { getFormInput, data, error, isValid };
}
