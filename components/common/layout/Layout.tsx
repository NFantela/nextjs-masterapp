import { useRouter } from 'next/router';
import { FC, MutableRefObject, ReactNode, useMemo, useRef } from 'react';
import React, { createContext } from "react";
import dynamic from 'next/dynamic';
import { useUI } from '../../ui-context/UIContext';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { keyframes, styled } from '@stitches/react';
import Navbar from '../Navbar/Navbar';

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
};

export type LocalProvider = typeof localProvider
export const CommerceProvider = getCommerceProvider(localProvider)


/**
 * DYNAMIC components
 */
// this loading component is displayed while lazy loaded route is being fetched from server
const dynamicProps = {
    loading: () => <div>Loading....</div>,
}
const SignUpView = dynamic(
    () => import('../../auth/SignIn/SignIn'),
    {
        ...dynamicProps
    }
);
/**
 *  Global radix dialog css setup
 */
const overlayShow = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

const contentShow = keyframes({
    '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
    '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: 'rgb(5 5 5 / 70%)',
    position: 'fixed',
    inset: 0,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: 'var(--surface1)',
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '450px',
    maxHeight: '85vh',
    padding: 25,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
    '&:focus': { outline: 'none' },
});
/**
 *  GLobal modal section
 *  Note this is only used to create modal views that are global (accessed from everywhere e.g. login)
 */
const ModalUI: FC = () => {
    // grab which global modal from ui state
    const { displayModal, closeModal, modalView } = useUI();
    return displayModal ? (
        <ModalView modalView={modalView} closeModal={closeModal} />
    ) : null
}

const ModalView: FC<{ modalView: string; closeModal(): any }> = ({
    modalView,
    closeModal,
}) => {
    return (
        <DialogPrimitive.Root open={true} onOpenChange={(isOpen) => !isOpen && closeModal()}>
            <DialogPrimitive.Portal>
                <StyledOverlay />
                <StyledContent>
                    {modalView === 'LOGIN_VIEW' && <SignUpView />}
                </StyledContent>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

//----------------------------------------------------------------------------------------
//  Layout component
// <Layout pageProps={pageProps}> is used in _app.tsx and each page using it registerss
//----------------------------------------------------------------------------------------
interface PageProps {
    pageProps: {
    }
}

const categories = [
    {
        id: "as123-21321s212",
        name: "Smartphones",
        slug: "smartphones",
        path: "smartphones"
    },
    {
        id: "as123-21321s214",
        name: "Smart Watches",
        slug: "smart-watches",
        path: "smart-watches"
    }
]

const Layout: FC<PageProps> = ({
    children,
    pageProps: { ...pageProps },
}) => {
    const { locale = 'en-US' } = useRouter();

    const navBarlinks = categories.map((c) => ({
        label: c.name,
        href: `/${c.slug}`,
    }));

    return (
        <CommerceProvider locale={locale}>
            <div>
                <Navbar links={navBarlinks} />
                <main>{children}</main>
                {/** modal opening component depends on ui state to show / hide modal  */}
                <ModalUI />
                <footer>footer component will be here todo</footer>
            </div>
        </CommerceProvider>
    );
}

export default Layout