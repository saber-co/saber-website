import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import InputArea from "./components/InputArea";
import CallModal from "./components/CallModal";
import useChat from "./hooks/useChat";
import useCredits from "./hooks/useCredits";
import useCallModal from "./hooks/useCallModal";
import useAutoScroll from "./hooks/useAutoScroll";

export default function App() {
  const { balance, refresh: refreshCredits } = useCredits();
  const { messages, streaming, sendMessage } = useChat(refreshCredits);
  const callModal = useCallModal();
  const containerRef = useAutoScroll(messages);

  return (
    <>
      <Header
        creditBalance={balance}
        onCallClick={() => callModal.open(null)}
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
