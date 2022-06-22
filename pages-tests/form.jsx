import { useForm } from "react-hook-form"

export default function Form () {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it


    return (
        <div className="maxw-30">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>

                <div className="formRow">
                    <input type='text' defaultValue="name" {...register("name")} />
                </div>

                <div className="formRow">
                    <input type='text' {...register("exampleRequired", { required: true })} />
                    {errors.exampleRequired && <span className="formError">This field is required</span>}
                </div>

                <div className="formRow">
                    <input type="submit" />
                </div>

            </form>
        </div>
    )
}