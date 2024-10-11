import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { themeStorage } from '@extension/storage';
import { Button } from '@extension/ui';
import { t } from '@extension/i18n';

const NewTab = () => {
  const theme = useStorage(themeStorage);
  const isLight = theme === 'light';

  console.log(t('hello', 'World'));
  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <p>
          Edit <code>pages/new-tab/src/NewTab.tsx</code>
        </p>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <Button className="mt-4" onClick={themeStorage.toggle} theme={theme}>
          {t('toggleTheme')}
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div> Error Occur </div>);
