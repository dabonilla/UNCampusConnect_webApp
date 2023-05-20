'use client'
import { useForm } from "react-hook-form";

export default function CreatePublicacion1 ()  {
  const { register, formState: { errors }, handleSubmit } = useForm();
  console.log("TEST");
  const onSubmit = async (data) => {
    const fecha = new Date();
    const fechaISO = fecha.toISOString();
    console.log(fechaISO);
    data.date = fechaISO;
    console.log(data);
  };

  return (
    <div>
      <h1>Create Publication</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" type="text" {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" {...register("content", { required: true })}></textarea>
          {errors.content && <span>This field is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input className="form-control" type="text" {...register("image", { required: true })} />
          {errors.image && <span>This field is required</span>}
        </div >
          <button className="btn btn-primary mb-3" type="submit">Create</button>
      </form>

    </div>
  );
};


