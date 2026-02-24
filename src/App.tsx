import { useEffect, useState } from "react";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import InputArea from "./components/InputArea";
import CallModal from "./components/CallModal";
import useChat from "./hooks/useChat";
import useCredits from "./hooks/useCredits";
import useCallModal from "./hooks/useCallModal";
import useAutoScroll from "./hooks/useAutoScroll";
import { TENANT_NAME, setTenantName, IS_PREVIEW } from "./config";
import { fetchTenant } from "./api";

export default function App() {
  const { balance, refresh: refreshCredits } = useCredits();
  const { messages, streaming, sendMessage } = useChat(refreshCredits);
  const callModal = useCallModal();
  const containerRef = useAutoScroll(messages);
  const [tenantDisplay, setTenantDisplay] = useState(TENANT_NAME);

  useEffect(() => {
    if (TENANT_NAME || IS_PREVIEW) return;
    fetchTenant().then((t) => {
      setTenantName(t.display_name);
      setTenantDisplay(t.display_name);
      document.title = `${t.display_name} • Chat UI`;
    });
  }, []);

  return (
    <>
      <Header
        creditBalance={balance}
        onCallClick={() => callModal.open(null)}
        tenantName={tenantDisplay}
      />
      <ChatContainer messages={messages} containerRef={containerRef} />
      <InputArea
        streaming={streaming}
        onSend={sendMessage}
      />
      <CallModal
        isOpen={callModal.isOpen}
        capability={callModal.capability}
        onClose={callModal.close}
      />
    </>
  );
}
