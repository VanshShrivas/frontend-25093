import React, { useState } from "react";

const dummy = [
  {
    title: "International AI Conference",
    description: "Attended a 3-day international conference on Artificial Intelligence and Machine Learning.",
    category: "Conferences"
  },
  {
    title: "Cloud Computing Seminar",
    description: "Participated in a seminar on the future of cloud computing technologies.",
    category: "Seminars"
  },
  {
    title: "Robotics Workshop",
    description: "Hands-on workshop on building and programming autonomous robots.",
    category: "Workshops"
  },
  {
    title: "Hackathon 2025",
    description: "48-hour national level coding competition focusing on AI for social good.",
    category: "Competitions"
  },
  {
    title: "Class Representative",
    description: "Elected class representative for the academic year 2025.",
    category: "Position of Responsibility"
  },
  {
    title: "Math Olympiad",
    description: "Qualified for the final round of the National Math Olympiad.",
    category: "Academic Contests"
  },
  {
    title: "Blood Donation Camp",
    description: "Volunteered in organizing a blood donation drive in collaboration with Red Cross.",
    category: "Community Service"
  },
  {
    title: "Coding Club Member",
    description: "Active participant in weekly problem-solving sessions of the coding club.",
    category: "Club Activities/Volunteering Efforts"
  },
  {
    title: "Data Structures Course",
    description: "Completed an online course on advanced data structures from Coursera.",
    category: "Online Courses"
  },
  {
    title: "Summer Internship at TechCorp",
    description: "Worked as a software development intern focusing on backend APIs.",
    category: "Internships"
  },
  {
    title: "Blockchain Seminar",
    description: "Learned about decentralized applications in a seminar conducted by industry experts.",
    category: "Seminars"
  },
  {
    title: "Photography Club Lead",
    description: "Led the photography club and organized photo walks across campus.",
    category: "Position of Responsibility"
  },
  {
    title: "Community Cleanliness Drive",
    description: "Participated in a citywide cleanliness campaign with 200+ volunteers.",
    category: "Community Service"
  },
  {
    title: "Cybersecurity Bootcamp",
    description: "Attended a 5-day intensive bootcamp on ethical hacking and network security.",
    category: "Workshops"
  },
  {
    title: "Entrepreneurship Competition",
    description: "Secured 2nd place in a startup pitching competition.",
    category: "Competitions"
  },
  {
    title: "Research Paper Presentation",
    description: "Presented research work on renewable energy at a student conference.",
    category: "Conferences"
  },
  {
    title: "Sports Fest Volunteer",
    description: "Helped in logistics and management during the annual sports fest.",
    category: "Club Activities/Volunteering Efforts"
  },
  {
    title: "AI Research Internship",
    description: "Assisted professors in a research project on Natural Language Processing.",
    category: "Internships"
  },
  {
    title: "Leadership Workshop",
    description: "Interactive workshop on leadership and team management skills.",
    category: "Workshops"
  },
  {
    title: "Web Development Bootcamp",
    description: "Completed a full-stack web development online course.",
    category: "Online Courses"
  }
];


export default function Achievements() {
  const [category, setCat] = useState("All");

  const categories = ["All", ...new Set(dummy.map((ele) => ele.category))];
  // console.log(categories);

  const filtered =
    category === "All"
      ? dummy
      : dummy.filter((ele) => ele.category === category);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Achievements
      </h2>

      {/* Dropdown Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={category}
          onChange={(e) => setCat(e.target.value)}
          className="w-full md:w-60 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map((cat,_idx) => (
            <option key={_idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ele, _idx) => (
          <div
            key={_idx}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">{ele.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{ele.description}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {ele.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
