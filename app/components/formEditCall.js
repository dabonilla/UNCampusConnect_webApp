'use client'
import { useForm } from "react-hook-form";

const FormEdit = ({ data, idCall }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">{data[idCall].nameGroup}</option>
        <option value="male">{data[idCall].place}</option>
        <option value="other">{data[idCall].status}</option>
      </select>
      <input type="submit" />
    </form>
  )
}
export default FormEdit
