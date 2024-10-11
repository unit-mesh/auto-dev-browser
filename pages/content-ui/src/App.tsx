import React, { useEffect, useState } from 'react';
import ContentTab from './ContentTab';

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
  const [contentPanelVisible, setContentPanelVisible] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function showPanel(selection?: string) {
    setContentPanelVisible(true);
  }

  // eslint-disable-next-line
  const onBackgroundMessage = function (message: TabMessage, sender: any, sendResponse: any) {
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
          <div className="flex items-center justify-between shadow mr-4 mt-4 rounded">
            <ContentTab onClose={() => setContentPanelVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
}
