import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignForm from './campaigns/campaignForm';
import CampaignList from './campaigns/campaignList';

const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<CampaignForm />} />
                <Route path="/campaigns" element={<CampaignList />} />
            </Routes>
        </div>
    </Router>
);

export default App;
