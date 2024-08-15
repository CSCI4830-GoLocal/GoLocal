import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import './company.css';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Company = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/company/list`);
                console.log('API Response:', response.data); // Debugging: log the API response

                if (response.data && Array.isArray(response.data.companies)) {
                    setCompanies(response.data.companies);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setCompanies([]);
                }
            } catch (error) {
                console.error('Error fetching Companies:', error);
                setCompanies([]);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <div className="company">
            <Navbar />
            <div className="company-container">
                {companies.length > 0 ? (
                    companies.map(company => (
                        <div key={company.id} className="company-card">
                            <div className="company-details">
                                <span className="company-date">
                                    {new Date(company.dateCreated).toLocaleDateString()}
                                </span>
                                <span className="company-id">Company ID: {company.id}</span>
                            </div>
                            <div className="company-name">{company.name}</div>
                            <div className="company-address">Address: {company.address}</div>
                            <div className="company-city">City: {company.city}</div>
                            <div className="company-state">State: {company.state}</div>
                            <div className="company-zip">ZIP: {company.zip}</div>
                        </div>
                    ))
                ) : (
                    <p>No companies available</p>
                )}
            </div>
        </div>
    );
}

export default Company;




