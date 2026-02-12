export default function Overview() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-[#379634] mb-4 font-bold text-xl md:text-2xl tracking-tight">
        SYSTEM_ARCHITECT: JACOB HUFFMAN
      </h1>

      <div className="text-[#EEEEEE]/70 text-sm md:text-base leading-relaxed mb-8">
        This page is a running overview of the projects I’ve built and continue
        to improve. It highlights the tools, systems, and ideas behind each one.
      </div>

      <div className="mb-8">
        <h2 className="text-[#379634] text-lg font-bold mb-4 border-b border-[#379634]/50 pb-2">
          ## SPECS
        </h2>
        <ul className="list-disc pl-5 text-[#EEEEEE]/70 space-y-2 text-sm md:text-base">
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

      <div>
        <h2 className="text-[#379634] text-lg font-bold mb-4 border-b border-[#379634]/50 pb-2">
          ## CHANGELOG
        </h2>
        <div className="font-mono text-xs md:text-sm text-[#EEEEEE]/60 space-y-3">
          <p>
            <span className="text-[#379634] font-semibold block sm:inline sm:mr-2">2026-02-09 ::</span>
            Launched portfolio system overview and project index
          </p>
          <p>
            <span className="text-[#379634] font-semibold block sm:inline sm:mr-2">2026-02-08 ::</span>
            Implemented core layout, navigation, and theming foundation
          </p>
          <p>
            <span className="text-[#379634] font-semibold block sm:inline sm:mr-2">2026-02-06 ::</span>
            Established baseline architecture for ongoing personal projects
          </p>
        </div>
      </div>
    </div>
  );
}