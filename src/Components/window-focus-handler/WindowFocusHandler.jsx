import React, { useEffect } from 'react';

const WindowFocusHandler = props => {
    const {onFocus} = props;
    const {onBlur} = props;

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        };
    });

    return <></>;
};
export default WindowFocusHandler;