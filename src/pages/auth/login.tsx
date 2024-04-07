import { Seo } from '@/components/seo';
import { LoginForm } from '@/features/auth';
import { AutLayout } from '@/layouts/auth-layout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

const LoginPage = () => {
    const router = useRouter();

    const onSuccess = () => {
        const redirect = router.query.redirect as string;
        router.replace(redirect ?? '/dashboard/jobs');
    };

    return (
        <>
            <Seo title="Log In" />
            <LoginForm onSuccess={onSuccess} />
        </>
    );
};

LoginPage.getLayout = function getLayout(
    page: ReactElement
) {
    return <AutLayout title="Log In">{page}</AutLayout>;
};

export default LoginPage;
