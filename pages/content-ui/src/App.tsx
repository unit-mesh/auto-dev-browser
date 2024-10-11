import { useEffect, useState } from 'react';
import { Button } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { themeStorage } from '@extension/storage';

export enum CommandType {
  ChatPopupDisplay,
  ChatToolbarDisplay,
}

export interface TabMessage {
  cmd: CommandType;
  selectionText?: string; // tab 内选择的文字
  pageUrl?: string; // tab 对应的 url
  linkText?: string; // 被点击的链接文本
  linkUrl?: string; // 被点击的链接URL
}

export default function App() {
  const theme = useStorage(themeStorage);
  const [contentPanelVisible, setContentPanelVisible] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function showPanel(selection?: string) {
    setContentPanelVisible(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onBackgroundMessage = function (message: TabMessage, sender, sendResponse) {
    if (message.cmd === CommandType.ChatPopupDisplay) {
      if (contentPanelVisible) {
        setContentPanelVisible(false);
        return;
      }
      console.log('收到后台消息 ', message);
      const selection = document.getSelection()?.toString();
      showPanel(selection);
      return;
    }
  };

  /// hidden when show key board
  useEffect(() => {
    console.log('content ui - loaded');
    chrome.runtime.onMessage.addListener(onBackgroundMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onBackgroundMessage);
    };
  }, []);

  return (
    <>
      {contentPanelVisible && (
        <div className={'fixed right-0 top-0'}>
          <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
            <div className="flex gap-1 text-blue-500">
              Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
            </div>
            <Button theme={theme} onClick={themeStorage.toggle}>
              Capture
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
