import React, { FC, useCallback, useMemo, useReducer } from "react"
import { isWeakNeverCheck } from "../../shared/never-exhaustive-checks"


export interface UiContextState {
    displayModal: boolean
    modalView: string
    userAvatar: string
}

const initialState = {
    displayModal: false,
    modalView: 'LOGIN_VIEW',
    userAvatar: '',
}

type UIContextAction = {
    type: 'OPEN_MODAL'
} | {
    type: 'CLOSE_MODAL'
}
    | {
        type: 'SET_MODAL_VIEW'
        view: MODAL_VIEWS
    }
    | {
        type: 'SET_USER_AVATAR'
        value: string
    }

type MODAL_VIEWS = 'LOGIN_VIEW' | 'FORGOT_VIEW';

export const UIContext = React.createContext<UiContextState | any>(initialState);

UIContext.displayName = 'UIContext';


function uiReducer(state: UiContextState, action: UIContextAction) {
    switch (action.type) {
        case 'OPEN_MODAL': {
            return {
                ...state,
                displayModal: true,
                displaySidebar: false,
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                displayModal: false,
            }
        }
        case 'SET_MODAL_VIEW': {
            return {
                ...state,
                modalView: action.view,
            }
        }
        case 'SET_USER_AVATAR': {
            return {
                ...state,
                userAvatar: action.value,
            }
        }
        default: {
            isWeakNeverCheck(action);
            return state;
        }
    }
}

export const UIProvider: FC = (props) => {
    const [state, dispatch] = useReducer(uiReducer, initialState)

    // store all actions as callbacks
    const openModal = useCallback(
        () => dispatch({ type: 'OPEN_MODAL' }),
        [dispatch]
    );
    const closeModal = useCallback(
        () => dispatch({ type: 'CLOSE_MODAL' }),
        [dispatch]
    );
    const setUserAvatar = useCallback(
        (value: string) => dispatch({ type: 'SET_USER_AVATAR', value }),
        [dispatch]
    );
    const setModalView = useCallback(
        (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
        [dispatch]
    );

    // memoize state and callback state modifying actions
    const memoizedValue = useMemo(
        () => ({
            ...state,
            openModal,
            closeModal,
            setModalView,
            setUserAvatar,
        }),
        [state]
    )

    return <UIContext.Provider value={memoizedValue} {...props} />
}

export const useUI = () => {
    const context = React.useContext(UIContext)
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`)
    }
    return context
}

export const ManagedUIContext: FC = ({ children }) => (
    <UIProvider>
        {children}
    </UIProvider>
);