import React, { ChangeEvent } from "react";
import { Controller } from "react-hook-form";

type FormFieldType = {
  placeholder: string;
  handleChange: (
    str: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelName?: string;
  className?: string;
  textAreaRow?: number;
  value?: string;
  inputType?: string;
  isTextArea?: boolean;
  isLoading?: boolean;
  control: Object;
  name: string;
  rules?: Object;
  errors?: Object;
};

const FormField = ({
  labelName,
  className,
  textAreaRow,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  isLoading,
  control,
  name,
  rules,
  errors,
}: FormFieldType) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        rules={rules}
        render={({ field }) =>
          isTextArea ? (
            <textarea
              {...field}
              disabled={isLoading}
              spellCheck
              rows={textAreaRow}
              placeholder={placeholder}
              className={`focus-visible:border focus-visible:border-gray-400 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
              onChange={(e) => {
                handleChange(e);
                field.onChange(e);
              }}
            />
          ) : (
            <input
              {...field}
              disabled={isLoading}
              spellCheck
              type={inputType}
              step="0.1"
              placeholder={placeholder}
              className={`focus-visible:border focus-visible:border-gray-400 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] ${className}`}
              onChange={(e) => {
                handleChange(e);
                field.onChange(e);
              }}
            />
          )
        }
      />
      {errors && errors[name] && (
        <span className="text-red-300 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </label>
  );
};

export default FormField;
