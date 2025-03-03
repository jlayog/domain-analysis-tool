"use client";
import React, { useState } from 'react';
import Container from '@/app/components/ui/Container';
import useAdminAuth from '@/app/hooks/useAdminAuth';
import UnitListPanel from '@/app/components/features/UnitListPanel';

const Admin = () => {
  const { authenticated, loading, handleSubmit } = useAdminAuth();
  const [formData, setFormData] = useState({
    unit_name: '',
    origin_url: '',
    property_id: '',
    url_slug: '',
    start_date: '',
    end_date: '',
    metric: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //trim value after input loses focus
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim(), // Trim the value when the user leaves the input
    }));
  };

  const validateDates = () => {
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (startDate > endDate) {
      alert('Error: Start date cannot be later than the end date.');
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate dates
    if (!validateDates()) {
      return;
    }

    try {
      await handleSubmit(formData);
      alert('Form submitted successfully!');
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <Container center><p>Loading...</p></Container>;
  }

  if (authenticated === false) {
    return <Container center><p>Redirecting to login...</p></Container>;
  }

  return (
    <Container fluid>
      {authenticated ? (
        <div className='adminContainer'>
          {/* Form Section */}
          <div className="formSection">
            <form onSubmit={onSubmit}>
              <div className='formTitle'>
                <h2>Domain Analysis Information</h2>
                <hr />
              </div>
              <div className="adminField">
                <label htmlFor="unit_name">Unit Name:</label>
                <p>
                  <em>No special characters!</em>
                </p>
                <input
                  type="text"
                  id="unit_name"
                  name="unit_name"
                  value={formData.unit_name}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder='e.g. Infrastructure and Communication Technology Services'
                  required
                />
              </div>
              <div className="adminField">
                <label htmlFor="origin_url">Origin URL:</label>
                <p>
                  <em>Old site URL that you are migrating from (Be sure to include http:// or https:// in your links!)</em>
                </p>
                <input
                  type="text"
                  id="origin_url"
                  name="origin_url"
                  value={formData.origin_url}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder='e.g. https://video.ufl.edu'
                  required
                />
              </div>
              <div className='formTitle'>
                <h2>Google API data</h2>
                <hr />
              </div>
              <div className="adminField">
                <label htmlFor="property_id">GA4 Property ID:</label>
                <input
                  type="number"
                  id="property_id"
                  name="property_id"
                  value={formData.property_id}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder='e.g. 123456789'
                  required
                />
              </div>
              <div className="adminField">
                <label htmlFor="url_slug">URL Slug Filter</label>
                <p>
                  <em>Optional: String filter for Google Analytics if the site falls under another site. (e.g. &#39;https://it.ufl.edu/ict&#39; would be &#39;/ict&#39;)</em>
                </p>
                <input
                  type="text"
                  id="url_slug"
                  name="url_slug"
                  value={formData.url_slug}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder='e.g. /ict'
                />
              </div>
              <div className="adminRow">
                <div className="adminField">
                  <label htmlFor="start_date">Start Date</label>
                  <p>
                    <em>Date on when you want the analytics to start from</em>
                  </p>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>
                <div className="adminField">
                  <label htmlFor="end_date">End Date</label>
                  <p>
                    <em>Date on when you want the analytics to end on</em>
                  </p>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>
              </div>
              <div className="adminButtons">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          {/* Unit List Panel */}
          <div className="unitListSection" style={{ flex: '1' }}>
            <UnitListPanel />
          </div>
        </div>
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </Container>
  );
};

export default Admin;
