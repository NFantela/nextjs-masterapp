import { FC } from "react";
import { useUI } from "../../ui-context/UIContext";


interface Props { }

const SigninView: FC<Props> = () => {
    const { setModalView, closeModal } = useUI()
    return (
        <>
            <h1>Sign in modal header</h1>
            <p>Sign in modal content</p>
        </>
    );
}


export default SigninView;