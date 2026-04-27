import { useState, useEffect, lazy, Suspense } from "react";
import { Sidebar } from "./components/Sidebar";
import { ContactsList } from "./components/ContactsList";
import { ChatWindow } from "./components/ChatWindow";
import { DetailsPanel } from "./components/DetailsPanel";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { useContacts } from "./hooks/useContacts";
import { useMessages } from "./hooks/useMessages";
import { useContactDetails } from "./hooks/useContactDetails";

const IntroLoader = lazy(() => import("./components/IntroLoader"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));

function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "app">("intro");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Track window size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when a contact is selected (mobile)
  useEffect(() => {
    if (selectedContactId && isMobile) {
      setShowSidebar(false);
    }
  }, [selectedContactId, isMobile]);

  const { contacts, loading: contactsLoading, error: contactsError } = useContacts();
  const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedContactId);
  const { contact: selectedContact, loading: contactLoading } = useContactDetails(selectedContactId);

  // Intro / Loading stage timers
  useEffect(() => {
    if (stage !== "intro") return;
    const timer = setTimeout(() => setStage("loading"), 5000);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "loading") return;
    const timer = setTimeout(() => setStage("app"), 3000);
    return () => clearTimeout(timer);
  }, [stage]);

  if (stage === "intro") {
    return (
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <IntroLoader onComplete={() => setStage("loading")} />
      </Suspense>
    );
  }

  if (stage === "loading") {
    return (
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <LoadingScreen />
      </Suspense>
    );
  }

  if (contactsLoading) return <LoadingSkeleton />;

  if (contactsError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading contacts: {contactsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const inboxStats = {
    all: contacts.length || 28,
    unassigned: Math.floor((contacts.length || 28) * 0.18),
  };

  const teamStats = {
    sales: Math.floor((contacts.length || 28) * 0.25),
    customerSupport: Math.floor((contacts.length || 28) * 0.57),
  };

  const usersList = contacts.slice(0, 10).map((c) => ({
    name: `${c.firstName} ${c.lastName}`,
    count: Math.floor(Math.random() * 15) + 1,
  }));

  const selectedContactName = selectedContact
    ? `${selectedContact.firstName} ${selectedContact.lastName}`
    : "Select a contact";

  return (
    <div className="w-full h-screen p-[5.61px] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full h-[39.3px] flex items-center justify-between bg-white rounded-[11.23px] px-[11.23px] py-[7.02px] shrink-0">
        <div className="w-full h-full flex gap-2 items-center">
          {/* Hamburger – visible only on mobile */}
          {isMobile && (
            <button
              className="lg:hidden mr-1"
              onClick={() => setShowSidebar(true)}
            >
              <img src="/assets/img/hamburger.svg" alt="menu" className="w-6 h-6" />
            </button>
          )}

          <div className="h-[22.45px]">
            <img className="w-full h-full object-cover" src="/assets/img/logo.svg" alt="company logo." />
          </div>
          <div className="hidden sm:flex h-[23.85px] rounded-[5.61px] border-[0.7px] p-[7.02px] bg-[#EFF2F2] items-center justify-center gap-[5.61px] border-[#D8DEE4]">
            <img src="/assets/img/inbox.svg" alt="inbox icon" />
            <span className="text-sm text-[#000000]">Inbox</span>
          </div>
          <div className="hidden md:flex h-[23.85px] rounded-[5.61px] p-[7.02px] items-center justify-center gap-[5.61px]">
            <img src="/assets/img/contacts.svg" alt="contacts icon" />
            <span className="text-sm text-[#000000]">Contacts</span>
          </div>
          <div className="hidden md:flex h-[23.85px] rounded-[5.61px] p-[7.02px] items-center justify-center gap-[5.61px]">
            <img src="/assets/img/ai.svg" alt="ai icon" />
            <span className="text-sm text-[#000000]">AI Employees</span>
          </div>
          <div className="hidden lg:flex h-[23.85px] rounded-[5.61px] p-[7.02px] items-center justify-center gap-[5.61px]">
            <img src="/assets/img/workflow.svg" alt="workflow icon" />
            <span className="text-sm text-[#000000]">Workflows</span>
          </div>
          <div className="hidden lg:flex h-[23.85px] rounded-[5.61px] p-[7.02px] items-center justify-center gap-[5.61px]">
            <img src="/assets/img/campaign.svg" alt="campaign icon" />
            <span className="text-sm text-[#000000]">Campaigns</span>
          </div>
        </div>

        <div className="h-full flex items-center gap-2 shrink-0">
          <div className="h-[25.26px] flex items-center justify-center">
            <img src="/assets/img/setting.svg" alt="setting icon" className="w-5 h-5" />
          </div>
          <div className="w-[180px] h-[25.26px] p-[8.42px] flex items-center justify-center gap-[5.61px]">
            <img src="/assets/img/m.svg" alt="profile logo" className="w-4 h-4" />
            <span className="font-[600] text-sm text-[#000000] hidden sm:inline">Michael Johnson</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden mt-[5.61px] relative">
        {/* Sidebar – fixed overlay on mobile, absolute on desktop (lg) */}
        <div
          className={`${
            isMobile
              ? "fixed inset-0 z-50 transition-transform duration-300 transform"
              : "absolute left-[6px] h-full"
          } ${showSidebar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:absolute lg:left-[6px] lg:h-full`}
        >
          <Sidebar
            inboxStats={inboxStats}
            teamStats={teamStats}
            usersList={usersList}
            onClose={() => setShowSidebar(false)}
            isMobile={isMobile}
          />
        </div>

        {/* Main content area */}
        <div className={`flex flex-1 ${isMobile ? "w-full" : "ml-[250px]"} lg:ml-[262px]`}>
          {/* Contacts list */}
          <div
            className={`${
              isMobile
                ? selectedContactId
                  ? "hidden"
                  : "w-full"
                : "w-80 flex-shrink-0"
            }`}
          >
            <ContactsList
              contacts={contacts}
              selectedContactId={selectedContactId}
              onSelectContact={setSelectedContactId}
              loading={contactsLoading}
            />
          </div>

          {/* Chat window */}
          <div
            className={`${
              isMobile
                ? selectedContactId
                  ? "w-full"
                  : "hidden"
                : "ml-[5.61px] flex-1"
            }`}
          >
            <ChatWindow
              contactName={selectedContactName}
              contactImage={selectedContact?.image}
              messages={messages}
              loading={messagesLoading}
              onSendMessage={sendMessage}
              onBack={() => setSelectedContactId(null)}
              onDetailsClick={() => setShowDetails(true)}
              isMobile={isMobile}
            />
          </div>

          {/* Details panel */}
          <div
            className={`${
              isMobile
                ? "fixed inset-y-0 right-0 z-50 w-80 transition-transform transform"
                : "ml-[5.61px] w-80 flex-shrink-0"
            } ${
              showDetails ? "translate-x-0" : "translate-x-full"
            } lg:translate-x-0 lg:static`}
          >
            <DetailsPanel
              contact={selectedContact}
              loading={contactLoading}
              assignee="James West"
              team="Sales Team"
              labels={["Closed Won", "Chicago"]}
              onClose={() => setShowDetails(false)}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;