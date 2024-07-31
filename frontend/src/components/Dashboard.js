import React, { useState, useEffect } from 'react';
import { fetchData } from '../api';
import Filter from './Filter';
import Chart from './Chart';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchDataWithFilters = async () => {
      try {
        const response = await fetchData(filters);
        setData(response.data);
        setFilteredData(response.data); // Initialize with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataWithFilters();
  }, [filters]);

  useEffect(() => {
    // Filter data based on the applied filters
    const applyFilters = () => {
      const newFilteredData = data.filter(item => {
        // Adjust this logic based on your filter criteria
        return Object.keys(filters).every(key => 
          !filters[key] || item[key]?.toString().includes(filters[key])
        );
      });
      setFilteredData(newFilteredData);
    };

    applyFilters();
  }, [filters, data]);

  const getChartData = (field) => {
    return filteredData.reduce((acc, item) => {
      const label = item[field];
      const value = item.intensity; // Adjust based on your data
      const existingItem = acc.find(d => d.label === label);
      if (existingItem) {
        existingItem.value += value;
      } else {
        acc.push({ label, value });
      }
      return acc;
    }, []);
  };

  return (
    <div className="p-6">
      <Filter onChange={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('intensity')} type="bar" title="Intensity" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('likelihood')} type="line" title="Likelihood" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('relevance')} type="pie" title="Relevance" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('year')} type="bar" title="Year" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('country')} type="line" title="Country" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('topics')} type="pie" title="Topics" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('region')} type="bar" title="Region" />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Chart data={getChartData('city')} type="line" title="City" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
