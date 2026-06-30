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
import { leads, leadStatusOptions, leadSources } from "../../data/customersData.js";

const PAGE_SIZE = 5;

export default function LeadManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || l.status === status;
      const matchesSource = source === "All" || l.source === source;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [search, status, source]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(setter) {
    return (val) => {
      setter(val);
      setPage(1);
    };
  }

  const pipeline = leadStatusOptions.map((s) => ({
    status: s,
    count: leads.filter((l) => l.status === s).length,
  }));

  return (
    <DashboardLayout>
      <PageHeader
        title="Leads"
        description={`${leads.length} leads in your pipeline`}
        actionLabel="Add Lead"
        actionIcon="fa-solid fa-plus"
        actionTo="/leads/add"
      />

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {pipeline.map((p) => (
          <button
            key={p.status}
            onClick={() => handleFilterChange(setStatus)(status === p.status ? "All" : p.status)}
            className={`card p-3.5 text-left transition-shadow hover:shadow-soft ${
              status === p.status ? "ring-2 ring-brand-500/30" : ""
            }`}
          >
            <p className="font-display text-lg font-bold text-ink-900">{p.count}</p>
            <p className="mt-0.5 truncate text-[11px] font-medium text-ink-900/45">
              {p.status}
            </p>
          </button>
        ))}
      </div>

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
              options={leadStatusOptions}
              value={status}
              onChange={handleFilterChange(setStatus)}
            />
            <FilterDropdown
              label="Source"
              icon="fa-solid fa-tower-broadcast"
              options={leadSources}
              value={source}
              onChange={handleFilterChange(setSource)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-[11px] font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="px-5 py-3">Lead</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Value</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => navigate("/leads")}
                  className="cursor-pointer border-b border-ink-900/5 transition-colors last:border-0 hover:bg-slate-25"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={l.initials} name={l.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-900">
                          {l.name}
                        </p>
                        <p className="truncate text-xs text-ink-900/45">
                          {l.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">{l.company}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/60">{l.source}</td>
                  <td className="px-5 py-3.5 font-medium text-ink-900/80">
                    {l.value}
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/45">
                    {l.createdDate}
                  </td>
                  <td
                    className="px-5 py-3.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RowActions
                      onView={() => navigate("/leads")}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <i className="fa-solid fa-bullseye mb-2 block text-2xl text-ink-900/20" />
                    <p className="text-sm text-ink-900/40">
                      No leads match your filters.
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
