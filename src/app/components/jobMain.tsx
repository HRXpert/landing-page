"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Users,
  MapPin,
  Clock,
  Calendar,
  MoreVertical,
} from "lucide-react";
import Loader from "@/app/components/loader";
import { getOrganizationJobs } from "@/app/api/job/publishJob";
import { Job } from "@/types/job";

const JobManagementMain = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getOrganizationJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      case "draft":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      case "closed":
        return "bg-gray-600/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobDomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <Loader />;

  return (
    <main className="flex-1 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Job Management</h1>
            <p className="text-gray-400 mt-1">
              Manage your job postings and track applications.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/common-recruiter-functions/create-job"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Job</span>
            </Link>
            <Link
              href="/common-recruiter-functions/view-jobs"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <span>View All Jobs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>

            <button className="p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Jobs</p>
              <p className="text-xl font-bold text-white">{jobs.length}</p>
            </div>
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Published Jobs</p>
              <p className="text-xl font-bold text-white">
                {jobs.filter((j) => j.status === "published").length}
              </p>
            </div>
            <div className="w-6 h-6 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Applications</p>
              <p className="text-xl font-bold text-white">
                {jobs.reduce((sum, job) => 50, 0)}
              </p>
            </div>
            <Users className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Draft Jobs</p>
              <p className="text-xl font-bold text-white">
                {jobs.filter((j) => j.status === "draft").length}
              </p>
            </div>
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-gray-600/50">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Job Title
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Domain
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Location
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Closing Date
                </th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <h3 className="text-white font-medium">{job.title}</h3>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{job.jobDomain}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location.city}, {job.location.country}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        {job.status === "draft"
                          ? `Created on ${
                              job.createdAt
                                ? new Date(job.createdAt).toLocaleDateString()
                                : "N/A"
                            }`
                          : job.status === "published" ||
                            job.status === "paused"
                          ? `Published on ${
                              job.publishDate
                                ? new Date(
                                    job.publishDate
                                  ).toLocaleDateString()
                                : "N/A"
                            }`
                          : job.status === "closed"
                          ? `Closed on ${
                              job.closingDate
                                ? new Date(job.closingDate).toLocaleDateString()
                                : "N/A"
                            }`
                          : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.closingDate
                        ? new Date(job.closingDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link href={`common-recruiter-functions/view-jobs/${job._id}`}>
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      {job.status !== "closed" && (
                        <Link href={`/common-recruiter-functions/edit-job/${job._id}`}>
                          <button className="p-1 text-gray-400 hover:text-yellow-400 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <Link
            href="/common-recruiter-functions/create-job"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Job</span>
          </Link>
        </div>
      )}
    </main>
  );
};

export default JobManagementMain;
