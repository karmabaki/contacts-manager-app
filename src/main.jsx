import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Provider} from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './redux/store';
import App from './App';
import './index.css';
import './App.css';
import { HelmetProvider } from 'react-helmet-async';


const ErrorFallbaack = ({error,resetErrorBoundary})=>{
  const navigate = useNavigate();
  const handleError = ()=>{
    navigate("/");
    resetErrorBoundary();
  };

  return(
    <div className='mx-auto h-screen flex flex-col items-center justify-center'>
      <p>مشکلی پیش آمده است. لطفا مجدد تلاش بفرمایید.</p>
      <br />
      <pre>{error.message}</pre>
      <br />
      <button className='bg-blue-700 hover:bg-blue-400 text-white px-3 py-2 rounded text-sm' onClick={handleError}>بازگشت به صفحه اصلی</button>
    </div>
  )
}

const helmetContext = {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider context={helmetContext}>
    <Provider store={store}>
      <BrowserRouter basename='/contacts-manager-app'>
        <ErrorBoundary FallbackComponent={ErrorFallbaack}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);