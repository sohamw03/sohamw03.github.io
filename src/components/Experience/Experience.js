"use client";

const experience = [
  {
    date: "Jun 2023 - Aug 2023",
    // Add this https://www.linkedin.com/company/yozu/
    title: "YoZu — Web developer and Cloud Summer Intern",
    content: `
Spearheaded collaboration efforts at a startup, orchestrating a team to conceptualize and execute the design and development of the company’s website with chatbot utilizing ReactJS.
Integrated the chatbot with 48 backend APIs and executed Google Authentication to fortify the Login/Signup processes for enhanced security.
Oversaw the hosting of the website on AWS EC2 with SSL encryption, CI/CD, taking charge of managing AWS cloud servers, encompassing backup strategies and seamless migration processes.
Managed domain and DNS configuration via Cloudflare to optimize website performance and bolster security measures.`,
  },
];

export default function Experience() {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-0">
        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
          <div className="w-full max-w-3xl mx-auto">
            <div className="-my-6">
              {/* <!-- Item #1 --> */}
              {experience.map((exp, index) => {
                return (
                  <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                    {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-[#2e3c51] sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#808c9c] after:border-4 after:box-content after:border-[#10151d] after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                      <time className="sm:absolute -left-16 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase px-2 h-6 mb-3 sm:mb-0 text-[#10151d] bg-[#a87ffb] rounded-full">{exp.date}</time>
                      <div className="text-xl font-bold text-[#bfc7d2]">{exp.title}</div>
                    </div>
                    {/* <!-- Content --> */}
                    <div className="text-[#808c9c]">{exp.content}</div>
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