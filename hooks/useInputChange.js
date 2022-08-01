export default function useInputChange(values, setValues) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/  +/g, "") });
  };
  return {
    onChange,
  };
}
