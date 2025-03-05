import React, { useEffect, useState } from "react";
import "../../styles/Table.css";
import Button from "../Button/Button";
import { MemeberTableProps, MemberProps } from "../Table/types";
import Checkbox from "./Checkbox";
import { getMembers } from "../../services/storageService";
import SmallModal from "../Modal/SmallModal";

const MemberTable = ({
  onAddBtnClick,
  refreshTrigger = 0,
}: MemeberTableProps & { refreshTrigger: number }) => {
  const [members, setMembersState] = useState<MemberProps[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [openActionId, setOpenActionId] = useState<string | null>();

  useEffect(() => {
    const loadedMemberData = getMembers();
    setMembersState(loadedMemberData);
  }, [refreshTrigger]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(members.map((member) => member.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === members.length) {
        setSelectAll(true);
      }
    }
  };

  const handleMoreActions = (id: string) => {
    if (openActionId === id) {
      setOpenActionId(null);
    } else {
      setOpenActionId(id);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">회원 목록</h2>
        <Button variant="add" onClick={onAddBtnClick}>
          + 추가
        </Button>
      </div>

      <table className="member-table">
        <thead>
          <tr>
            <th className="checkbox-column">
              <Checkbox
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="column">
              이름
              <span className="sort-icon">▼</span>
            </th>
            <th className="column">
              주소
              <span className="sort-icon">▼</span>
            </th>
            <th className="column">
              메모
              <span className="sort-icon">▼</span>
            </th>
            <th className="column">
              가입일
              <span className="sort-icon">▼</span>
            </th>
            <th className="column">
              직업
              <span className="sort-icon">▼</span>
            </th>
            <th className="column">
              이메일 수신 동의
              <span className="sort-icon">▼</span>
            </th>
            <th className="actions-column"></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="checkbox-column">
                <input
                  type="checkbox"
                  id={`row-${member.id}`}
                  className="checkbox"
                  checked={selectedRows.includes(member.id)}
                  onChange={() => handleSelectRow(member.id)}
                />
                <label
                  htmlFor={`row-${member.id}`}
                  className="checkbox-label"
                ></label>
              </td>
              <td>{member.name}</td>
              <td>{member.address}</td>
              <td>{member.memo}</td>
              <td>{member.joinDate}</td>
              <td>{member.job}</td>
              <td className="consent-column">
                {member.emailConsent && (
                  <Checkbox id="email-consent" checked={true} />
                )}
              </td>

              <td className="actions-column">
                <button
                  className="more-actions"
                  onClick={() => handleMoreActions(member.id)}
                >
                  ⋮
                </button>
                {openActionId === member.id && <SmallModal />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
