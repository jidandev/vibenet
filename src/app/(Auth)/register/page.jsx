import FormRegister from "@/components/fragments/FormRegister";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function Home() {
    return(
        <AuthLayout title="Register">
            <FormRegister />
        </AuthLayout>
    )
}