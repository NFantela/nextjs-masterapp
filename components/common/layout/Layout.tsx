import { useRouter } from 'next/router';
import { FC, MutableRefObject, ReactNode, useMemo, useRef } from 'react';
import { Category } from '../../../types/category';
import React, { createContext, useReducer } from "react";
import { isWeakNeverCheck } from '../../../shared/never-exhaustive-checks';

//----------------------------------------------------------------------------------------
// LAYOUT CONTEXT
//----------------------------------------------------------------------------------------

export type CommerceConfig = {
    locale: string
    cartCookie: string
}

export type Provider = CommerceConfig & {}

export type CommerceProps<P extends Provider> = {
    children?: ReactNode
    provider: P
}
export type CommerceContextValue<P extends Provider> = {
    providerRef: MutableRefObject<P>
} & CommerceConfig;

/**
 * These are the properties every provider should allow when implementing
 * the core commerce provider
 */
export type CommerceProviderProps = {
    children?: ReactNode
} & Partial<CommerceConfig>;

const Commerce = createContext<CommerceContextValue<any> | {}>({});

export function CoreCommerceProvider<P extends Provider>({
    provider,
    children,
}: CommerceProps<P>) {
    const providerRef = useRef(provider)

    // If the parent re-renders this provider will re-render every
    // consumer unless we memoize the config
    const { locale, cartCookie } = providerRef.current
    const cfg = useMemo(
        () => ({ providerRef, locale, cartCookie }),
        [locale, cartCookie]
    )

    return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>
}

export function getCommerceProvider<P extends Provider>(provider: P) {
    return function CommerceProvider({
        children,
        ...props
    }: CommerceProviderProps) {
        return (
            <CoreCommerceProvider provider={{ ...provider, ...props }}>
                {children}
            </CoreCommerceProvider>
        )
    }
}

// create it
export const localProvider = {
    locale: 'en-us',
    cartCookie: 'session',
    // cartCookie: 'session',
    // fetcher: fetcher,
    // cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
    // customer: { useCustomer },
    // products: { useSearch },
    // auth: { useLogin, useLogout, useSignup },
}

export type LocalProvider = typeof localProvider
export const CommerceProvider = getCommerceProvider(localProvider)



//----------------------------------------------------------------------------------------
//  Layout component
// <Layout pageProps={pageProps}> is used in _app.tsx and each page using it registerss
//----------------------------------------------------------------------------------------
interface PageProps {
    pageProps: {
        categories: Category[]
    }
}

const Layout: FC<PageProps> = ({
    children,
    pageProps: { categories = [], ...pageProps },
}) => {
    const { locale = 'en-US' } = useRouter();

    return (
        <CommerceProvider locale={locale}>
            <div>
                <nav>Navbar el here tod</nav>
                <main>{children}</main>
                <footer>footer component will be here todo</footer>
            </div>
        </CommerceProvider>
    );
}

export default Layout