import FormLogin from "@/components/fragments/FormLogin";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function Home() {
    return(
        <AuthLayout title="Login">
            <FormLogin />
        </AuthLayout>
    )
}