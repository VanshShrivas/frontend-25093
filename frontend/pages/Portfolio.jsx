import React from "react";

export default function Portfolio() {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Portfolio</h2>
      <p className="text-gray-600">
        Showcase your projects, skills, and experiences here.
      </p>

      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Node.js",
            "Python",
            "Machine Learning",
            "SQL",
            "Git",
            "TailwindCSS",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Projects</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="p-3 border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800">Sentiment Analysis Tool</h4>
            <p className="text-sm">
              Built an NLP tool using Python and Streamlit to analyze and visualize sentiment from tweets.  
              <a href="#" className="text-blue-600 underline ml-1">View Project</a>
            </p>
          </li>
          <li className="p-3 border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800">E-Commerce Website</h4>
            <p className="text-sm">
              Full-stack MERN application with authentication, product catalog, and cart system.  
              <a href="#" className="text-blue-600 underline ml-1">View Project</a>
            </p>
          </li>
          <li className="p-3 border rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800">Portfolio Website</h4>
            <p className="text-sm">
              Personal website built with React and Tailwind to showcase projects and blogs.  
              <a href="#" className="text-blue-600 underline ml-1">View Project</a>
            </p>
          </li>
        </ul>
      </div>

      {/* Internships Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Internships</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="p-3 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-800">Software Engineering Intern</span> @ ABC Tech  
            <p className="text-sm">Worked on backend APIs and optimized database queries (June 2024 – Aug 2024).</p>
          </li>
          <li className="p-3 border rounded-lg shadow-sm">
            <span className="font-semibold text-gray-800">ML Intern</span> @ DataX Labs  
            <p className="text-sm">Developed models for text classification using Python and Scikit-learn (Jan 2024 – Apr 2024).</p>
          </li>
        </ul>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Certifications</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>AWS Cloud Practitioner – Amazon Web Services</li>
          <li>React Developer – Meta</li>
          <li>Machine Learning Specialization – Coursera</li>
        </ul>
      </div>
    </div>
  );
}
