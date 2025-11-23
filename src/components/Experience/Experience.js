import { ExperienceData } from "@/data";
import { parser } from "@/functions/utils";

export default function Experience() {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-0">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-4xl mx-auto">
            <div className="-my-6">
              {/* <!-- Item #1 --> */}
              {ExperienceData.map((exp, index) => {
                return (
                  <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                    {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                    <div className="absolute left-2 sm:left-0 h-full w-px bg-gradient-to-b from-[#2e3c51] via-[#2e3c51] to-transparent sm:ml-[6.5rem] -translate-x-1/2 translate-y-3 group-last:hidden"></div>

                    <div className="absolute left-2 sm:left-0 w-4 h-4 bg-[#a87ffb] border-4 border-[#10151d] rounded-full sm:ml-[6.5rem] -translate-x-1/2 translate-y-1.5 z-10 shadow-[0_0_12px_rgba(168,127,251,0.6)] transition-transform duration-300 group-hover:scale-125"></div>

                    <div className="flex flex-col sm:flex-row items-start mb-3">
                      <time className="sm:absolute -left-24 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase px-3 h-7 mb-3 sm:mb-0 text-[#10151d] bg-[#a87ffb] rounded-full shadow-lg shadow-purple-500/20 tracking-wide">
                        {exp.date}
                      </time>
                      <div className="text-xl font-bold text-[#e2e8f0] group-hover:text-[#a87ffb] transition-colors duration-300" dangerouslySetInnerHTML={{ __html: parser(exp.title) }}></div>
                    </div>
                    {/* <!-- Content --> */}
                    <div className="p-5 rounded-xl bg-[#1e293b]/40 border border-[#2e3c51] hover:border-[#a87ffb]/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 hover:bg-[#1e293b]/60 backdrop-blur-sm">
                        <ul className="list-none space-y-3 text-[#94a3b8]">
                        {exp.content.split("•").filter(Boolean).map((point, i) => (
                            <li key={i} className="relative pl-6">
                                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[#a87ffb] rounded-full shadow-[0_0_5px_rgba(168,127,251,0.8)]"></span>
                                <span className="leading-relaxed text-base">{point.trim()}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
