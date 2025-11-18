import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircleDot, Star, X } from "lucide-react";

interface PopupModalProps {
  onClose: () => void;
  name: string;
  avatar_url: string;
  open_issues_count?: number;
  stargazers_count?: number;
  full_name: string;
}

const PopupModal: React.FC<PopupModalProps> = ({
  onClose,
  name,
  avatar_url,
  open_issues_count,
  stargazers_count,
  full_name,
}) => {
  const theme = useTheme().theme;
  const [lastPR, setLastPR] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchLastPR = async () => {
      try {
        const res = await fetch(
          `${URL}/api/git/activity?full_name=${full_name}`
        );
        const data = await res.json();

        if (data && data.length > 0) {
          setLastPR(data[0]);
        }
      } catch (err) {
        console.error("Error fetching last PR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastPR();
  }, [full_name]);

  const getRepoStatus = () => {
    if (!lastPR) return null;
    const mergedAt = lastPR.merged_at || lastPR.closed_at;
    if (!mergedAt) return null;

    const daysAgo = Math.floor(
      (Date.now() - new Date(mergedAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysAgo <= 30)
      return (
        <span className="px-2  py-1 bg-green-200 text-green-900  rounded-md text-xs font-medium">
          Active Repository (last merged {daysAgo} days ago)
        </span>
      );

    return (
      <span className="px-2 py-1 bg-red-200 text-red-900 rounded-md text-xs font-medium">
        Inactive (last merged {daysAgo} days ago)
      </span>
    );
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-md transition-opacity duration-200"
    >
      <div
        className={`w-2/4 h-1/2 rounded-lg shadow-lg transition-all duration-200 border border-gray-500/30
        ${theme === "dark" ? "bg-[#141414]/95 text-white" : "bg-white/90 text-black"}`}
      >
        {/* Header */}
        <div className="flex items-center p-4 justify-between border-b border-gray-500/30">
          <div className="flex gap-3 items-center">
            <img src={avatar_url} alt={name} className="h-7 w-7 rounded-full" />
            <h1 className="text-[18px] font-semibold">{name}</h1>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-1 border rounded-md p-1 px-2 border-gray-500/30">
              <CircleDot strokeWidth={1.5} size={14} />
              <p className="text-xs">Issues</p>
              <div
                className={`text-[10px] font-medium flex items-center px-2 ml-1 border rounded-2xl ${
                  theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#ececec]"
                }`}
              >
                {open_issues_count}
              </div>
            </div>

            <div className="flex items-center gap-1 border rounded-md p-1 px-2 border-gray-500/30">
              <Star strokeWidth={1.5} size={14} />
              <p className="text-xs">Stars</p>
              <div
                className={`text-[10px] font-medium flex items-center px-2 ml-1 border rounded-2xl ${
                  theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#ececec]"
                }`}
              >
                {stargazers_count}
              </div>
            </div>

            <button
              onClick={onClose}
              className="hover:scale-110 transition-transform p-1 rounded-md hover:bg-gray-500/20"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        
        <div className="p-4 border-b">
          {loading && <p className="text-sm opacity-70">Fetching PR data...</p>}
          {!loading && lastPR && (
            <div className="flex flex-col gap-2">

              <div className="mb-2">
              {getRepoStatus()}

              </div>

              
              <p className="text-sm font-medium">
                Last PR: <span className="font-normal ">{lastPR.title}</span>
              </p>
              <p className="text-xs opacity-70">
                by <span className="font-semibold">{lastPR.user.login}</span> on{" "}
                {new Date(
                  lastPR.merged_at || lastPR.closed_at
                ).toLocaleDateString()}
              </p>
            </div>
          )}
          {!loading && !lastPR && (
            <p className="text-sm opacity-70">No recent PR data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
