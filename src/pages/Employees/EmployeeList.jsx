import React, { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import PageHeader from "../../components/Cards/PageHeader.jsx";
import TableSearchBar from "../../components/Search/TableSearchBar.jsx";
import FilterDropdown from "../../components/Filters/FilterDropdown.jsx";
import EmployeeCard from "../../components/Cards/EmployeeCard.jsx";
import {
  employees,
  departments,
  employeeStatusOptions,
} from "../../data/employeesData.js";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () =>
      employees.filter((emp) => {
        const q = search.toLowerCase();
        const matchSearch =
          emp.name.toLowerCase().includes(q) ||
          emp.role.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q);
        const matchDept = dept === "All" || emp.department === dept;
        const matchStatus = status === "All" || emp.status === status;
        return matchSearch && matchDept && matchStatus;
      }),
    [search, dept, status]
  );

  function resetFilter(setter) {
    return (val) => {
      setter(val);
    };
  }

  /* summary stat chips */
  const deptCounts = departments.map((d) => ({
    dept: d,
    count: employees.filter((e) => e.department === d).length,
  }));

  return (
    <DashboardLayout>
      <PageHeader
        title="Employees"
        description={`${employees.length} team members across all departments`}
        actionLabel="Add Employee"
        actionIcon="fa-solid fa-user-plus"
        actionTo="/employees/add"
      />

      {/* Department quick-filter chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setDept("All")}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            dept === "All"
              ? "border-ink-900 bg-ink-900 text-white"
              : "border-ink-900/10 bg-white text-ink-900/55 hover:border-ink-900/20"
          }`}
        >
          All Departments
        </button>
        {deptCounts.map(({ dept: d, count }) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              dept === d
                ? "border-brand-600 bg-brand-500 text-white"
                : "border-ink-900/10 bg-white text-ink-900/55 hover:border-ink-900/20"
            }`}
          >
            {d}
            <span className="ml-1.5 opacity-60">{count}</span>
          </button>
        ))}
      </div>

      {/* Search + status filter bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <TableSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name, role, or email..."
        />
        <FilterDropdown
          label="Status"
          icon="fa-solid fa-circle-dot"
          options={employeeStatusOptions}
          value={status}
          onChange={resetFilter(setStatus)}
        />
        <p className="ml-auto text-sm text-ink-900/40 shrink-0">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Employee cards grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center py-16 text-center">
          <i className="fa-solid fa-user-slash mb-3 text-3xl text-ink-900/15" />
          <p className="font-medium text-ink-900/40">No employees match your filters.</p>
          <button
            onClick={() => {
              setSearch("");
              setDept("All");
              setStatus("All");
            }}
            className="mt-4 text-sm font-semibold text-brand-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
