import React, { useState } from 'react';

const Filter = ({ onChange }) => {
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(filters); // Pass the filters to the parent
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <input type="number" name="endYear" value={filters.endYear} onChange={handleChange} placeholder="End Year" className="p-2 border rounded" />
      <input type="text" name="topics" value={filters.topics} onChange={handleChange} placeholder="Topics" className="p-2 border rounded" />
      <input type="text" name="sector" value={filters.sector} onChange={handleChange} placeholder="Sector" className="p-2 border rounded" />
      <input type="text" name="region" value={filters.region} onChange={handleChange} placeholder="Region" className="p-2 border rounded" />
      <input type="text" name="pestle" value={filters.pestle} onChange={handleChange} placeholder="Pestle" className="p-2 border rounded" />
      <input type="text" name="source" value={filters.source} onChange={handleChange} placeholder="Source" className="p-2 border rounded" />
      <input type="text" name="swot" value={filters.swot} onChange={handleChange} placeholder="SWOT" className="p-2 border rounded" />
      <input type="text" name="country" value={filters.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded" />
      <input type="text" name="city" value={filters.city} onChange={handleChange} placeholder="City" className="p-2 border rounded" />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded col-span-1 md:col-span-3 lg:col-span-4">Apply Filters</button>
    </form>
  );
};

export default Filter;