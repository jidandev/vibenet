import { Button } from "../elemets/Button";
import Checkbox from "../elemets/Checkbox";
import InputForm from "../elemets/Input";

const FormLogin = () => {
    return (
        <form onSubmit="" className="w-full">
          <InputForm type="email" name="email" placeholder="Enter your email" label="Email"></InputForm>
          <InputForm type="password" name="password" placeholder="Enter your password" label="Password" ></InputForm>
          <div className="flex justify-between w-full mt-2">
            <Checkbox name="remember" label="Remember me" />
            <h1 className="text-black dark:text-white text-sm mt-2 mb-4 font-medium">Forgot password</h1>
          </div>
          <Button type="submit" className="">Sign in</Button>
        </form>
    )
}

export default FormLogin;