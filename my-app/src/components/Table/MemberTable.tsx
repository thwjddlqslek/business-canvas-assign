import { useEffect, useState, useRef } from "react";
import "../../styles/Table.css";
import Button from "../Button/Button";
import {
  MemeberTableProps,
  MemberProps,
  FilterDataProps,
} from "../Table/types";
import Checkbox from "./Checkbox";
import { getMembers, deleteMember } from "../../services/storageService";
import SmallModal from "../Modal/SmallModal";
import MemberForm from "../Modal/MemberForm";

const MemberTable = ({
  onAddBtnClick,
  refreshTrigger = 0,
}: MemeberTableProps & { refreshTrigger: number }) => {
  const [members, setMembersState] = useState<MemberProps[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [openActionId, setOpenActionId] = useState<string | null>();
  const [editMember, setEditMember] = useState<MemberProps | null>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterDataProps>({
    name: [],
    address: [],
    memo: [],
    joinDate: [],
    job: [],
    emailConsent: [],
  });
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const loadedMemberData = getMembers();
      const validMembers = loadedMemberData.filter(
        (member) => member !== null && member !== undefined && member.id
      );
      setMembersState(validMembers);
    } catch (error) {
      console.error("멤버 데이터 로딩 오류:", error);
      setMembersState([]);
    }
  }, [refreshTrigger]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const validMemberIds = filteredMembers
        .filter((member) => member && member.id)
        .map((member) => member.id);
      setSelectedRows(validMemberIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === filteredMembers.length) {
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

  const handleDeleteMember = (id: string) => {
    deleteMember(id);
    setOpenActionId(null);
    try {
      const loadedMemberData = getMembers();
      const validMembers = loadedMemberData.filter(
        (member) => member !== null && member !== undefined && member.id
      );
      setMembersState(validMembers);
    } catch (error) {
      console.error("멤버 삭제 후 데이터 로딩 오류:", error);
    }
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleEditMember = (member: MemberProps) => {
    setEditMember(member);
    setOpenActionId(null);
  };

  const handleUpdateMember = (data: MemberProps) => {
    if (data) {
      try {
        const loadedMemberData = getMembers();
        const validMembers = loadedMemberData.filter(
          (member) => member !== null && member !== undefined && member.id
        );
        setMembersState(validMembers);
      } catch (error) {
        console.error("멤버 업데이트 후 데이터 로딩 오류:", error);
      }
    }
    setEditMember(null);
  };

  const toggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const toggleFilterItem = (field: string, value: string | boolean) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[field as keyof typeof prev] as (
        | string
        | boolean
      )[];
      const valueExists = currentValues.includes(value);

      if (valueExists) {
        return {
          ...prev,
          [field]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value],
        };
      }
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      name: [],
      address: [],
      memo: [],
      joinDate: [],
      job: [],
      emailConsent: [],
    });
  };

  const getColumnValues = (field: keyof MemberProps) => {
    return Array.from(
      new Set(
        members
          .filter((member) => member && member[field])
          .map((member) => member[field])
      )
    );
  };

  const filteredMembers = members.filter((member) => {
    if (!member) return false;

    const nameMatch =
      selectedFilters.name.length === 0 ||
      selectedFilters.name.includes(member.name);

    const addressMatch =
      selectedFilters.address.length === 0 ||
      selectedFilters.address.includes(member.address);

    const memoMatch =
      selectedFilters.memo.length === 0 ||
      selectedFilters.memo.includes(member.memo);

    const joinDateMatch =
      selectedFilters.joinDate.length === 0 ||
      selectedFilters.joinDate.includes(member.joinDate);

    const jobMatch =
      selectedFilters.job.length === 0 ||
      selectedFilters.job.includes(member.job);

    const emailConsentMatch =
      selectedFilters.emailConsent.length === 0 ||
      selectedFilters.emailConsent.includes(member.emailConsent);

    return (
      nameMatch &&
      addressMatch &&
      memoMatch &&
      joinDateMatch &&
      jobMatch &&
      emailConsentMatch
    );
  });

  return (
    <>
      <div className="table-container" ref={filterContainerRef}>
        <div className="table-header">
          <h2 className="table-title">회원 목록</h2>
          <div className="filter-controls">
            <Button variant="cancel" onClick={resetFilters}>
              필터 초기화
            </Button>
            <Button variant="add" onClick={onAddBtnClick}>
              + 추가
            </Button>
          </div>
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
                <div
                  className="column-header"
                  onClick={() => toggleFilter("name")}
                >
                  <span>이름</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "name" && (
                  <div className="filter-dropdown">
                    {getColumnValues("name").map((value) => (
                      <div className="filter-item" key={`name-${value}`}>
                        <Checkbox
                          id={`name-${value}`}
                          checked={selectedFilters.name.includes(
                            value as string
                          )}
                          onChange={() =>
                            toggleFilterItem("name", value as string)
                          }
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="column">
                <div
                  className="column-header"
                  onClick={() => toggleFilter("address")}
                >
                  <span>주소</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "address" && (
                  <div className="filter-dropdown">
                    {getColumnValues("address").map((value) => (
                      <div className="filter-item" key={`address-${value}`}>
                        <Checkbox
                          id={`address-${value}`}
                          checked={selectedFilters.address.includes(
                            value as string
                          )}
                          onChange={() =>
                            toggleFilterItem("address", value as string)
                          }
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="column">
                <div
                  className="column-header"
                  onClick={() => toggleFilter("memo")}
                >
                  <span>메모</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "memo" && (
                  <div className="filter-dropdown">
                    {getColumnValues("memo").map((value) => (
                      <div className="filter-item" key={`memo-${value}`}>
                        <Checkbox
                          id={`memo-${value}`}
                          checked={selectedFilters.memo.includes(
                            value as string
                          )}
                          onChange={() =>
                            toggleFilterItem("memo", value as string)
                          }
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="column">
                <div
                  className="column-header"
                  onClick={() => toggleFilter("joinDate")}
                >
                  <span>가입일</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "joinDate" && (
                  <div className="filter-dropdown">
                    {getColumnValues("joinDate").map((value) => (
                      <div className="filter-item" key={`joinDate-${value}`}>
                        <Checkbox
                          id={`joinDate-${value}`}
                          checked={selectedFilters.joinDate.includes(
                            value as string
                          )}
                          onChange={() =>
                            toggleFilterItem("joinDate", value as string)
                          }
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="column">
                <div
                  className="column-header"
                  onClick={() => toggleFilter("job")}
                >
                  <span>직업</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "job" && (
                  <div className="filter-dropdown">
                    {getColumnValues("job").map((value) => (
                      <div className="filter-item" key={`job-${value}`}>
                        <Checkbox
                          id={`job-${value}`}
                          checked={selectedFilters.job.includes(
                            value as string
                          )}
                          onChange={() =>
                            toggleFilterItem("job", value as string)
                          }
                        />
                        <label>{value}</label>
                      </div>
                    ))}
                  </div>
                )}
              </th>
              <th className="column">
                <div
                  className="column-header"
                  onClick={() => toggleFilter("emailConsent")}
                >
                  <span>이메일 수신 동의</span>
                  <span className="sort-icon">▼</span>
                </div>
                {activeFilter === "emailConsent" && (
                  <div className="filter-dropdown">
                    <div className="filter-item">
                      <Checkbox
                        id="emailConsent-true"
                        checked={selectedFilters.emailConsent.includes(true)}
                        onChange={() => toggleFilterItem("emailConsent", true)}
                      />
                      <label>동의</label>
                    </div>
                    <div className="filter-item">
                      <Checkbox
                        id="emailConsent-false"
                        checked={selectedFilters.emailConsent.includes(false)}
                        onChange={() => toggleFilterItem("emailConsent", false)}
                      />
                      <label>미동의</label>
                    </div>
                  </div>
                )}
              </th>
              <th className="actions-column"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
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
                  {openActionId === member.id && (
                    <SmallModal
                      onDelete={() => handleDeleteMember(member.id)}
                      onEdit={() => handleEditMember(member)}
                    />
                  )}
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={8} className="no-results">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editMember && (
        <MemberForm
          isOpen={!!editMember}
          onClose={() => setEditMember(null)}
          onSave={handleUpdateMember}
          initialData={editMember}
        />
      )}
    </>
  );
};

export default MemberTable;
