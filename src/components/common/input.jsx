function Input({
    label,
    type = "text",
    placeholder,
    register,
    name,
  }) {
    return (
      <div className="mb-4">
  
        <label className="block mb-2 font-medium">
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className="w-full border rounded-lg p-3"
        />
  
      </div>
    );
  }
  
  export default Input;