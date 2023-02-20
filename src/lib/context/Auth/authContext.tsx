import { useRouter } from "next/router";
import cookies from "js-cookie"
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { IApiResponse, INewUserSrcData, IUser } from "../../types";

interface IAuthContext {
    user?: IUser;
    error?: string;
    isLoading: boolean;
    login: (email: string, psw: string) => void;
    signUp: (src: INewUserSrcData) => void;
    logout: () => void;
}

const defaultCtx: IAuthContext = {
    login: (email: string, psw: string) => { },
    signUp: (src: INewUserSrcData) => { },
    logout: () => { },
    isLoading: false,
};

export const authCtx = createContext<IAuthContext>(defaultCtx);

interface IProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const router = useRouter();

    const login = useCallback(
        async (email: string, psw: string) => {
            setIsLoading(true);
            const resp = await fetch("/api/login", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: JSON.stringify({ email, psw }),
            });
            const { data, error } = (await resp.json()) as IApiResponse<IUser>;
            if (error) {
                //server defined error
                setError(error);
            } else if (data) {
                //success
                setUser(data);
                router.push("/");
            } else {
                //undefined error not carried trough the error field en the api response
                setError("unknown error");
            }
            setIsLoading(false);
        },
        [router]
    );

    const signUp = useCallback(
        async (src: INewUserSrcData) => {
            setIsLoading(true);
            const resp = await fetch("/api/signUp", {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
                body: JSON.stringify(src),
            });

            const { data, error } = (await resp.json()) as IApiResponse<IUser>;

            if (error) {
                //server defined error
                setError(error);
            } else if (data) {
                //success
                setUser(data);
                router.push("/");
            } else {
                //undefined error not carried trough the error field en the api response
                setError("unknown error");
            }
            setIsLoading(false);
        },
        [router]
    );

    const logout = useCallback(() => {
        setUser(undefined);
        setError(undefined);
        setIsLoading(false);
    }, []);

    useEffect(() => {

        if (document.cookie.search('Authorization') >= 0 && !user) {
            setIsLoading(true)

            fetch('/api/login', {
                method: "POST",
                headers: {
                    accept: "application/json",
                },
            })
                .then((resp) => {
                    return resp.json()
                })
                .then(({ data, error }: { data: IUser, error: string }) => {
                    if (error) {
                        //server defined error
                        setError(error)
                    } else if (data) {
                        //success
                        setUser(data)

                    } else {
                        //undefined error not carried trough the error field en the api response
                        setError("unknown error")
                    }
                    setIsLoading(false)
                }).catch(err => {
                    setIsLoading(false)
                })
        }
    }, [router])

    return (
        <authCtx.Provider
            value={{
                login,
                logout,
                signUp,
                isLoading,
                error,
                user,
            }}
        >
            {children}
        </authCtx.Provider>
    );
};
