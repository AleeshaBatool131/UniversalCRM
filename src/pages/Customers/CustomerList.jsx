import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import PageHeader from "../../components/Cards/PageHeader.jsx";
import TableSearchBar from "../../components/Search/TableSearchBar.jsx";
import FilterDropdown from "../../components/Filters/FilterDropdown.jsx";
import StatusBadge from "../../components/Badges/StatusBadge.jsx";
import Avatar from "../../components/Cards/Avatar.jsx";
import RowActions from "../../components/Buttons/RowActions.jsx";
import Pagination from "../../components/Table/Pagination.jsx";
import { customers, customerStatusOptions } from "../../data/customersData.js";

const PAGE_SIZE = 5;

export default function CustomerList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || c.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(setter) {
    return (val) => {
      setter(val);
      setPage(1);
    };
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Customers"
        description={`${customers.length} customers across every workspace`}
        actionLabel="Add Customer"
        actionIcon="fa-solid fa-plus"
        actionTo="/customers/add"
      />

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-900/5 p-5 sm:flex-row sm:items-center">
          <TableSearchBar
            value={search}
            onChange={handleFilterChange(setSearch)}
            placeholder="Search by name, company, or email..."
          />
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="Status"
              icon="fa-solid fa-circle-dot"
              options={customerStatusOptions}
              value={status}
              onChange={handleFilterChange(setStatus)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-[11px] font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Value</th>
                <th className="px-5 py-3">Owner</th>
                <th className="px-5 py-3">Last Contact</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/customers/${c.id}`)}
                  className="cursor-pointer border-b border-ink-900/5 transition-colors last:border-0 hover:bg-slate-25"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={c.initials} name={c.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-900">
                          {c.name}
                        </p>
                        <p className="truncate text-xs text-ink-900/45">
                          {c.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">{c.company}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-3.5 font-medium text-ink-900/80">
                    {c.value}
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/60">{c.owner}</td>
                  <td className="px-5 py-3.5 text-ink-900/45">
                    {c.lastContact}
                  </td>
                  <td
                    className="px-5 py-3.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RowActions
                      onView={() => navigate(`/customers/${c.id}`)}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <i className="fa-solid fa-users-slash mb-2 block text-2xl text-ink-900/20" />
                    <p className="text-sm text-ink-900/40">
                      No customers match your filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </DashboardLayout>
  );
}
