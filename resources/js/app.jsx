import React from 'react';
import CampaignForm from './campaigns/campaignForm';
import CampaignList from './campaigns/campaignList';

const App = () => (
    <div>
        <h1>Campaign Manager</h1>
        <CampaignForm />
        <CampaignList />
    </div>
);

export default App;
