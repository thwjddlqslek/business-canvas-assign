import { use, useState } from "react";
import MemberForm from "./components/Modal/MemberForm";
import MemberTable from "./components/Table/MemberTable";
import { MemberFormData } from "./components/Modal/types";

function App() {
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenMemberForm = () => {
    setIsMemberFormOpen(true);
  };

  const handleCloseMemberForm = () => {
    setIsMemberFormOpen(false);
  };

  const handleSaveMemberForm = (data: MemberFormData) => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <div className="container">
      <MemberTable
        onAddBtnClick={handleOpenMemberForm}
        refreshTrigger={refreshTrigger}
      />
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
