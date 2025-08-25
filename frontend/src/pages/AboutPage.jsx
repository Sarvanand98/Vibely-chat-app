import React from 'react'

const devData = {
  name: "Sarvanand",
  profilePic: "https://avatar.iran.liara.run/public/5.png",
  bio: "Full Stack Developer | React, Node.js, MongoDB | Passionate about building scalable web apps and AI integrations.",
  location: "Mohali, Punjab, India",
  qualification: "B.Tech in Computer Science",
  career: [
    "Built Vibely - Modern Chat & AI App",
    "Developed multiple MERN stack projects",
    "Experience with REST APIs, authentication, payments, and real-time apps",
    "Contributor to open-source projects"
  ],
  skills: [
    "React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "Tailwind CSS", "OpenAI API"
  ],
  contact: {
    email: "Sarvanand038@gmail.com",
    github: "https://github.com/sarvanand98",
    linkedin: "https://www.linkedin.com/in/sarvanand00111/"
  }
}

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center py-8">
      <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={devData.profilePic}
            alt={devData.name}
            className="w-28 h-28 rounded-full border-4 border-primary shadow"
          />
          <h2 className="text-3xl font-bold text-primary">{devData.name}</h2>
          <span className="text-base-content text-lg">{devData.bio}</span>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-1">Location:</span>
          <span className="block bg-base-200 rounded-lg p-2">{devData.location}</span>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-1">Qualification:</span>
          <span className="block bg-base-200 rounded-lg p-2">{devData.qualification}</span>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-2">Career Highlights:</span>
          <ul className="list-disc ml-6 text-base-content">
            {devData.career.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-2">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {devData.skills.map((skill, idx) => (
              <span key={idx} className="bg-primary text-white px-3 py-1 rounded-full text-sm">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-base-content font-semibold mb-2">Contact:</span>
          <div className="flex flex-col gap-2">
            <span>Email: <a href={`mailto:${devData.contact.email}`} className="text-primary">{devData.contact.email}</a></span>
            <span>GitHub: <a href={devData.contact.github} target="_blank" rel="noopener noreferrer" className="text-primary">{devData.contact.github}</a></span>
            <span>LinkedIn: <a href={devData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">{devData.contact.linkedin}</a></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage