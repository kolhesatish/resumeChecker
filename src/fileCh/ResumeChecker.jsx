import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ResumeChecker = () => {
  const accessToken = useSelector((state) => state.auth.token);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [atsResult, setAtsResult] = useState('');
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
  };

  const handleCheckResume = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);

      const response = await axios.post('/api/check-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setAtsResult(response.data.result);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error checking resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Resume Checker</h2>
      <div>
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          placeholder="Enter job description..."
          rows={5}
          cols={50}
        />
      </div>
      <br />
      <div>
        <label htmlFor="resume">Upload Resume (PDF):</label>
        <input type="file" id="resume" accept=".pdf" onChange={handleFileChange} />
      </div>
      <br />
      <div>
        <button onClick={handleCheckResume} disabled={!jobDescription || !resumeFile || loading}>
          {loading ? 'Checking...' : 'Check Resume'}
        </button>
      </div>
      <br />
      {atsResult && <p>ATS Result: {atsResult}</p>}
      {score && <p>Score: {score}%</p>}
    </div>
  );
};

export default ResumeChecker;
