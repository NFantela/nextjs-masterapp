
import { FunctionComponent } from 'react';
import styles from './Spinner.module.scss';

type NsSpinnerProps = {
    sizeInPx?: number;
};
const NsSpinner: FunctionComponent<NsSpinnerProps> = ({ sizeInPx = 38 }) => {
    const halfSize = Math.floor(sizeInPx / 2);

    return (
        // todo check mat spinner for resizin
        <svg
            width={`${sizeInPx}`}
            height={`${sizeInPx}`}
            viewBox={`0 0 ${sizeInPx} ${sizeInPx}`}
            xmlns="http://www.w3.org/2000/svg"
            className={styles.nsSpinner}>
            <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                    <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
                    <stop stopColor="#fff" offset="100%" />
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </path>
                    <circle fill="#fff" cx="36" cy="18" r="1">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </g>
        </svg>
    )
}
export default NsSpinner;