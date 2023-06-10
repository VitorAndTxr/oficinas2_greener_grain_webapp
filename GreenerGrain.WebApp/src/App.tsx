import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppRoutes from './AppRoutes';

declare global {
    interface Window {
        captchaOnLoad: () => void
        grecaptcha: any
    }
}

export default function App() {
    return (
        <AppBaseStyle>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>        
        </AppBaseStyle>
    )
}

const AppBaseStyle = styled.div`
    min-height:100vh;
    overflow-x: hidden;
    width: 100%;
    position: relative;
`