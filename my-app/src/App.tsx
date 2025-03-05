import { useState } from "react";
import MemberForm from "./components/Modal/MemberForm";
import MemberTable from "./components/Table/MemberTable";

function App() {
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);

  const handleOpenMemberForm = () => {
    setIsMemberFormOpen(true);
  };

  const handleCloseMemberForm = () => {
    setIsMemberFormOpen(false);
  };

  const handleSaveMemberForm = () => {
    setIsMemberFormOpen(false);
  };
  return (
    <div className="container">
      <MemberTable onAddBtnClick={handleOpenMemberForm} />
      {isMemberFormOpen && (
        <MemberForm
          isOpen={isMemberFormOpen}
          onClose={handleCloseMemberForm}
          onSave={handleSaveMemberForm}
        />
      )}
    </div>
  );
}

export default App;
