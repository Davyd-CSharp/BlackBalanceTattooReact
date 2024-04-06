import { LocalizationProvider } from '@mui/x-date-pickers';
import Questionnaire from './pages/Questionnaire/Questionnaire';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import setupStore from './stores';
import { Provider } from 'react-redux';
import i18n from './locales/i18n';

function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Questionnaire />
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
