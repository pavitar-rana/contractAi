import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();

    const memoized = useMemo(() => ({ session, status }), [session, status]);

    return memoized;
};
