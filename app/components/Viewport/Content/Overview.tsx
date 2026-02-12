export default function Overview() {
  return (
    <div style={{ maxWidth: "800px" }}>
      {/* Title */}
      <h1 className="text-[#379634] mb-4 font-bold text-lg">
        SYSTEM_ARCHITECT: JACOB HUFFMAN
      </h1>

      {/* Intro */}
      <div className="text-[#EEEEEE]/70 text-sm leading-relaxed mb-8">
        This page is a running overview of the projects I’ve built and continue
        to improve. It highlights the tools, systems, and ideas behind each one.
      </div>

      {/* Specs Section */}
      <div className="mb-8">
        <h2 className="text-[#379634] text-lg font-bold mb-4 border-b border-[#379634]/50 pb-2">
          ## SPECS
        </h2>
        <ul className="list-disc pl-5 text-[#EEEEEE]/70 space-y-2">
          <li>
            Built with performance in mind, keeping the architecture simple and
            readable
          </li>
          <li>
            Clear state handling and predictable data behavior across projects
          </li>
          <li>
            Practical system design with a focus on usability, automation, and
            clean interfaces
          </li>
        </ul>
      </div>

      {/* Changelog Section */}
      <div>
        <h2 className="text-[#379634] text-lg font-bold mb-4 border-b border-[#379634]/50 pb-2">
          ## CHANGELOG
        </h2>
        <div className="font-mono text-xs text-[#EEEEEE]/60">
          <p className="mb-2">
            <span className="text-[#379634] font-semibold">2026-02-09</span> ::
            Launched portfolio system overview and project index
          </p>
          <p className="mb-2">
            <span className="text-[#379634] font-semibold">2026-02-08</span> ::
            Implemented core layout, navigation, and theming foundation
          </p>
          <p className="mb-2">
            <span className="text-[#379634] font-semibold">2026-02-06</span> ::
            Established baseline architecture for ongoing personal projects
          </p>
        </div>
      </div>
    </div>
  );
}
